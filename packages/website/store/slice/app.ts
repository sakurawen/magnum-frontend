import { SliceCreator } from '../store';
import { DraftElement } from '@/schemas/draft';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
    };
    editor: {
      // 当前选中的草稿组件id
      currentDraftElementId: string | null;
      draftElements: DraftElement[];
    };
    workspaces: {};
    setCurrentDraftComponentId(id: string | null): void;
    delDraftElementWithId(id: string): void;
    setDraftElementProperties(elementId: string, key: string, value: any): void;
    addDraftElement(item: DraftElement): void;
    moveDraftElement(id: string, index: number): void;
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
      currentDraftElementId: null,
      draftElements: [],
    },
    workspaces: {},
  };
  return {
    app: {
      ...rawAppState,
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
      moveDraftElement(id, atIndex) {
        const idx = get().app.editor.draftElements.findIndex(
          (item) => item.id === id,
        );
        console.log({
          id,
          idx,
          atIndex,
        });
        if (idx === atIndex) return;
        const card = get().app.editor.draftElements[idx];
        set(
          (state) => {
            state.app.editor.draftElements.splice(idx, 1);
            state.app.editor.draftElements.splice(atIndex, 0, card);
          },
          false,
          'app/swapDraftElement',
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
