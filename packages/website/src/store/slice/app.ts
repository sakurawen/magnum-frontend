import { SliceCreator } from '../store';

export type AppSliceState = {
  app: {
    count: number;
    incrCount(): void;
  };
};

const appSlice: SliceCreator<AppSliceState> = (set, get) => {
  return {
    app: {
      count: 1,
      incrCount: () => {
        set((state) => {
          state.app.count += 1;
        });
      },
    },
  };
};
export default appSlice;
