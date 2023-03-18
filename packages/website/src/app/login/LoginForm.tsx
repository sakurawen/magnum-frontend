'use client';
import { Button, Input, Checkbox } from '@magnum/ui';
import { startTransition, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/services';
import { useImmer } from 'use-immer';
import c from 'clsx';
import { useTrackedAppStore } from '@/store';

/**
 * 登录页
 * @returns
 */
const Login = () => {
  const [loginForm, setLoginForm] = useImmer({
    username: '',
    password: '',
  });
  type LoginForm = typeof loginForm;
  const handleSetLoginForm = <T extends keyof LoginForm>(key: T, value: LoginForm[T]) => {
    setLoginForm((form) => {
      form[key] = value;
    });
  };

  const [registerForm, setRegisterForm] = useImmer({
    username: '',
    password: '',
    passwordRepeat: '',
  });
  type RegisterForm = typeof registerForm;
  const handleSetRegisterForm = <T extends keyof RegisterForm>(key: T, value: RegisterForm[T]) => {
    setRegisterForm((form) => {
      form[key] = value;
    });
  };

  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const {
    user: { id: userID, init },
  } = useTrackedAppStore();

  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    userService
      .login(loginForm)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        init({
          token,
          id: user.id,
          account: user.account,
          name: user.name,
        });
        startTransition(() => {
          router.replace('/workspaces/editor');
        });
      })
      .catch((err) => {
        console.error('login fail:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUp = () => {
    setLoading(true);
    userService
      .register(registerForm)
      .then((res) => {
        console.log('register result:', res);
      })
      .catch((err) => {
        console.error('register fail:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [formMode, setFormMode] = useState<'login' | 'register'>('login');

  const isLoginMode = formMode === 'login';

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (loginForm.password && loginForm.username) {
        }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, [loginForm.password, loginForm.username, router]);

  useEffect(() => {
    if (userID === undefined) {
      router.replace('/workspaces/editor');
    }
  }, [userID]);

  const Login = (
    <div className="space-y-5">
      <Input
        fill
        size="large"
        disabled={loading}
        placeholder="用户名"
        value={loginForm.username}
        onChange={(e) => handleSetLoginForm('username', e.target.value)}
      />
      <Input
        fill
        className="w-full"
        size="large"
        disabled={loading}
        placeholder="密码"
        type="password"
        value={loginForm.password}
        onChange={(e) => handleSetLoginForm('password', e.target.value)}
      />
      <Button size="large" loading={loading} onClick={handleSignIn} className="w-full text-base">
        登 入
      </Button>
    </div>
  );

  const Register = (
    <div className="space-y-5">
      <Input
        fill
        size="large"
        disabled={loading}
        placeholder="用户名"
        value={registerForm.username}
        onChange={(e) => handleSetRegisterForm('username', e.target.value)}
      />
      <Input
        fill
        size="large"
        disabled={loading}
        placeholder="密码"
        type="password"
        value={registerForm.password}
        onChange={(e) => handleSetRegisterForm('password', e.target.value)}
      />
      <Input
        fill
        size="large"
        disabled={loading}
        placeholder="确认密码"
        type="password"
        value={registerForm.passwordRepeat}
        onChange={(e) => handleSetRegisterForm('passwordRepeat', e.target.value)}
      />
      <Button size="large" loading={loading} onClick={handleSignUp} className="w-full text-base">
        注 册
      </Button>
    </div>
  );

  return (
    <div className="w-[500px]  px-12 py-24 bg-white rounded-lg shadow ">
      <h2 className="text-4xl font-bold mb-8 text-theme-content-1">
        欢迎使用
        <br /> Magnum Form
      </h2>
      <div className="mb-8 space-x-4 text-sm">
        <button
          className={c('inline-block cursor-pointer relative px-2', {
            'after:absolute after:h-0.5 after:w-full after:rounded-sm after:bg-theme-deep after:left-0 after:-bottom-2 after:z-0':
              isLoginMode,
          })}
          onClick={() => setFormMode('login')}
        >
          <span className="relative z-10 select-none">登 录</span>
        </button>
        <button
          className={c('inline-block cursor-pointer relative px-2', {
            'after:absolute after:h-0.5 after:w-full after:rounded-sm after:bg-theme-deep after:left-0 after:-bottom-2 after:z-0':
              !isLoginMode,
          })}
          onClick={() => setFormMode('register')}
        >
          <span className="relative z-10 select-none">注 册</span>
        </button>
      </div>
      <div>{isLoginMode ? Login : Register}</div>
      <p className="text-xs mt-6">
        <label htmlFor="YesLogin" className="leading-3 inline-flex items-center justify-center">
          <Checkbox className="mr-1" checked={checked} onChange={(val) => setChecked(val)} />
          <span>登录注册即同意Magnum《隐私政策》及《服务协议》</span>
        </label>
      </p>
    </div>
  );
};

export default Login;
