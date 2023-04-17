import LoginForm from './components/LoginForm';

/**
 * 登录页
 * @returns
 */
const LoginPage = () => {
  return (
    <div className="login-page-container bg-login  bg-cover bg-center bg-no-repeat">
        <div className="flex h-screen items-center justify-center">
          <section className="flex-1"></section>
          <section className="relative z-10 mr-40 flex flex-1 items-center justify-center">
            <LoginForm />
          </section>
        </div>
    </div>
  );
};

export default LoginPage;
