import { Button, Input } from '@magnum/ui';

export const Components = {
  Button,
  Input,
};
type Material<Props = any> = {
  type: string;
  component: React.FC<Props>;
  item: any;
};

type MaterialProps = {
  className?: string;
};
export const materialList: Material<MaterialProps>[] = [
  {
    type: 'Button',
    item: {},
    component: Button,
  },
  {
    type: 'Input',
    item: {},
    component: Input,
  },
];
