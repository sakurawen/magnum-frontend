import { SliceCreator } from '../store';
import { DraftElement } from '@/schemas/draft';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
    };
    editor: {
      currentDragItemType: 'Material' | 'Element' | undefined;
      // 当前选中的草稿组件id
      currentDraftElementId: string | null;
      draftElements: DraftElement[];
    };
    workspaces: {};
    setCurrentDraftComponentId(id: string | null): void;
    setCurrentDragItemType(type: 'Material' | 'Element' | undefined): void;
    delDraftElementWithId(id: string): void;
    setDraftElementProperties(elementId: string, key: string, value: any): void;
    addDraftElement(item: DraftElement): void;
    findDraftIndexById(id: string): number;
    setDraftElements(elements: DraftElement[]): void;
    setNavbarSearch(val: string): void;
    resetAppState(): void;
  };
};
const appSlice: SliceCreator<AppSliceState> = (set, get) => {
  const rawAppState = {
    navbar: {
      search: '',
    },
    editor: {
      currentDragItemType: undefined,
      currentDraftElementId: null,
      draftElements: [],
    },
    workspaces: {},
  };
  return {
    app: {
      ...rawAppState,
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
        if (idx === -1) return;
        const curIdx = get().app.editor.currentDraftElementId;
        if (curIdx === id) {
          get().app.setCurrentDraftComponentId(null);
        }
        set(
          (state) => {
            state.app.editor.draftElements.splice(idx, 1);
          },
          false,
          'app/delDraftElementWithId',
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
      setDraftElements(elements) {
        set(
          (state) => {
            state.app.editor.draftElements = elements;
          },
          false,
          'app/setDraftElements',
        );
      },
      setDraftElementProperties(elementId, key, value) {
        const elementIdx = get().app.editor.draftElements.findIndex(
          (item) => item.id === elementId,
        );
        set(
          (state) => {
            state.app.editor.draftElements[elementIdx].configuration.properties[
              key
            ].value = value;
          },
          false,
          'app/setDraftElementProperties',
        );
      },
      setCurrentDraftComponentId(id) {
        set(
          (state) => {
            state.app.editor.currentDraftElementId = id;
          },
          false,
          'app/setCurrentDraftComponentId',
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
