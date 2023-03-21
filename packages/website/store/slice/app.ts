import { SliceCreator } from '../store';
import { DraftElement } from '@/schemas/draft';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
    };
    editor: {
      // 当前选中的草稿组件
      currentDraftElement: DraftElement | null;
      draftElements: DraftElement[];
    };
    workspaces: {};
    setCurrentDraftComponent(item: DraftElement | null): void;
    setDraftElementProperties(): void;
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
      currentDraftElement: null,
      draftElements: [],
    },
    workspaces: {},
  };
  return {
    app: {
      ...rawAppState,
      moveDraftElement(id, atIndex) {
        const idx = get().app.editor.draftElements.findIndex(
          (item) => item.id === id,
        );
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
      setDraftElementProperties() {},
      setCurrentDraftComponent(item) {
        if (item === null) {
          set(
            (state) => {
              state.app.editor.currentDraftElement = null;
            },
            false,
            'app/selectDraftComponent',
          );
          return;
        }
        if (get().app.editor.currentDraftElement?.id === item.id) {
          set((state) => {
            state.app.editor.currentDraftElement = null;
          });
          return;
        }
        set(
          (state) => {
            state.app.editor.currentDraftElement = item;
          },
          false,
          'app/selectDraftComponent',
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
