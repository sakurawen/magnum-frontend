import { DraftWidget } from '@/schemas/draft';
import { MaterialSchema } from '@/schemas/material';
import { DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import Material from './material/Material';
import Widget from './widget/Widget';

type DragPreviewProps = {
  preview:
    | {
        type: 'material' | 'element';
        data: MaterialSchema | DraftWidget;
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
          <Widget item={preview.data as DraftWidget} />
        </div>
      ) : null}
    </DragOverlay>,
    document.body,
  );
};

export default DragPreview;
