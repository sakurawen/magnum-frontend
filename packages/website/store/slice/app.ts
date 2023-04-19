import { SliceCreator } from '../store';
import { DraftWidget } from '@/schemas/draft';
import { formService } from '@/services';
import { transformDraftWidget, DraftWidgetConfigSchema } from '@/schemas/draft';
import { AxiosResponse } from 'axios';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
    };
    editor: {
      form: App.FormTemplate['form'] | null;
      template: App.FormTemplate['template'] | null;
      canvas: {
        height: number;
        width: number;
      };
      currentDragItemType: 'Material' | 'Element' | undefined;
      // 当前选中的草稿组件id
      currentDraftWidgetId: string | null;
      draftWidgets: DraftWidget[];
    };
    workspaces: {};
    // 设置当前选中element id
    setCurrentDraftWidgetId(id: string | null): void;
    // 根据idx选中对应索引的element id
    setCurrentDraftWidgetIdWithIndex(index: number): void;
    setCurrentDragItemType(type: 'Material' | 'Element' | undefined): void;
    // 根据id删除element，返回删除element的idx
    delDraftWidgetWithId(id: string): number;
    setDraftWidgetProperties(
      elementId: string | undefined,
      propertyIdx: number,
      value: any,
    ): void;
    addDraftWidget(item: DraftWidget): void;
    findDraftIndexById(id: string): number;
    setDraftWidgets(elements: DraftWidget[]): void;
    setNavbarSearch(val: string): void;
    resetAppState(): void;
    resetEditor(): void;
    release(): Promise<Service.Response<App.FormTemplate['template']>>;
    setEditorFormTemplate(formTemplate: App.FormTemplate): void;
    setCanvasSize(size: { height: number; width: number }): void;
    initTemplate(): void;
    parserTemplate(template: App.FormTemplate['template']): void;
  };
};
const appSlice: SliceCreator<AppSliceState> = (set, get) => {
  const rawAppState = {
    navbar: {
      search: '',
    },
    editor: {
      form: null,
      template: null,
      canvas: {
        height: 0,
        width: 0,
      },
      currentDragItemType: undefined,
      currentDraftWidgetId: null,
      draftWidgets: [],
    },
    workspaces: {},
  };
  return {
    app: {
      ...rawAppState,
      initTemplate() {
        const { template } = get().app.editor;
        const result = template?.fields.map((field) => {
          return transformDraftWidget(field, template.configs);
        });
        if (result) {
          get().app.setDraftWidgets(result);
        }
      },
      parserTemplate(template) {
        const { currentDraftWidgetId, draftWidgets } = get().app.editor;
        const selectIndex = draftWidgets.findIndex(
          (i) => i.id === currentDraftWidgetId,
        );
        const result = template.fields.map((field) => {
          return transformDraftWidget(field, template.configs);
        });
        get().app.setDraftWidgets(result);
        if (selectIndex !== -1) {
          get().app.setCurrentDraftWidgetIdWithIndex(selectIndex);
        }
      },
      release() {
        const { form, draftWidgets } = get().app.editor;
        if (form === null) {
          return Promise.reject();
        }
        const data = {
          form_id: form.id,
          fields: draftWidgets.map((field, fi) => {
            return {
              field_type: field.name,
              field_name: field.name,
              order_index: fi,
              config: field.configuration.map((c, i) => ({
                field_id: field.id,
                key: c.key,
                text: c.text,
                type: c.type,
                value: JSON.stringify(c.value),
                json_string_value: JSON.stringify(c.value),
                order_index: i,
              })),
            };
          }),
        };
        return formService.releaseForm(data);
      },
      setEditorFormTemplate(formTemplate: App.FormTemplate) {
        set(
          (state) => {
            state.app.editor.form = formTemplate.form;
            state.app.editor.template = formTemplate.template;
          },
          false,
          'app/setEditorForm',
        );
      },
      setCanvasSize(size) {
        set((state) => {
          state.app.editor.canvas.width = size.width;
          state.app.editor.canvas.height = size.height;
        });
      },
      setCurrentDragItemType(type) {
        set(
          (state) => {
            state.app.editor.currentDragItemType = type;
          },
          false,
          'app/setCurrentDragItemType',
        );
      },
      findDraftIndexById(id) {
        return get().app.editor.draftWidgets.findIndex(
          (draft) => draft.id === id,
        );
      },
      delDraftWidgetWithId(id) {
        const idx = get().app.editor.draftWidgets.findIndex(
          (item) => item.id === id,
        );
        if (idx === -1) return -1;
        const curIdx = get().app.editor.currentDraftWidgetId;
        if (curIdx === id) {
          get().app.setCurrentDraftWidgetId(null);
        }
        set(
          (state) => {
            state.app.editor.draftWidgets.splice(idx, 1);
          },
          false,
          'app/delDraftWidgetWithId',
        );
        return idx;
      },
      resetEditor() {
        set(
          (state) => {
            state.app.editor.draftWidgets = [];
            (state.app.editor.currentDraftWidgetId = null),
              (state.app.editor.currentDragItemType = undefined);
          },
          false,
          'app/resetEditor',
        );
      },
      resetAppState() {
        set(
          (state) => {
            state.app.editor = rawAppState.editor;
            state.app.workspaces = rawAppState.workspaces;
            state.app.navbar = rawAppState.navbar;
          },
          false,
          'app/resetAppState',
        );
      },
      setDraftWidgets(elements) {
        set(
          (state) => {
            state.app.editor.draftWidgets = elements;
          },
          false,
          'app/setDraftWidgets',
        );
      },
      setDraftWidgetProperties(elementId, propertyIdx, value) {
        if (!elementId) return;
        const elementIdx = get().app.editor.draftWidgets.findIndex(
          (item) => item.id === elementId,
        );
        set(
          (state) => {
            state.app.editor.draftWidgets[elementIdx].configuration[
              propertyIdx
            ].value = value;
          },
          false,
          'app/setDraftWidgetProperties',
        );
      },
      setCurrentDraftWidgetIdWithIndex(index) {
        const elements = get().app.editor.draftWidgets;
        if (index < 0) return;
        if (elements.length === 0) return;
        if (index > elements.length - 1) {
          index = elements.length - 1;
        }
        const id = elements[index].id;
        set(
          (state) => {
            state.app.editor.currentDraftWidgetId = id;
          },
          false,
          'app/setCurrentDraftWidgetIdWithIndex',
        );
      },
      setCurrentDraftWidgetId(id) {
        set(
          (state) => {
            state.app.editor.currentDraftWidgetId = id;
          },
          false,
          'app/setCurrentDraftWidgetId',
        );
      },
      addDraftWidget(item) {
        set(
          (state) => {
            state.app.editor.draftWidgets.push(item);
          },
          false,
          'app/addDraftWidget',
        );
      },
      setNavbarSearch(val) {
        set(
          (state) => {
            state.app.navbar.search = val;
          },
          false,
          'app/setNavbarSearch',
        );
      },
    },
  };
};
export default appSlice;
