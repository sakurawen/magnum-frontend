import LoginForm from './LoginForm';

/**
 * 登录页
 * @returns
 */
const LoginPage = () => {
  return (
    <div className="login-page-container login-bg bg-cover bg-no-repeat bg-center">
      <div className="h-screen bg-white/20 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
