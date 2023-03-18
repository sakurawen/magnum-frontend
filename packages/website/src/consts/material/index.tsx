import { Button, Input, Checkbox } from '@magnum/ui';
import type { Material } from '@/typings';
import cx from 'clsx';

const materialElementCls = 'shadow pointer-events-none ';

export const materialList: Material[] = [
  {
    type: 'Button',
    item: {
      defaultClassName: 'w-full',
      name: 'Button',
      componentType: Button,
      configuration: {
        size: 'large',
      },
    },
    preview: <Button className={cx(materialElementCls, 'w-full')} />,
  },
  {
    type: 'Input',
    item: {
      defaultClassName: '',
      name: 'Input',
      componentType: Input,
      configuration: { fill: true, size: 'large' },
    },
    preview: <Input className={cx(materialElementCls, '!bg-theme-gray-2')} />,
  },
  {
    type: 'Checkbox',
    item: {
      defaultClassName: '',
      name: 'Checkbox',
      componentType: Checkbox,
      configuration: {
        checked: true,
      },
    },
    preview: <Checkbox className={materialElementCls} checked={true} />,
  },
];

export const acceptTypes = materialList.map((item) => item.type);
