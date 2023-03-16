import { SliceCreator } from '../store';

export type AppSliceState = {
  app: {
    navbar: {
      search: string;
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
