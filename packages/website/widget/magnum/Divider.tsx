import { MaterialSchema } from '@/schemas/material';

const DividerImpl = () => {
  return (
    <div className="py-2">
      <div className="divider  h-[1px] bg-theme-gray-3"></div>
    </div>
  );
};

export const DividerWidgetConfig: MaterialSchema['item'] = {
  name: 'Divider',
  text: '分割线',
  componentType: DividerImpl,
  internal: {},
  config: [],
};

export default DividerImpl;
