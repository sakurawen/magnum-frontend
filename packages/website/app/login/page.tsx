import LoginForm from './components/LoginForm';

/**
 * 登录页
 * @returns
 */
const LoginPage = () => {
  return (
    <div className="login-page-container bg-tailwind  bg-cover bg-center bg-no-repeat">
      <div className="flex h-screen items-center justify-center">
        <section className="flex-1  px-20 text-slate-800">
          <h2 className="text-6xl font-bold uppercase leading-tight ">
            Empowered by AIGC, limitless innovation with low-code forms.
          </h2>
          <p className="mt-4 text-4xl ">AIGC助力，低代码表单无界创新。</p>
        </section>
        <section className="relative z-10 mr-40 flex flex-1 items-center justify-center">
          <LoginForm />
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
