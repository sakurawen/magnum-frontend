import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Magnum Form',
  description: 'welcome to magnum form',
};

const LoginLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default LoginLayout;
