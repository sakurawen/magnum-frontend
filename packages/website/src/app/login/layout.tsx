import { Background } from './Background';

export const metadata = {
  title: 'Magnum',
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Background />
      {children}
    </>
  );
};

export default LoginLayout;
