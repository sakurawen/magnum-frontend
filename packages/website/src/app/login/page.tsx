'use client';
import Button from '@/components/material/Button';
import Input from '@/components/material/Input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * 登录页
 * @returns
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSignIn = () => {
    console.log({ password, username });
    if (username && password) {
      router.push('/editor');
    }
  };

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (username && password) {
          router.push('/editor');
        }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, [password, router, username]);

  return (
    <div className="login-page-container">
      <div className="h-screen bg-sky-50/50 flex justify-center items-center">
        <div className="w-80 px-4 py-6 bg-white rounded shadow ">
          <h2 className="text-xl font-bold mb-4 text-sky-400">Magnum Engine</h2>
          <div className="space-y-4">
            <Input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignIn} className="w-full">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
