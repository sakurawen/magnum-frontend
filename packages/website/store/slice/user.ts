import { userService } from '@/services';
import { SliceCreator } from '../store';
type InitParams = {
  id: string;
  name: string;
  account: string;
};

export type UserSliceState = {
  user: {
    name?: string;
    account?: string;
    id?: string;
    logout(): Promise<void>;
    init(initParams: InitParams): void;
  };
};

const userSlice: SliceCreator<UserSliceState> = (set, get) => {
  const rawState = {
    name: undefined,
    account: undefined,
    id: undefined,
  };
  return {
    user: {
      ...rawState,
      init({ id, name, account }) {
        set(
          (state) => {
            state.user.id = id;
            state.user.account = account;
            state.user.name = name;
          },
          false,
          'user/init',
        );
      },
      logout: () => {
        return new Promise<void>((resolve, reject) => {
          userService
            .logout()
            .then(() => {
              set(
                (state) => {
                  state.user.id = '';
                  state.user.account = '';
                  state.user.name = '';
                },
                false,
                'user/logout',
              );
              setTimeout(() => {
                get().app.resetAppState();
              }, 500);
              resolve();
            })
            .catch(reject);
        });
      },
    },
  };
};

export default userSlice;
