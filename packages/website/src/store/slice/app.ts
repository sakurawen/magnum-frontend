import { SliceCreator } from '../store';
import { DraftElement } from '@/utils/draft';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
    };
    editor: {
      // 当前选中的草稿组件
      currentDraftElement: DraftElement | null;
      draft: DraftElement[];
    };
    workspaces: {};
    setCurrentDraftComponent(item: DraftElement): void;
    setDraftElementProperties(): void;
    addDraftElement(item: DraftElement): void;
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
      draft: [],
    },
    workspaces: {},
  };
  return {
    app: {
      ...rawAppState,
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
      setCurrentDraftComponent(item: DraftElement) {
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
            state.app.editor.draft.push(item);
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
