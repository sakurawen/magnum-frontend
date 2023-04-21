'use client';
import { userService } from '@/services';
import { useTrackedAppStore } from '@/store';
import { Button, Checkbox, Input, Box } from '@magnum/ui';
import c from 'clsx';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useImmer } from 'use-immer';

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
  const handleSetLoginForm = <T extends keyof LoginForm>(
    key: T,
    value: LoginForm[T],
  ) => {
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
  const handleSetRegisterForm = <T extends keyof RegisterForm>(
    key: T,
    value: RegisterForm[T],
  ) => {
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
    if (!checked) {
      toast.error('请确认《隐私条款》和《用户协议》');
      return;
    }
    setLoading(true);
    userService
      .login(loginForm)
      .then((res) => {
        const { id, account, name } = res.data;
        init({
          id,
          account,
          name,
        });
        startTransition(() => {
          router.replace('/workspaces');
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
    if (!checked) {
      toast.error('请确认《隐私条款》和《用户协议》');
      return;
    }
    setLoading(true);
    userService
      .register(registerForm)
      .then((res) => {
        toast.success('注册成功，自动登录');
        const { id, account, name } = res.data;
        init({
          id,
          account,
          name,
        });
        startTransition(() => {
          router.replace('/workspaces');
        });
      })
      .catch((err) => {
        toast.error('注册失败，请检查');
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
    const checked = localStorage.getItem('login-checked');
    if (!checked) return;
    setChecked(true);
  }, []);

  const handleCheck = (val: boolean) => {
    if (val) {
      localStorage.setItem('login-checked', 'true');
    } else {
      localStorage.removeItem('login-checked');
    }
    setChecked(val);
  };

  const Login = (
    <div className="space-y-5">
      <Input
        fill
        size="large"
        disabled={loading}
        placeholder="用户名"
        value={loginForm.username}
        onChange={(val) => handleSetLoginForm('username', val)}
      />
      <Input
        fill
        className="w-full"
        size="large"
        disabled={loading}
        placeholder="密码"
        type="password"
        value={loginForm.password}
        onChange={(val) => handleSetLoginForm('password', val)}
      />
      <Button
        size="large"
        loading={loading}
        onClick={handleSignIn}
        className="w-full !text-base"
      >
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
        onChange={(val) => handleSetRegisterForm('username', val)}
      />
      <Input
        fill
        size="large"
        disabled={loading}
        placeholder="密码"
        type="password"
        value={registerForm.password}
        onChange={(val) => handleSetRegisterForm('password', val)}
      />
      <Input
        fill
        size="large"
        disabled={loading}
        placeholder="确认密码"
        type="password"
        value={registerForm.passwordRepeat}
        onChange={(val) => handleSetRegisterForm('passwordRepeat', val)}
      />
      <Button
        size="large"
        loading={loading}
        onClick={handleSignUp}
        className="w-full !text-base"
      >
        注 册
      </Button>
    </div>
  );

  return (
    <Box className="w-[500px] rounded-lg bg-white px-12 py-20 shadow ">
      <h2 className="text-slate-800 mb-8 text-4xl font-bold">
        欢迎使用
        <br /> Magnum Form
      </h2>
      <div className="mb-8 space-x-4 text-sm">
        <button
          className={c('relative inline-block cursor-pointer px-2', {
            'after:bg-theme-200 after:absolute after:-bottom-2 after:left-0 after:z-0 after:h-0.5 after:w-full after:rounded-sm':
              isLoginMode,
          })}
          onClick={() => setFormMode('login')}
        >
          <span className="relative z-10 select-none">登 录</span>
        </button>
        <button
          className={c('relative inline-block cursor-pointer px-2', {
            'after:bg-theme-200 after:absolute after:-bottom-2 after:left-0 after:z-0 after:h-0.5 after:w-full after:rounded-sm':
              !isLoginMode,
          })}
          onClick={() => setFormMode('register')}
        >
          <span className="relative z-10 select-none">注 册</span>
        </button>
      </div>
      <div>{isLoginMode ? Login : Register}</div>
      <p className="mt-6 text-xs">
        <label
          htmlFor="YesLogin"
          className="inline-flex items-center justify-center"
        >
          <Checkbox
            id="YesLogin"
            className="mr-1"
            value={checked}
            onChange={(val) => handleCheck(val)}
          />
          <span className="select-none">
            登录注册即同意Magnum《隐私政策》及《服务协议》
          </span>
        </label>
      </p>
    </Box>
  );
};

export default Login;
