'use client';
import { materialList } from '@/components/material';
import Dragable from '@/components/Dragable';

const MaterialList = () => {
  return (
    <div className="px-4">
      <h1 className="text-sm py-2 select-none ">Material</h1>
      <div className="flex items-center mt-2 flex-wrap">
        {materialList.map((m) => {
          return (
            <Dragable
              key={m.type}
              item={m.item}
              className="flex w-1/2 p-1 justify-center items-center cursor-pointer rounded"
              type={m.type}
            >
              <div className="w-full py-2 ring-theme-gray-2 hover:ring-theme-gray-3  ring-1 bg-theme-gray-1/80 rounded px-2 flex flex-col items-center justify-center">
                <div className="w-full text-center bg-theme-gray-2 flex items-center p-1 min-h-[32px] justify-center rounded">{m.component}</div>
                <span className="mt-1 text-xs select-none text-theme-content-1/50">{m.type}</span>
              </div>
            </Dragable>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialList;
