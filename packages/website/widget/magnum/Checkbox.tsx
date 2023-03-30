import { Checkbox, CheckboxProps } from '@magnum/ui';
import { MaterialSchema } from '@/schemas/material';
import { propertyType } from './consts';

const CheckboxImpl = (
  props: CheckboxProps & {
    description: string;
  },
) => {
  const { description, ...restProps } = props;
  return (
    <div className="px-3 py-2">
      <p className="inline-flex">
        <Checkbox {...restProps} />
        <span className="ml-1 text-sm text-theme-content-1/90">
          {description}
        </span>
      </p>
    </div>
  );
};

export const CheckboxWidgetConfig: MaterialSchema['item'] = {
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

export default CheckboxImpl;
