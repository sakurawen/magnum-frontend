import { SliceCreator } from '../store';
import { DraftElement } from '@/schemas/draft';

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
      currentDraftElementId: string | null;
      draftElements: DraftElement[];
    };
    workspaces: {};
    // 设置当前选中element id
    setCurrentDraftElementId(id: string | null): void;
    // 根据idx选中对应索引的element id
    setCurrentDraftElementIdWithIndex(index: number): void;
    setCurrentDragItemType(type: 'Material' | 'Element' | undefined): void;
    // 根据id删除element，返回删除element的idx
    delDraftElementWithId(id: string): number;
    setDraftElementProperties(
      elementId: string,
      propertyIdx: number,
      value: any,
    ): void;
    addDraftElement(item: DraftElement): void;
    findDraftIndexById(id: string): number;
    setDraftElements(elements: DraftElement[]): void;
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
      currentDraftElementId: null,
      draftElements: [],
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
        return get().app.editor.draftElements.findIndex(
          (draft) => draft.id === id,
        );
      },
      delDraftElementWithId(id) {
        const idx = get().app.editor.draftElements.findIndex(
          (item) => item.id === id,
        );
        if (idx === -1) return -1;
        const curIdx = get().app.editor.currentDraftElementId;
        if (curIdx === id) {
          get().app.setCurrentDraftElementId(null);
        }
        set(
          (state) => {
            state.app.editor.draftElements.splice(idx, 1);
          },
          false,
          'app/delDraftElementWithId',
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
      setDraftElements(elements) {
        set(
          (state) => {
            state.app.editor.draftElements = elements;
          },
          false,
          'app/setDraftElements',
        );
      },
      setDraftElementProperties(elementId, propertyIdx, value) {
        const elementIdx = get().app.editor.draftElements.findIndex(
          (item) => item.id === elementId,
        );
        set(
          (state) => {
            state.app.editor.draftElements[elementIdx].configuration[
              propertyIdx
            ].value = value;
          },
          false,
          'app/setDraftElementProperties',
        );
      },
      setCurrentDraftElementIdWithIndex(index) {
        const elements = get().app.editor.draftElements;
        if (index < 0) return;
        if (elements.length === 0) return;
        if (index > elements.length - 1) {
          index = elements.length - 1;
        }
        const id = elements[index].id;
        set(
          (state) => {
            state.app.editor.currentDraftElementId = id;
          },
          false,
          'app/setCurrentDraftElementIdWithIndex',
        );
      },
      setCurrentDraftElementId(id) {
        set(
          (state) => {
            state.app.editor.currentDraftElementId = id;
          },
          false,
          'app/setCurrentDraftElementId',
        );
      },
      addDraftElement(item) {
        set(
          (state) => {
            state.app.editor.draftElements.push(item);
          },
          false,
          'app/addDraftElement',
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
