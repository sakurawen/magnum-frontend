import type { MaterialSchema } from '@/schemas/material';
import { Icon } from '@iconify/react';
import { Button, Checkbox, Input } from '@magnum/ui';
import cx from 'clsx';
import ButtonImpl from './Button';
import CheckboxImpl from './Checkbox';
import DividerImpl from './Divider';
import ImageImpl from './Image';
import InputImpl from './Input';
import Paragraph from './Paragraph';
import TextareaImpl from './Textarea';
import Title from './Title';

const materialElementCls = 'pointer-events-none ';

export const materialList: MaterialSchema[] = [
  {
    type: 'Material',
    item: {
      name: 'Title',
      componentType: Title,
      internal: {},
      config: {
        text: 'Lorem ipsum',
      },
    },
    preview: <Icon className="w-5 h-5" icon="pajamas:title" />,
  },
  {
    type: 'Material',
    item: {
      name: 'Paragraph',
      componentType: Paragraph,
      internal: {},
      config: {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt soluta error, tempore mollitia consequatur quos voluptatum sit perferendis distinctio nisi animi officia. Repudiandae itaque eligendi, veritatis porro pariatur quia exercitationem.',
      },
    },
    preview: <Icon className="w-5 h-5" icon="bi:text-paragraph" />,
  },
  {
    type: 'Material',
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
    preview: <Icon icon="radix-icons:button" className="w-5 h-5" />,
  },
  {
    type: 'Material',
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
    preview: <Icon icon="radix-icons:input" className="w-5 h-5" />,
  },
  {
    type: 'Material',
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
    preview: <Icon icon="radix-icons:checkbox" className="w-5 h-5" />,
  },
  {
    type: 'Material',
    item: {
      name: 'Textarea',
      componentType: TextareaImpl,
      internal: {},
      config: {
        size: 'large',
        placeholder: '随便写点什么吧...',
        label: 'Textarea label',
        rows: 4,
      },
    },
    preview: <Icon className="w-5 h-5" icon="radix-icons:rows" />,
  },
  {
    type: 'Material',
    item: {
      name: 'Divider',
      componentType: DividerImpl,
      internal: {},
      config: {},
    },
    preview: (
      <Icon
        className={cx(materialElementCls, 'w-5 h-5')}
        icon="radix-icons:divider-horizontal"
      />
    ),
  },
  {
    type: 'Material',
    item: {
      name: 'Image',
      componentType: ImageImpl,
      internal: {},
      config: {
        full: false,
      },
    },
    preview: <Icon className="w-5 h-5" icon="radix-icons:image" />,
  },
];

export const materialAcceptTypes = materialList.map((item) => item.type);
export const materialIds = materialList.map(
  (item) => 'Material|' + item.item.name,
);
