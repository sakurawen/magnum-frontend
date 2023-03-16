import { SliceCreator } from '../store';

type InitParams = {
  token: string;
  id: string;
  name: string;
  account: string;
};
export type UserSliceState = {
  user: {
    token?: string;
    name?: string;
    account?: string;
    id?: string;
    logout(): void;
    init(initParams: InitParams): void;
  };
};

const userSlice: SliceCreator<UserSliceState> = (set, get) => {
  return {
    user: {
      token: undefined,
      name: undefined,
      account: undefined,
      id: undefined,
      init({ id, name, account, token }) {
        set(
          (state) => {
            state.user.id = id;
            state.user.token = token;
            state.user.account = account;
            state.user.name = name;
          },
          false,
          'user/init',
        );
      },
      logout: () => {
        localStorage.removeItem('token');
        set(
          (state) => {
            state.user.token = undefined;
            state.user.id = '';
            state.user.account = '';
            state.user.name = '';
          },
          false,
          'user/logout',
        );
      },
    },
  };
};

export default userSlice;
