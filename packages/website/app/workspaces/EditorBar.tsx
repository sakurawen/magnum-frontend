'use client';
import { Button } from '@magnum/ui';
import { Icon } from '@iconify/react';
import { useTrackedAppStore } from '@/store';
import AIGenerate from './AIGenerate';
import { useState } from 'react';

const EditorBar = () => {
  const {
    app: {
      release,
      editor: { form, template, draftWidgets },
    },
  } = useTrackedAppStore();
  const [open, setOpen] = useState(false);
  const previewDraft = () => {
    console.log({
      template: template,
      draftWidgets,
    });
  };
  const releaseForm = () => {
    release();
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
          className="flex items-center bg-gray-50 ring-1 ring-gray-200 hover:bg-gray-100 active:bg-gray-200"
        >
          <Icon className="mr-2 h-5 w-5" icon="logos:openai-icon" />
          <div>ChatGPT AI Generate</div>
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            size="middle"
            variant="primary"
            className=" ml-2 flex items-center"
            onClick={previewDraft}
          >
            <Icon className="mr-2 h-5 w-5" icon="radix-icons:play" /> 预 览
          </Button>
          <Button
            onClick={releaseForm}
            size="middle"
            variant="custom"
            className="flex items-center bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-950"
          >
            <Icon icon="mdi:publish" className="mr-2 h-5 w-5" />发 布
          </Button>
        </div>
      </div>
      <AIGenerate open={open} onOpenChange={handleGTPOpenChange} />
    </>
  );
};

export default EditorBar;
