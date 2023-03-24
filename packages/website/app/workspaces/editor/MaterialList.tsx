'use client';
import { materialList } from '@/components/magnum';
import MaterialDragable from './material/Dragable';
import Material from './material/Material';

const MaterialList = () => {
  return (
    <div className="px-4">
      <h1 className="text-sm py-2 select-none ">Material</h1>
      <div className="flex items-center mt-2 flex-wrap">
        {materialList.map((m) => {
          return (
            <MaterialDragable
              className="w-1/2"
              key={m.item.name}
              item={m.item}
              id={m.item.name}
            >
              <Material item={m} />
            </MaterialDragable>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialList;
