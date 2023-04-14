'use client';
import { Button, Dialog } from '@magnum/ui';
import { Icon } from '@iconify/react';
import { useState } from 'react';

type SelectOptionEditorProps = {
  value: Array<{
    label: string;
    value: any;
  }>;
  onChange: (...args: any[]) => void;
};
const SelectOptionEditor = (props: SelectOptionEditorProps) => {
  const { onChange, value } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      {value.map((item) => {
        return (
          <div
            className="mb-2 flex select-none items-center justify-between rounded bg-gray-100 px-3 py-2"
            key={item.value}
          >
            <span>{item.label}</span>
            <div className="hover:bg-gray-blue-100 rounded-md p-1">
              <Icon icon="radix-icons:pencil-2" className="h-5 w-5" />
            </div>
          </div>
        );
      })}
      <Button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center"
        variant="gray"
      >
        <Icon className="mr-2 h-4 w-4" icon="radix-icons:plus" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <div className="h-96 w-96 rounded-lg bg-white p-4 shadow">
              <h2 className="mb-2 text-xl font-bold">Edit options</h2>
              <p>编辑选择器选项</p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  );
};

export default SelectOptionEditor;
