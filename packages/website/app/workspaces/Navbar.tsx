'use client';
import { useTrackedAppStore } from '@/store';
import { Icon } from '@iconify/react';
import { Button, Input, Menu } from '@magnum/ui';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const pathname = usePathname();
  const handleLogout = () => {
    logout();
    startTransition(() => {
      router.replace('/login');
    });
  };
  const inEditorPage = pathname === '/workspaces/editor';
  const EditorBar = (
    <div className="flex flex-1 items-center justify-between px-2 py-1.5">
      <Input
        icon={
          <Icon
            className="mt-0.5 h-5 w-5 text-gray-400"
            icon="radix-icons:magnifying-glass"
          />
        }
        value={search}
        onChange={(value) => setNavbarSearch(value)}
        placeholder="搜索已建立的页面..."
        className="!w-72"
        size="middle"
      />
      <div className="flex items-center space-x-2">
        <Button
          size="middle"
          variant="primary"
          className=" ml-2 flex items-center"
        >
          <Icon className="mr-2 h-5 w-5" icon="radix-icons:play" /> 预 览
        </Button>
        <Button
          size="middle"
          variant="custom"
          className="flex items-center bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-950"
        >
          <Icon icon="mdi:publish" className="mr-2 h-5 w-5" />发 布
        </Button>
      </div>
    </div>
  );

  return (
    <nav className="navbar relative z-50 flex h-12 items-center justify-between border-b text-xs  ">
      <div className="flex h-full items-center  space-x-4">
        <Menu className="h-full">
          <Menu.Trigger className="h-full">
            <div className="hover:bg-gray-blue-50   group flex   h-full w-80 select-none items-center justify-between border-r  px-4">
              <div className="flex items-center justify-center ">
                <Icon
                  className="text-theme-300 mr-2 h-6 w-6"
                  icon="iconoir:codepen"
                />
                <div>
                  <h2 className="mb-0.5  text-base/none font-bold text-black">
                    {name}
                  </h2>
                  <p className="w-[16em] overflow-hidden text-ellipsis whitespace-nowrap text-xs/none  text-gray-600">
                    {id}
                  </p>
                </div>
              </div>
              <Icon
                className="mt-0.5 h-3 w-3 transition group-hover:translate-y-0.5"
                icon="radix-icons:chevron-down"
              />
            </div>
          </Menu.Trigger>
          <Menu.Items>
            <Menu.Item>
              <Link
                className="block h-full cursor-default p-2"
                href="/workspaces"
              >
                工作空间
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="block h-full cursor-default p-2 "
                href="/workspaces/editor"
              >
                编辑器
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="flex h-full w-full items-center justify-between ">
        {inEditorPage ? EditorBar : <div></div>}
        <Menu className="border-light h-full border-l ">
          <Menu.Trigger className="hover:bg-gray-blue-50   h-full">
            <div className="group flex h-full  items-center justify-center px-6">
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full">
                <Icon className="h-5 w-5" icon="heroicons:cog-8-tooth" />
              </div>
              <Icon
                className="mt-0.5 h-3 w-3 transition group-hover:translate-y-0.5"
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
