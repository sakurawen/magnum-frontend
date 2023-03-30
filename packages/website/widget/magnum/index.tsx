import type { MaterialSchema } from '@/schemas/material';
import { Icon } from '@iconify/react';
import cx from 'clsx';
import { getWidgetConfig } from './utils';
const materialElementCls = 'pointer-events-none ';

export const materialList: MaterialSchema[] = [
  {
    type: 'Form',
    preview: <Icon className="w-6 h-6" icon="ic:baseline-title" />,
    item: getWidgetConfig('title'),
  },
  {
    type: 'Form',
    preview: <Icon className="w-6 h-6" icon="bi:text-paragraph" />,
    item: getWidgetConfig('p'),
  },
  {
    type: 'Form',
    preview: <Icon icon="radix-icons:button" className="w-6 h-6" />,
    item: getWidgetConfig('button'),
  },
  {
    type: 'Form',
    preview: <Icon icon="ri:checkbox-multiple-line" className="w-6 h-6" />,
    item: getWidgetConfig('checkbox'),
  },
  {
    type: 'Form',
    preview: <Icon className="w-6 h-6" icon="bi:textarea-resize" />,
    item: getWidgetConfig('textarea'),
  },
  {
    type: 'Form',
    preview: <Icon icon="bi:input-cursor-text" className="w-6 h-6" />,
    item: getWidgetConfig('input'),
  },
  {
    type: 'Form',
    preview: (
      <Icon
        className={cx(materialElementCls, 'w-6 h-6')}
        icon="radix-icons:divider-horizontal"
      />
    ),
    item: getWidgetConfig('divider'),
  },
  {
    type: 'Media',
    preview: <Icon className="w-6 h-6" icon="radix-icons:image" />,
    item: getWidgetConfig('image'),
  },
  {
    type: 'Media',
    preview: <Icon className="w-6 h-6" icon="radix-icons:video" />,
    item: getWidgetConfig('video'),
  },
  {
    type: 'Form',
    preview: (
      <Icon className="w-6 h-6" icon="material-symbols:space-bar-rounded" />
    ),
    item: getWidgetConfig('space'),
  },
];
