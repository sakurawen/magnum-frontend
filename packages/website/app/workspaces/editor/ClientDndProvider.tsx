'use client';
import { materialList, materialIds } from '@/components/material';
import { DraftItem, createDraftElement } from '@/schemas/draft';
import { Material } from '@/schemas/material';
import { useTrackedAppStore } from '@/store';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  MouseSensor,
  useSensors,
  PointerSensor,
  PointerSensorOptions,
} from '@dnd-kit/core';
import { PropsWithChildren, useState } from 'react';
import { log } from '@/utils';
import { createPortal } from 'react-dom';

const ClientDndProvider = ({ children }: PropsWithChildren) => {
  const {
    app: { addDraftElement },
  } = useTrackedAppStore();
  const [dragMaterial, setDragMaterial] = useState<Material | undefined>();

  const previewMaterialDrag = (e: DragStartEvent) => {
    log.info('drag', 'Material ' + e.active.id);
    const item = e.active.data.current as DraftItem;
    const material = materialList.find((m) => m.item.name === item.name);
    setDragMaterial(material);
  };

  const handleDragStart = (e: DragStartEvent) => {
    console.log(e)
    if (!e.active.data.current) return;
    if (materialIds.includes(e.active.id as string)) {
      previewMaterialDrag(e);
    }
  };

  const draftDrop = (e: DragStartEvent) => {
    log.info('drop', 'draft');
    const item = e.active.data.current as DraftItem;
    addDraftElement(createDraftElement(item));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    console.log('drag end:', e);
    setDragMaterial(undefined);
    if (materialIds.includes(e.active.id as string) && e.over?.id === 'Draft') {
      draftDrop(e);
    }
  };

  const mouseSensor = useSensor(MouseSensor);
  const pointerSensor = useSensor(PointerSensor, {
    delay: 250,
    tolerance: 5,
  } as PointerSensorOptions);
  const sensors = useSensors(mouseSensor, pointerSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      {createPortal(
        <DragOverlay>
          {dragMaterial ? (
            <div className="flex w-38 p-1 justify-center items-center rounded">
              <div className="w-full py-2 ring-theme-gray-2 hover:ring-theme-gray-3 hover:ring-2 ring-1 bg-theme-gray-1 rounded px-2 flex flex-col items-center justify-center">
                <div className="w-full text-center bg-theme-gray-2 flex items-center p-1 min-h-[32px] justify-center rounded">
                  {dragMaterial.preview}
                </div>
                <span className="mt-1 text-xs select-none text-theme-content-1/50">
                  {dragMaterial.item.name}
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

export default ClientDndProvider;
