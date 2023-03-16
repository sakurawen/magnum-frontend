'use client';
import { useTrackedAppStore } from '@/store';
import { Button, Input } from '@magnum/ui';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const {
    user: { logout },
  } = useTrackedAppStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  return (
    <div className="px-4 py-1 flex items-center justify-between text-xs border-b border-gray-100">
      <div>
        <span className="select-none">Magnum</span>
        <Input size="small" />
      </div>
      <Button size="small" onClick={handleLogout}>
        登 出
      </Button>
    </div>
  );
};

export default Navbar;
