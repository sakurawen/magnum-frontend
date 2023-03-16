'use client';
import { useEffect } from 'react';
import { validateToken } from '@/utils';
import { useRouter } from 'next/navigation';
import { useTrackedAppStore } from '@/store';

const Auth = () => {
  const {
    user: { init, logout },
  } = useTrackedAppStore();
  const router = useRouter();
  useEffect(() => {
    validateToken()
      .then((res) => {
        init({
          id: res.id,
          account: res.account,
          name: res.name,
          token: localStorage.getItem('token') || '',
        });
      })
      .catch(() => {
        logout();
        router.replace('/login');
      });
  }, []);
  return null;
};

export default Auth;
