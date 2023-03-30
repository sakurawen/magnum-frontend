'use client';
import { materialList } from '@/widget/magnum';
import MaterialDragable from './Dragable';
import Material from './Material';

const MaterialList = () => {
  const formMaterial = materialList.filter((m) => m.type === 'Form');
  const mediaMaterial = materialList.filter((m) => m.type === 'Media');

  return (
    <div className="px-2">
      <div>
        <h2 className="px-2 pt-4 text-sm">表单组件</h2>
        <div className="flex items-center mt-2 flex-wrap">
          {formMaterial.map((m) => {
            return (
              <MaterialDragable
                className="w-1/3"
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
      <div>
        <h2 className="px-2 pt-4 text-sm">媒体组件</h2>
        <div className="flex items-center mt-2 flex-wrap">
          {mediaMaterial.map((m) => {
            return (
              <MaterialDragable
                className="w-1/3"
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
    </div>
  );
};

export default MaterialList;
