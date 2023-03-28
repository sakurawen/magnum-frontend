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
import TitleImpl from './Title';
import VideoImpl from './Video';
const materialElementCls = 'pointer-events-none ';

export const materialList: MaterialSchema[] = [
  {
    type: 'Form',
    item: {
      name: 'Title',
      text: '文本标题',
      componentType: TitleImpl,
      internal: {
        tabIndex: -1,
      },
      config: [
        {
          key: 'text',
          value: '肉食者鄙，未能远谋。',
          type: 'string',
          text: '文本',
        },
      ],
    },
    preview: <Icon className="w-6 h-6" icon="ic:baseline-title" />,
  },
  {
    type: 'Form',
    item: {
      name: 'Paragraph',
      text: '文本段落',
      componentType: Paragraph,
      internal: {},
      config: [
        {
          key: 'text',
          value:
            '十年春，齐师伐我。公将战，曹刿请见。其乡人曰：“肉食者谋之，又何间焉？”刿曰：“肉食者鄙，未能远谋。”乃入见。问：“何以战？”公曰：“衣食所安，弗敢专也，必以分人。”对曰：“小惠未遍，民弗从也。”公曰：“牺牲玉帛，弗敢加也，必以信。”对曰：“小信未孚，神弗福也。”公曰：“小大之狱，虽不能察，必以情。”对曰：“忠之属也。可以一战。战则请从。”\n公与之乘，战于长勺。公将鼓之。刿曰：“未可。”齐人三鼓。刿曰：“可矣。”齐师败绩。公将驰之。刿曰：“未可。”下视其辙，登轼而望之，曰：“可矣。”遂逐齐师。\n既克，公问其故。对曰：“夫战，勇气也。一鼓作气，再而衰，三而竭。彼竭我盈，故克之。夫大国，难测也，惧有伏焉。吾视其辙乱，望其旗靡，故逐之。”',
          text: '文本',
          type: 'string',
        },
      ],
    },
    preview: <Icon className="w-6 h-6" icon="bi:text-paragraph" />,
  },
  {
    type: 'Form',
    item: {
      name: 'Button',
      text: '按钮',
      componentType: ButtonImpl,
      internal: {
        className: 'w-full',
        tabIndex: -1,
      },
      config: [
        {
          key: 'size',
          text: '尺寸',
          value: 'large',
          type: 'string',
        },
        {
          key: 'children',
          text: '文本',
          value: '提 交',
          type: 'string',
        },
        {
          key: 'variant',
          text: '变体',
          value: 'primary',
          type: 'string',
        },
      ],
    },
    preview: <Icon icon="radix-icons:button" className="w-6 h-6" />,
  },
  {
    type: 'Form',
    item: {
      name: 'Input',
      text: '文本输入',
      componentType: InputImpl,
      internal: {
        fill: true,
        tabIndex: -1,
      },
      config: [
        {
          key: 'size',
          value: 'large',
          type: 'string',
          text: '尺寸',
        },
        {
          key: 'placeholder',
          value: '随便写点什么吧...',
          type: 'string',
          text: '提示文本',
        },
        {
          key: 'label',
          value: '标签',
          type: 'string',
          text: '标签',
        },
      ],
    },
    preview: <Icon icon="bi:input-cursor-text" className="w-6 h-6" />,
  },
  {
    type: 'Form',
    item: {
      name: 'Checkbox',
      text: '选框',
      componentType: CheckboxImpl,
      internal: {
        checked: true,
        tabIndex: -1,
      },
      config: [
        {
          key: 'description',
          value: '同意协议',
          type: 'string',
          text: '说明文本',
        },
      ],
    },
    preview: <Icon icon="ri:checkbox-multiple-line" className="w-6 h-6" />,
  },
  {
    type: 'Form',
    item: {
      name: 'Textarea',
      text: '多行文本输入',
      componentType: TextareaImpl,
      internal: {
        tabIndex: -1,
      },
      config: [
        {
          key: 'size',
          value: 'large',
          type: 'string',
          text: '尺寸',
        },
        {
          key: 'placeholder',
          value: '随便写点什么吧...',
          type: 'string',
          text: '提示文本',
        },
        {
          key: 'label',
          value: '标签',
          type: 'string',
          text: '标签',
        },
        {
          key: 'rows',
          value: 4,
          type: 'number',
          text: '行数',
        },
      ],
    },
    preview: <Icon className="w-6 h-6" icon="bi:textarea-resize" />,
  },
  {
    type: 'Form',
    item: {
      name: 'Divider',
      text: '分割线',
      componentType: DividerImpl,
      internal: {},
      config: [],
    },
    preview: (
      <Icon
        className={cx(materialElementCls, 'w-6 h-6')}
        icon="radix-icons:divider-horizontal"
      />
    ),
  },
  {
    type: 'Media',
    item: {
      name: 'Image',
      text: '图片',
      componentType: ImageImpl,
      internal: {},
      config: [
        {
          key: 'source',
          value: '',
          type: 'string',
          text: '资源路径',
        },
      ],
    },
    preview: <Icon className="w-6 h-6" icon="radix-icons:image" />,
  },
  {
    type: 'Media',
    item: {
      name: 'Video',
      text: '视频',
      componentType: VideoImpl,
      internal: {},
      config: [
        {
          key: 'source',
          value: '',
          type: 'string',
          text: '资源路径',
        },
      ],
    },
    preview: <Icon className="w-6 h-6" icon="radix-icons:video" />,
  },
];
