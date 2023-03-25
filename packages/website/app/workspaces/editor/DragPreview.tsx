import { createPortal } from 'react-dom';
import { DragOverlay } from '@dnd-kit/core';
import Material from './material/Material';
import Element from './element/Element';
import { MaterialSchema } from '@/schemas/material';
import { DraftElement } from '@/schemas/draft';

type DragPreviewProps = {
  preview:
    | {
        type: 'material' | 'element';
        data: MaterialSchema | DraftElement;
      }
    | undefined;
};

const DragPreview = ({ preview }: DragPreviewProps) => {
  return createPortal(
    <DragOverlay>
      {preview?.type === 'material' ? (
        <Material item={preview.data as MaterialSchema} />
      ) : null}
      {preview?.type === 'element' ? (
        <div className="bg-white rounded shadow">
          <Element item={preview.data as DraftElement} />
        </div>
      ) : null}
    </DragOverlay>,
    document.body,
  );
};

export default DragPreview;
