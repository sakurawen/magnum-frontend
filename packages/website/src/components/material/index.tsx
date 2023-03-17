import { Button, Input, Checkbox } from '@magnum/ui';
import cx from 'clsx';

type Material = {
  type: string;
  component: React.ReactElement;
  item: any;
};

const materialElementCls = 'shadow pointer-events-none ';
export const materialList: Material[] = [
  {
    type: 'Button',
    item: {},
    component: <Button className={cx(materialElementCls, 'w-full')} />,
  },
  {
    type: 'Input',
    item: {},
    component: <Input className={cx(materialElementCls, '!bg-theme-gray-2')} />,
  },
  {
    type: 'Checkbox',
    item: {},
    component: <Checkbox className={materialElementCls} checked={true} />,
  },
];

export const acceptTypes = materialList.map((item) => item.type);
