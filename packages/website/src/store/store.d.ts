import { StateCreator } from 'zustand';
import type { AppSliceState } from './slice/app';
import type { UserSliceState } from './slice/user';

export type RootState = AppSliceState & UserSliceState;

export type SliceCreator<Slice> = StateCreator<
  RootState,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  Slice
>;
