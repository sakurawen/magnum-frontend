'use client';
import {
  createDraftWidget,
  DraftWidget,
  DraftWidgetSchema,
} from '@/schemas/draft';
import { MaterialSchema } from '@/schemas/material';
import { useTrackedAppStore } from '@/store';
import { materialList } from '@/widget/magnum';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { PropsWithChildren, useState } from 'react';
import DragPReview from './DragPreview';

const ClientDndContext = ({ children }: PropsWithChildren) => {
  const {
    app: {
      addDraftWidget,
      setDraftWidgets,
      findDraftIndexById,
      setCurrentDragItemType,
      editor: { draftWidgets },
    },
  } = useTrackedAppStore();

  const [preview, setPreview] = useState<
    | {
        type: 'material' | 'element';
        data: MaterialSchema | DraftWidget;
      }
    | undefined
  >();

  const previewMaterial = (e: DragStartEvent) => {
    const item = e.active.data.current as DraftWidgetSchema;
    const material = materialList.find(
      (m) => m.item.name === item.name,
    ) as MaterialSchema;
    setPreview({
      type: 'material',
      data: material,
    });
  };
  const previewElement = (e: DragStartEvent) => {
    const element = e.active.data.current as DraftWidget;
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
    setCurrentDragItemType(isElement ? 'Element' : 'Material');
    if (isMaterial) {
      previewMaterial(e);
    }
    if (isElement) {
      previewElement(e);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setPreview(undefined);
    setCurrentDragItemType(undefined);
    if ((active.id as string).startsWith('Material|') && over?.id === 'Draft') {
      draftDragEnd(e);
    }
    if ((active.id as string).startsWith('Element')) {
      sortDraft(e);
    }
  };

  const draftDragEnd = (e: DragStartEvent) => {
    const item = e.active.data.current as DraftWidgetSchema;
    addDraftWidget(createDraftWidget(item));
  };

  const sortDraft = (e: DragEndEvent) => {
    const { active, over } = e;
    const activeId = active.id as string;
    const overId = over?.id as string;
    if (!activeId || !overId) return;
    const [activeTag, activeUUID] = activeId?.split('|');
    const [overTag, overUUID] = overId?.split('|');
    if (
      activeId &&
      overId &&
      activeTag === 'Element' &&
      overTag === 'Element'
    ) {
      const activeIndex = findDraftIndexById(activeUUID);
      const overIndex = findDraftIndexById(overUUID);
      const next = arrayMove(draftWidgets, activeIndex, overIndex);
      setDraftWidgets(next);
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
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragPReview preview={preview} />
    </DndContext>
  );
};

export default ClientDndContext;
