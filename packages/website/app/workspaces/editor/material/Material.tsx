import { MaterialSchema } from '@/schemas/material';
import cx from 'clsx';

type MaterialProps = {
  item: MaterialSchema;
  className?: string;
};

const Material = ({ item, className }: MaterialProps) => {
  return (
    <div
      className={cx('flex p-1 justify-center items-center rounded', className)}
    >
      <div className="w-full py-2 ring-theme-gray-2 hover:ring-theme-gray-3 hover:ring-2 ring-1 bg-theme-gray-1 rounded px-2 flex flex-col items-center justify-center">
        <div className="w-full text-center bg-theme-gray-2 flex items-center p-1 min-h-[32px] justify-center rounded">
          {item.preview}
        </div>
        <span className="mt-1 text-xs select-none text-theme-content-1/50">
          {item.item.name}
        </span>
      </div>
    </div>
  );
};
export default Material;
