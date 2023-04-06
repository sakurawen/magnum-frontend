'use client';
import { useTrackedAppStore } from '@/store';
import { validateToken } from '@/utils';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

const AutoLoginEffect = () => {
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
        startTransition(() => {
          router.replace('/login');
        });
      });
  }, [init, logout, router]);
  return null;
};

export default AutoLoginEffect;
