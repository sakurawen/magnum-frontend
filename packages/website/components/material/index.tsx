import type { Material } from '@/schemas/material';
import { Icon } from '@iconify/react';
import { Button, Checkbox, Input } from '@magnum/ui';
import cx from 'clsx';
import ButtonImpl from './impl/magnum/Button';
import CheckboxImpl from './impl/magnum/Checkbox';
import DividerImpl from './impl/magnum/Divider';
import ImageImpl from './impl/magnum/Image';
import InputImpl from './impl/magnum/Input';
import TextareaImpl from './impl/magnum/Textarea';

const materialElementCls = 'pointer-events-none ';

export const materialList: Material[] = [
  {
    type: 'Button',
    item: {
      name: 'Button',
      componentType: ButtonImpl,
      internal: {
        className: 'w-full',
      },
      config: {
        size: 'large',
        children: 'wuhu',
        variant: 'primary',
      },
    },
    preview: <Button className={cx(materialElementCls, 'w-full')} />,
  },
  {
    type: 'Input',
    item: {
      name: 'Input',
      componentType: InputImpl,
      internal: {
        fill: true,
      },
      config: {
        size: 'large',
        placeholder: '随便写点什么吧...',
        label: 'Input label',
      },
    },
    preview: (
      <Input className={cx(materialElementCls, '!bg-theme-gray-2 shadow-sm')} />
    ),
  },
  {
    type: 'Checkbox',
    item: {
      name: 'Checkbox',
      componentType: CheckboxImpl,
      internal: {
        checked: true,
      },
      config: {
        description: 'description',
      },
    },
    preview: <Checkbox className={materialElementCls} checked={true} />,
  },
  {
    type: 'Textarea',
    item: {
      name: 'Textarea',
      componentType: TextareaImpl,
      internal: {},
      config: {
        size: 'large',
        placeholder: '随便写点什么吧...',
        label: 'Textarea label',
        rows:4,
      },
    },
    preview: (
      <Icon
        className={cx(materialElementCls, 'w-5 h-5')}
        icon="heroicons:pencil-square"
      />
    ),
  },
  {
    type: 'Image',
    item: {
      name: 'Image',
      componentType: ImageImpl,
      internal: {},
      config: {},
    },
    preview: (
      <Icon
        className={cx(materialElementCls, 'w-5 h-5')}
        icon="heroicons:photo"
      />
    ),
  },
  {
    type: 'Divider',
    item: {
      name: 'Divider',
      componentType: DividerImpl,
      internal: {},
      config: {},
    },
    preview: (
      <Icon
        className={cx(materialElementCls, 'w-5 h-5')}
        icon="heroicons:photo"
      />
    ),
  },
];

export const materialAcceptTypes = materialList.map((item) => item.type);
export const draftAcceptTypes = materialList.map(
  (item) => 'draft-' + item.type,
);
