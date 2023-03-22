'use client';
import { materialList } from '@/components/material';
import MaterialDragable from '@/components/MaterialDragable';

const Materials = () => {
  return (
    <div className="px-4">
      <h1 className="text-sm py-2 select-none ">Material</h1>
      <div className="flex items-center mt-2 flex-wrap">
        {materialList.map((m) => {
          return (
            <MaterialDragable
              key={m.type}
              item={m.item}
              className="flex w-1/2 p-1 justify-center items-center rounded"
              type={m.type}
            >
              <div className="w-full py-2 ring-theme-gray-2 hover:ring-theme-gray-3 hover:ring-2 ring-1 bg-theme-gray-1 rounded px-2 flex flex-col items-center justify-center">
                <div className="w-full text-center bg-theme-gray-2 flex items-center p-1 min-h-[32px] justify-center rounded">
                  {m.preview}
                </div>
                <span className="mt-1 text-xs select-none text-theme-content-1/50">
                  {m.type}
                </span>
              </div>
            </MaterialDragable>
          );
        })}
      </div>
    </div>
  );
};

export default Materials;
