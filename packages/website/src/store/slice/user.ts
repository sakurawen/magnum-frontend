import { SliceCreator } from '../store';

export type UserSliceState = {
  user: {
    name: string;
  };
};

const userSlice: SliceCreator<UserSliceState> = (set, get) => {
  return {
    user: {
      name: 'jojo',
    },
  };
};

export default userSlice;
