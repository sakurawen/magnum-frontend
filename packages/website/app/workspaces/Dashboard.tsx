'use client';
import { Button, Input, Textarea, Dialog } from '@magnum/ui';
import { formService } from '@/services';
import { Icon } from '@iconify/react';
import { startTransition, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import { request } from '@/utils';
import cx from 'clsx';
import { useRouter } from 'next/navigation';
import { useTrackedAppStore } from '@/store';

const WorkspaceDashboard = () => {
  const {
    app: { resetEditor },
  } = useTrackedAppStore();
  const { data: list } = useSWR<Service.Response<App.ListForm[]>>(
    '/form/list-all',
    request.post,
  );

  // 工作空间初始化时，清空编辑器数据
  useEffect(() => {
    resetEditor();
  }, []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const handleFormChange = (field: keyof typeof form, val: any) => {
    setForm((form) => {
      form[field] = val;
      return { ...form };
    });
  };

  const handleNewFormDialogOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
    });
  };

  const [loading, setLoading] = useState(false);

  const handleNewForm = async () => {
    setLoading(true);
    try {
      const result = await formService.newForm(form);
      toast.success('新建表单成功');
      handleNewFormDialogOpenChange(false);
      startTransition(() => {
        router.push(`/workspaces/editor/${result.data.id}`);
      });
    } catch (err) {
      console.error(err);
      toast.error('新建表单失败');
    } finally {
      setLoading(false);
    }
  };

  const [currentSelectId, setCurrentSelectId] = useState('');
  const dashboardContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dashboardContainerRef.current) return;
    const listenCancelSelect = (e: MouseEvent) => {
      setCurrentSelectId('');
    };
    dashboardContainerRef.current.addEventListener('click', listenCancelSelect);
    return () => {
      dashboardContainerRef.current?.removeEventListener(
        'click',
        listenCancelSelect,
      );
    };
  });
  const router = useRouter();
  const handleEditForm = (id: string) => {
    startTransition(() => {
      router.push(`/workspaces/editor/${id}`);
    });
  };
  return (
    <div
      ref={dashboardContainerRef}
      className="workspace-dashboard h-full px-4 pt-6"
    >
      <div className="action-bar mx-2">
        <Button
          onClick={() => setOpen(true)}
          variant="custom"
          className="flex items-center px-4 py-2.5 ring-1 ring-gray-200 hover:bg-gray-50 active:bg-gray-100"
        >
          <div className="">
            <Icon
              className="text-theme-400 h-10 w-10"
              icon="solar:file-text-bold-duotone"
            />
          </div>
          <div className="mx-2 text-left">
            <p className="mb-0.5 leading-none">新建表单</p>
            <span className="text-xs leading-none text-gray-400">
              New Magnum Form
            </span>
          </div>
          <div className="ml-6">
            <Icon className="h-6 w-6" icon="heroicons:plus" />
          </div>
        </Button>
      </div>
      <div className="form-list mt-6  grid grid-cols-2 gap-4 px-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {list?.data.map((form) => {
          return (
            <a
              key={form.id}
              onDoubleClick={() => handleEditForm(form.id)}
              onClick={() => setCurrentSelectId(form.id)}
              className="relative h-[60px]  select-none pt-[70%]"
            >
              <div
                className={cx(
                  'absolute left-0 top-0 flex h-full w-full flex-col overflow-hidden rounded bg-white ring-1 hover:shadow hover:ring-[2px]',
                  [
                    form.id === currentSelectId
                      ? 'ring-theme-400 hover:ring-theme-400 ring-2'
                      : 'ring-gray-200  hover:ring-2',
                  ],
                )}
              >
                <div className="relative h-full flex-grow bg-gray-100"></div>
                <div className="form-info flex w-full items-start px-2 py-2">
                  <div className="mt-1 px-2">
                    <Icon
                      className="text-theme-400 h-8 w-8"
                      icon="solar:file-text-bold-duotone"
                    />
                  </div>
                  <div className="form-desc ">
                    <h2 className="">{form.title}</h2>
                    <p className="line-clamp-1 text-xs text-gray-500">
                      {form.description}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <Dialog open={open} onOpenChange={handleNewFormDialogOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <div className="relative w-[460px] rounded-md bg-white p-4 shadow-md ring-1 ring-gray-200">
              <h1 className="text-xl">新建表单</h1>
              <div
                className="absolute right-2 top-2 p-1 hover:bg-gray-100"
                onClick={() => handleNewFormDialogOpenChange(false)}
              >
                <Icon icon="heroicons:x-mark" className="h-6 w-6" />
              </div>
              <p className="text-xs">New Magnum Form</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    className="mb-1 inline-block text-sm"
                    htmlFor="NewFormTitle"
                  >
                    表单标题:
                  </label>
                  <Input
                    id="NewFormTitle"
                    autoComplete="off"
                    size="large"
                    fill
                    value={form.title}
                    placeholder="输入表单标题"
                    onChange={(val) => handleFormChange('title', val)}
                  />
                </div>
                <div>
                  <label
                    className="mb-1 inline-block text-sm"
                    htmlFor="NewFormDesc"
                  >
                    表单说明:
                  </label>
                  <Textarea
                    size="large"
                    id="NewFormDesc"
                    value={form.description}
                    placeholder="输入表单说明"
                    onChange={(val) => handleFormChange('description', val)}
                  />
                </div>
                <Button
                  loading={loading}
                  size="large"
                  className="w-full"
                  onClick={handleNewForm}
                >
                  新建表单
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  );
};

export default WorkspaceDashboard;
