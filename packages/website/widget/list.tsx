import type { MaterialSchema } from '@/schemas/material';
import { Icon } from '@iconify/react';
import cx from 'clsx';
import { getWidgetSchema } from './utils';
const materialElementCls = 'pointer-events-none ';

export const materialList: MaterialSchema[] = [
  {
    type: 'Form',
    preview: <Icon className="h-6 w-6" icon="ic:baseline-title" />,
    item: getWidgetSchema('Title'),
  },
  {
    type: 'Form',
    preview: <Icon className="h-6 w-6" icon="bi:text-paragraph" />,
    item: getWidgetSchema('Paragraph'),
  },
  {
    type: 'Form',
    preview: <Icon icon="radix-icons:button" className="h-6 w-6" />,
    item: getWidgetSchema('Button'),
  },
  {
    type: 'Form',
    preview: <Icon icon="ri:checkbox-multiple-line" className="h-6 w-6" />,
    item: getWidgetSchema('Checkbox'),
  },
  {
    type: 'Form',
    preview: <Icon className="h-6 w-6" icon="bi:textarea-resize" />,
    item: getWidgetSchema('Textarea'),
  },
  {
    type: 'Form',
    preview: <Icon icon="bi:input-cursor-text" className="h-6 w-6" />,
    item: getWidgetSchema('Input'),
  },
  {
    type: 'Form',
    preview: (
      <Icon
        className={cx(materialElementCls, 'h-6 w-6')}
        icon="radix-icons:divider-horizontal"
      />
    ),
    item: getWidgetSchema('Divider'),
  },
  {
    type: 'Media',
    preview: <Icon className="h-6 w-6" icon="radix-icons:image" />,
    item: getWidgetSchema('Image'),
  },
  {
    type: 'Media',
    preview: <Icon className="h-6 w-6" icon="radix-icons:video" />,
    item: getWidgetSchema('Video'),
  },
  {
    type: 'Form',
    preview: (
      <Icon className="h-6 w-6" icon="material-symbols:space-bar-rounded" />
    ),
    item: getWidgetSchema('Space'),
  },
  {
    type: 'Form',
    preview: <Icon className="h-6 w-6" icon="iconoir:list-select" />,
    item: getWidgetSchema('Select'),
  },
];
