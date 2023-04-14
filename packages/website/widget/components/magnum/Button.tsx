import { Button, ButtonProps } from '@magnum/ui';

export const ButtonImpl = (props: ButtonProps) => {
  return (
    <div className="px-3 py-2">
      <Button className="p-2" {...props} />
    </div>
  );
};

export default ButtonImpl;
