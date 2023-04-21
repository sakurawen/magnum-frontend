'use client';
import { Button } from '@magnum/ui';
import { Icon } from '@iconify/react';
import { useTrackedAppStore } from '@/store';
import AIGenerate from './AIGenerate';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { formService } from '@/services';
const EditorBar = () => {
  const {
    app: {
      release,
      parserTemplate,
      editor: { form, draftWidgets },
    },
  } = useTrackedAppStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handlePreviewForm = () => {
    if (!form?.id) return;
    const snapshot = {
      form_id: form.id,
      title: form.title,
      description: form.description,
      json: JSON.stringify(draftWidgets),
    };
    setPreviewLoading(true);
    formService
      .snapshot(snapshot)
      .then((res) => {
        window.open(`/preview/${res.data}`);
      })
      .catch((err) => {
        toast.error('获取预览快照失败');
        console.error('获取预览快照失败:', err);
      })
      .finally(() => {
        setPreviewLoading(false);
      });
  };

  const [releaseLoading, setReleaseLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const releaseForm = () => {
    setReleaseLoading(true);
    release()
      .then((res) => {
        toast.success(res.msg);
        parserTemplate(res.data);
      })
      .finally(() => {
        setReleaseLoading(false);
      });
  };

  const handleGTPOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <>
      <div className="flex flex-1 items-center justify-between px-2 py-1.5">
        <Button
          onClick={() => handleGTPOpenChange(true)}
          variant="custom"
          className="flex cursor-default items-center bg-gray-50 ring-1 ring-gray-200 hover:bg-gray-100 active:bg-gray-200"
        >
          <Icon className="mr-2 h-5 w-5" icon="logos:openai-icon" />
          <div>Magnum AI Generate</div>
        </Button>
        <div className="flex h-full  space-x-2">
          <div>
            <Button
              loading={previewLoading}
              size="middle"
              variant="primary"
              className="ml-2 flex h-full cursor-default items-center"
              onClick={handlePreviewForm}
            >
              <Icon className="mr-2 h-5 w-5" icon="radix-icons:play" /> 预 览
            </Button>
          </div>
          <div>
            <Button
              loading={releaseLoading}
              onClick={releaseForm}
              size="middle"
              variant="custom"
              className="flex h-full cursor-default items-center bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-950"
            >
              <Icon icon="mdi:publish" className="mr-2 h-5 w-5" />发 布
            </Button>
          </div>
        </div>
      </div>
      <AIGenerate open={open} onOpenChange={handleGTPOpenChange} />
    </>
  );
};

export default EditorBar;
