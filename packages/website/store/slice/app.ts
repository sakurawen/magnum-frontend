import { SliceCreator } from '../store';
import { DraftWidget } from '@/schemas/draft';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
    };
    editor: {
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
    setCanvasSize(size: { height: number; width: number }): void;
  };
};
const appSlice: SliceCreator<AppSliceState> = (set, get) => {
  const rawAppState = {
    navbar: {
      search: '',
    },
    editor: {
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
