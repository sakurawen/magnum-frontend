import { MaterialSchema } from '@/schemas/material';
import cx from 'clsx';

type MaterialProps = {
  item: MaterialSchema;
  className?: string;
};

const Material = ({ item, className }: MaterialProps) => {
  return (
    <div
      className={cx(
        'flex items-center justify-center rounded p-1.5',
        className,
      )}
    >
      <div className="ring-theme-gray-3 bg-theme-gray-1 text-theme-content-2/80 ring-theme-3/20 group flex w-full  flex-col items-center justify-center rounded-md  px-2 py-2 ring-1 transition hover:shadow-sm hover:ring-1">
        <div className="flex min-h-[32px]  w-full items-center justify-center rounded p-1 text-center">
          <div className="group-hover:text-theme-content-2 rounded  bg-gray-100 px-2.5 py-1 text-gray-500 transition">
            {item.preview}
          </div>
        </div>
        <span className="group-hover:text-theme-content-2 mt-1 select-none text-xs text-gray-500">
          {item.item.text}
        </span>
      </div>
    </div>
  );
};
export default Material;
