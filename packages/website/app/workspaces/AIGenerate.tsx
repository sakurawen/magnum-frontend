'use client';
import { Icon } from '@iconify/react';
import { Dialog, Textarea, Button } from '@magnum/ui';
import { useState } from 'react';

type AIGenerateProps = {
  open: boolean;
  onOpenChange(open: boolean): void;
};
const AIGenerate = (props: AIGenerateProps) => {
  const [prompt, setPrompt] = useState('');
  return (
    <Dialog {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-indigo-50/40 backdrop-blur" />
        <Dialog.Content>
          <div className=" relative w-[576px] rounded-lg bg-white p-4 shadow-md ring-1 ring-gray-200">
            <div
              className="absolute right-2 top-2 rounded-md p-1 hover:bg-gray-100"
              onClick={() => props.onOpenChange(false)}
            >
              <Icon icon="heroicons:x-mark" className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">Magnum Form AI 自动生成表单</h1>
            <p className="text-xs text-gray-500">Magnum Form AI Generate</p>
            <div className="mt-4">
              <label className="mb-2 inline-block text-sm" htmlFor="GTPPrompt">
                输入需求：
              </label>
              <Textarea
                size="large"
                rows={10}
                placeholder="详细描述你的需求，让AI自动帮你生成表单。"
                id="GTPPrompt"
                value={prompt}
                onChange={setPrompt}
              />
              <Button size="large" className="mt-4 w-full">
                生 成
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default AIGenerate;
