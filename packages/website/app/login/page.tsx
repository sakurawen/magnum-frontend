import LoginForm from './LoginForm';

/**
 * 登录页
 * @returns
 */
const LoginPage = () => {
  return (
    <div className="login-page-container bg-login  bg-cover bg-no-repeat bg-center">
      <div className="bg-grid">
        <div className="h-screen flex justify-center items-center">
          <section className="flex-1"></section>
          <section className="flex-1 flex justify-center items-center mr-40 relative z-10">
            <LoginForm />
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
