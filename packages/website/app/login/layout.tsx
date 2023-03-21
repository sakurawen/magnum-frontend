import { PropsWithChildren } from 'react';
import { Background } from './Background';

export const metadata = {
  title: 'Magnum Form',
};

const LoginLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <Background /> */}
      {children}
    </>
  );
};

export default LoginLayout;
