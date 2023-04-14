import { MaterialSchema } from '@/schemas/material';
import { propertyType } from '../consts';

export const CheckboxSchema: MaterialSchema['item'] = {
  name: 'Checkbox',
  text: '选框',
  internal: {
    checked: true,
    tabIndex: -1,
  },
  config: [
    {
      key: 'description',
      value: '同意协议',
      type: propertyType.INPUT,
      text: '说明文本',
    },
    {
      key: 'checked',
      type: propertyType.CHECKBOX,
      value: true,
      text: '是否勾选',
    },
  ],
};
