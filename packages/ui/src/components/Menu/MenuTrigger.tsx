import { useContext } from 'react';
import cx from 'clsx';
import { MenuContext } from './context';
export type MenuTriggerProps = {
  children?: React.ReactNode;
  className?: string;
};
const MenuTrigger = ({ children, className }: MenuTriggerProps) => {
  const [, dispatch] = useContext(MenuContext);
  const handleToggle = () => {
    dispatch('toggle');
  };
  return (
    <div onClick={handleToggle} className={cx('menu-trigger', className)}>
      {children}
    </div>
  );
};

export default MenuTrigger;
