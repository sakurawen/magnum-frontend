import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import userSlice from './slice/user';
import appSlice from './slice/app';
import { RootState } from './store';
import { createTrackedSelector } from 'react-tracked';

export const useAppStore = create<RootState>()(
  immer(
    devtools((...a) => {
      return {
        ...userSlice(...a),
        ...appSlice(...a),
      };
    }),
  ),
);


export const useTrackedAppStore = createTrackedSelector(useAppStore);
