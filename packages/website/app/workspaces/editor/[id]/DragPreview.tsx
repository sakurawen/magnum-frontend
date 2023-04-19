'use client';
import { DraftWidget } from '@/schemas/draft';
import { MaterialSchema } from '@/schemas/material';
import { DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import Material from './Materials/Material';
import Widget from './Widgets/Widget';

type DragPreviewProps = {
  preview:
    | {
        type: 'material' | 'element';
        data: MaterialSchema | DraftWidget;
      }
    | undefined;
};

const DragPreview = ({ preview }: DragPreviewProps) => {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <DragOverlay>
      {preview?.type === 'material' ? (
        <Material item={preview.data as MaterialSchema} />
      ) : null}
      {preview?.type === 'element' ? (
        <div className="rounded bg-white shadow">
          <Widget item={preview.data as DraftWidget} />
        </div>
      ) : null}
    </DragOverlay>,
    document.body,
  );
};

export default DragPreview;
