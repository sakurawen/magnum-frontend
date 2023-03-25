import { Button, ButtonProps } from '@magnum/ui';

const ButtonImpl = (props: ButtonProps) => {
  return <Button className='p-2' {...props} />;
};

export default ButtonImpl;
