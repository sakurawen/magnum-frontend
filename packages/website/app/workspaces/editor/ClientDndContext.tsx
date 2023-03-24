'use client';
import { materialIds, materialList } from '@/components/magnum';
import {
  createDraftElement,
  DraftElement,
  DraftElementSchema,
} from '@/schemas/draft';
import { MaterialSchema } from '@/schemas/material';
import { useTrackedAppStore } from '@/store';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  useSensors,
  useSensor,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import Element from './element/Element';
import Material from './material/Material';

const ClientDndContext = ({ children }: PropsWithChildren) => {
  const {
    app: {
      addDraftElement,
      setDraftElements,
      findDraftIndexById,
      editor: { draftElements },
    },
  } = useTrackedAppStore();

  const [preview, setPreview] = useState<
    | {
        type: 'material' | 'element';
        data: MaterialSchema | DraftElement;
      }
    | undefined
  >();

  const previewMaterial = (e: DragStartEvent) => {
    const item = e.active.data.current as DraftElementSchema;
    const material = materialList.find(
      (m) => m.item.name === item.name,
    ) as MaterialSchema;
    setPreview({
      type: 'material',
      data: material,
    });
  };
  const previewElement = (e: DragStartEvent) => {
    const element = e.active.data.current as DraftElement;
    setPreview({
      type: 'element',
      data: element,
    });
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (!e.active.data.current) return;
    const id = e.active.id as string;
    const isElement = id.startsWith('Element');
    const isMaterial = id.startsWith('Material');
    if (isMaterial) {
      previewMaterial(e);
    }
    if (isElement) {
      previewElement(e);
    }
  };

  const draftDragEnd = (e: DragStartEvent) => {
    const item = e.active.data.current as DraftElementSchema;
    addDraftElement(createDraftElement(item));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setPreview(undefined);
    if (materialIds.includes(active.id as string) && over?.id === 'Draft') {
      draftDragEnd(e);
    }
    const activeId = active.id as string;
    const overId = over?.id as string;
    const [aTag, aid] = activeId.split('-');
    const [oTag, oid] = overId.split('-');
    if (activeId && overId && aTag === 'Element' && oTag === 'Element') {
      const activeIndex = findDraftIndexById(aid);
      const overIndex = findDraftIndexById(oid);
      // setDraftElements(arrayMove(draftElements, newIndex, oldIndex));
      const next = arrayMove(draftElements, activeIndex, overIndex);
      console.log({ next, activeIndex, overIndex });
      setDraftElements(next);
    }
  };
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      accessibility={undefined}
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      {createPortal(
        <DragOverlay>
          {preview?.type === 'material' ? (
            <Material item={preview.data as MaterialSchema} />
          ) : null}
          {preview?.type === 'element' ? (
            <div className="bg-white">
              <Element item={preview.data as DraftElement} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

export default ClientDndContext;
