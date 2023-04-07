"use client"
import { Button, Dialog } from '@magnum/ui';
import { Icon } from '@iconify/react';

type SelectOptionEditorProps = {
  value: Array<{
    label: string;
    value: any;
  }>;
  onChange: (...args: any[]) => void;
};
const SelectOptionEditor = (props: SelectOptionEditorProps) => {
  const { onChange, value } = props;
  return (
    <div className="w-full">
      {value.map((item) => {
        return (
          <div
            className="mb-2 flex select-none items-center justify-between rounded bg-gray-100 px-3 py-2"
            key={item.value}
          >
            <span>{item.label}</span>
            <div className="rounded-md p-1 hover:bg-gray-300">
              <Icon icon="radix-icons:pencil-2" className="h-5 w-5" />
            </div>
          </div>
        );
      })}
      <Button
        onClick={() => console.log(123)}
        className="flex w-full items-center justify-center"
        variant="gray"
      >
        <Icon className="mr-2 h-4 w-4" icon="radix-icons:plus" />
        <span>添加选项</span>
      </Button>
      <Dialog>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <div>wuhu</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  );
};

export default SelectOptionEditor;
