'use client';
import { Icon } from '@iconify/react';
import { Dialog, Textarea, Button } from '@magnum/ui';
import { useState } from 'react';
import { openaiService } from '@/services';
import { toast } from 'sonner';
import { transformAIDraftWidget } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
type AIGenerateProps = {
  open: boolean;
  onOpenChange(open: boolean): void;
};
const AIGenerate = ({ open, onOpenChange }: AIGenerateProps) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const {
    app: { setDraftWidgets, setCurrentDraftWidgetId },
  } = useTrackedAppStore();
  const handleGenerate = () => {
    setLoading(true);
    openaiService
      .completions(prompt)
      .then((res: any) => {
        toast.success('Magnum Form AI 表单生成成功');
        const aiSchema = JSON.parse(res.json) as App.AISchema[];
        console.log('result:', aiSchema);
        const result = aiSchema.map((schema) => {
          return transformAIDraftWidget(schema);
        });
        onOpenChange(false);
        setCurrentDraftWidgetId(null);
        setDraftWidgets(result);
      })
      .catch((err) => {
        console.error('ai generate error:', err);
        toast.error('Magnum Form AI 服务繁忙，请稍后重试');
      })
      .finally(() => {
        console.timeEnd("aigc")
        setLoading(false);
      });
  };
  const onOpenChangeControl = (val: boolean) => {
    if (loading) return;
    onOpenChange(val);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChangeControl}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-indigo-50/40 backdrop-blur" />
        <Dialog.Content>
          <div className=" relative w-[576px] rounded-lg bg-white p-4 shadow-md ring-1 ring-gray-200">
            <div
              className="absolute right-2 top-2 rounded-md p-1 hover:bg-gray-100"
              onClick={() => onOpenChangeControl(false)}
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
                disabled={loading}
                rows={10}
                placeholder="详细描述你的需求，让AI自动帮你生成表单。"
                id="GTPPrompt"
                value={prompt}
                onChange={setPrompt}
              />
              <Button
                loading={loading}
                onClick={handleGenerate}
                size="large"
                className="mt-4 w-full cursor-default"
              >
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
