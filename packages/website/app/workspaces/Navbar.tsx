'use client';
import { useTrackedAppStore } from '@/store';
import { Icon } from '@iconify/react';
import { Input, Menu } from '@magnum/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const Navbar = () => {
  const {
    app: {
      setNavbarSearch,
      navbar: { search },
    },
    user: { logout, id, name },
  } = useTrackedAppStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    startTransition(() => {
      router.replace('/login');
    });
  };
  return (
    <nav className="navbar flex relative z-50 items-center justify-between text-xs border-b  ">
      <div className="flex h-full items-center  space-x-4">
        <Menu className="h-full">
          <Menu.Trigger className="h-full">
            <div className="group select-none hover:bg-theme-gray-2   w-80 h-full px-4 flex justify-between items-center  border-r">
              <div className="flex items-center justify-center ">
                <Icon
                  className="w-6 h-6 mr-2 text-theme-2"
                  icon="iconoir:codepen"
                />
                <div>
                  <h2 className="text-base/none  mb-0.5 font-bold text-black">
                    {name}
                  </h2>
                  <p className="w-[16em] overflow-hidden whitespace-nowrap text-ellipsis text-xs/none  text-gray-600">
                    {id}
                  </p>
                </div>
              </div>
              <Icon
                className="w-3 h-3 mt-0.5 group-hover:translate-y-0.5 transition"
                icon="radix-icons:chevron-down"
              />
            </div>
          </Menu.Trigger>
          <Menu.Items>
            <Menu.Item>
              <Link
                className="block h-full p-2 cursor-default"
                href="/workspaces"
              >
                工作空间
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="block h-full p-2 cursor-default "
                href="/workspaces/editor"
              >
                编辑器
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="flex items-center justify-between h-full w-full pl-2">
        <div className="py-1 flex-1">
          <Input
            icon={
              <Icon
                className="w-5 h-5 mt-0.5 text-gray-400"
                icon="radix-icons:magnifying-glass"
              />
            }
            value={search}
            onChange={(e) => setNavbarSearch(e.target.value)}
            placeholder="搜索已建立的页面..."
            className="!w-72"
            size="middle"
          />
        </div>
        <Menu className="h-full border-l border-light ">
          <Menu.Trigger className="h-full hover:bg-theme-gray-2">
            <div className="group h-full px-6  flex justify-center items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center rounded-full">
                <Icon className="w-5 h-5" icon="heroicons:cog-8-tooth" />
              </div>
              <Icon
                className="w-3 h-3 mt-0.5 group-hover:translate-y-0.5 transition"
                icon="radix-icons:chevron-down"
              />
            </div>
          </Menu.Trigger>
          <Menu.Items>
            <Menu.Item onClick={handleLogout} className="text-center">
              登 出
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
