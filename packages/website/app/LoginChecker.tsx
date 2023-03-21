'use client';
import { useEffect } from 'react';
import { validateToken } from '@/utils';
import { useRouter } from 'next/navigation';
import { useTrackedAppStore } from '@/store';

const LoginChecker = () => {
  const {
    user: { init, logout },
  } = useTrackedAppStore();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    validateToken(token)
      .then((res) => {
        init({
          id: res.id,
          account: res.account,
          name: res.name,
          token: token || '',
        });
      })
      .catch(() => {
        logout();
        router.replace('/login');
      });
  }, [init, logout, router]);
  return null;
};

export default LoginChecker;
