import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import userSlice from './slice/user';
import appSlice from './slice/app';
import { RootState } from './store';
const useStore = create<RootState>()(
  devtools(
    immer((...a) => {
      return {
        ...userSlice(...a),
        ...appSlice(...a),
      };
    }),
  ),
);

export default useStore;
