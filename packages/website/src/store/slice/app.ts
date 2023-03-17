import { SliceCreator } from '../store';
import { DraftItem } from '@/typings';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
    };
    workspaces: {
      draft: DraftItem[];
    };
    setNavbarSearch(val: string): void;
  };
};

const appSlice: SliceCreator<AppSliceState> = (set, get) => {
  return {
    app: {
      navbar: {
        search: '',
      },
      workspaces: {
        draft: [],
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
