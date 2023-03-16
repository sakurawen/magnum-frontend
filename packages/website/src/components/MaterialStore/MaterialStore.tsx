"use client"
import { materialList } from '@/components/material';
import Dragable from '@/components/Dragable';

const MaterialList = () => {
  return (
    <div className="p-2">
      <h1 className="font-bold select-none">Material Store</h1>
      <div className="flex  items-center mt-2 flex-wrap">
        {materialList.map((m) => {
          return (
            <div key={m.type} className="w-1/2 px-2 flex flex-col items-center justify-center">
              <Dragable item={m.item} className="w-full cursor-pointer" type={m.type}>
                <m.component className="w-full block pointer-events-none" />
              </Dragable>
              <span className="mt-1 text-xs select-none text-gray-500">{m.type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialList;
