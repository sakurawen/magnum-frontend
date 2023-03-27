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
        'flex p-1.5 justify-center items-center rounded',
        className,
      )}
    >
      <div className="w-full py-2 rounded transition bg-theme-gray-2  text-theme-content-2/80 group hover:ring-1 ring-theme-3/20  hover:shadow-sm px-2 flex flex-col items-center justify-center">
        <div className="w-full text-center  flex items-center p-1 min-h-[32px] justify-center rounded">
          <div className="py-1 px-2.5 text-gray-600 transition group-hover:text-theme-content-2 bg-gray-200 rounded">
            {item.preview}
          </div>
        </div>
        <span className="mt-1 text-xs select-none">{item.item.text}</span>
      </div>
    </div>
  );
};
export default Material;
