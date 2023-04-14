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
      <div className="ring-theme-gray-3 shadow-sm hover:bg-theme-50 text-theme-content-2/80 ring-gray-blue-100 hover:ring-theme-400 group flex w-full flex-col  items-center justify-center rounded-md px-2  py-2 ring-1 transition hover:ring-2">
        <div className="flex min-h-[32px]  w-full items-center justify-center rounded p-1 text-center">
          <div className="group-hover:text-theme-400  rounded px-2.5 py-1 text-gray-500 transition">
            {item.preview}
          </div>
        </div>
        <span className="group-hover:text-theme-400 mt-1 select-none text-xs text-gray-500">
          {item.item.text}
        </span>
      </div>
    </div>
  );
};
export default Material;
