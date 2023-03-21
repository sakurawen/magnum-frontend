import Button from './impl/magnum/Button';
import Input from './impl/magnum/Input';
import Checkbox from './impl/magnum/Checkbox';
import type { Material } from '@/schemas/material';
import cx from 'clsx';

const materialElementCls = 'shadow pointer-events-none ';

export const materialList: Material[] = [
  {
    type: 'Button',
    item: {
      name: 'Button',
      componentType: Button,
      internal: {
        className: 'w-full',
      },
      config: {
        size: 'large',
      },
    },
    preview: <Button className={cx(materialElementCls, 'w-full')} />,
  },
  {
    type: 'Input',
    item: {
      name: 'Input',
      componentType: Input,
      internal: {
        fill: true,
      },
      config: { size: 'large' },
    },
    preview: <Input className={cx(materialElementCls, '!bg-theme-gray-2')} />,
  },
  {
    type: 'Checkbox',
    item: {
      name: 'Checkbox',
      componentType: Checkbox,
      internal: {},
      config: {
        checked: true,
      },
    },
    preview: <Checkbox className={materialElementCls} checked={true} />,
  },
];

export const materialAcceptTypes = materialList.map((item) => item.type);
export const draftAcceptTypes = materialList.map(
  (item) => 'draft-' + item.type,
);
