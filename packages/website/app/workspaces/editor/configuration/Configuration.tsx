'use client';
import { Control, useHotKey } from '@/hooks/use-hot-key';
import { DraftWidgetConfigSchema } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
import { propertyType } from '@/widget/magnum/consts';
import { Button, Checkbox, Input, Select, Textarea } from '@magnum/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, PropsWithChildren, useMemo, useState } from 'react';
import TextAlignHandler from './TextAlignHandler';
import cx from 'clsx';
import JsonView from 'react-json-view';

const reactJsonConfig = {
  name: false as const,
  iconStyle: 'triangle' as const,
  enableClipboard: false,
  displayObjectSize: false,
  displayDataTypes: false,
  displayArrayKey: false,
  indentWidth: 2,
};

type ConfigurationPropertyProps = PropsWithChildren<{
  label: string;
}>;

const ConfigurationProperty = ({
  label,
  children,
}: ConfigurationPropertyProps) => {
  return (
    <div className="mb-2 px-4 py-1 flex items-center justify-between">
      <span className="inline-block text-xs w-[6em]">{label}:</span>
      <div className="flex-1 flex items-center">{children}</div>
    </div>
  );
};

const Configuration = () => {
  const {
    app: {
      setDraftWidgetProperties,
      setCurrentDraftWidgetIdWithIndex,
      delDraftWidgetWithId,
      editor: { currentDraftWidgetId, draftWidgets },
    },
  } = useTrackedAppStore();

  const currentDraftWidget = useMemo(
    () => draftWidgets.find((item) => item.id === currentDraftWidgetId),
    [draftWidgets, currentDraftWidgetId],
  );

  const handleDeleteDraftWidget = (id: string | null) => {
    if (!id) return;
    delDraftWidgetWithId(id);
  };

  /**
   * 注册删除元素快捷键
   */
  useHotKey(
    [['d'], [Control]],
    () => {
      if (currentDraftWidgetId === null) return;
      const idx = delDraftWidgetWithId(currentDraftWidgetId);
      setCurrentDraftWidgetIdWithIndex(idx);
    },
    [currentDraftWidgetId],
  );

  const [tab, setTab] = useState<'configuration' | 'json'>('configuration');
  const isJSONTab = tab === 'json';
  const isConfigTab = tab === 'configuration';

  const renderPropertyControlComponent = (
    draftWidgetId: string | null,
    property: DraftWidgetConfigSchema,
    propertyIdx: number,
  ) => {
    if (!draftWidgetId) return null;
    switch (property.type) {
      case propertyType.TEXT_ALIGN_HANDLE:
        return (
          <TextAlignHandler
            value={property.value}
            onChange={(value) => {
              setDraftWidgetProperties(draftWidgetId, propertyIdx, value);
            }}
          />
        );
      case propertyType.SELECT:
        return (
          <Select
            size="middle"
            className="w-full"
            value={property.value}
            onChange={(value) => {
              setDraftWidgetProperties(draftWidgetId, propertyIdx, value);
            }}
          >
            <Select.Button>{property.value.text}</Select.Button>
            <Select.Options>
              {property.options?.map((option) => {
                return (
                  <Select.Option key={option.text} value={option}>
                    {option.text}
                  </Select.Option>
                );
              })}
            </Select.Options>
          </Select>
        );
      case propertyType.CHECKBOX:
        return (
          <Checkbox
            value={property.value}
            onChange={(value) =>
              setDraftWidgetProperties(draftWidgetId, propertyIdx, value)
            }
          />
        );
      case propertyType.TEXTAREA:
        return (
          <Textarea
            size="middle"
            className="w-full"
            value={property.value}
            onChange={(value) => {
              setDraftWidgetProperties(draftWidgetId, propertyIdx, value);
            }}
          />
        );
      default:
        return (
          <Input
            fill
            size="middle"
            value={property.value}
            onChange={(value) => {
              setDraftWidgetProperties(draftWidgetId, propertyIdx, value);
            }}
          />
        );
    }
  };

  const ConfigurationTab = (
    <div>
      {currentDraftWidget?.configuration?.map((property, propertyIdx) => {
        return (
          <ConfigurationProperty key={property.key} label={property.text}>
            {renderPropertyControlComponent(
              currentDraftWidgetId,
              property,
              propertyIdx,
            )}
          </ConfigurationProperty>
        );
      })}
      <div className="px-4 mt-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={() => handleDeleteDraftWidget(currentDraftWidgetId)}
        >
          删除元素
        </Button>
      </div>
    </div>
  );
  const JSONTab = (
    <div className="p-2">
      <JsonView {...reactJsonConfig} src={currentDraftWidget || {}} />
    </div>
  );

  return (
    <AnimatePresence>
      {currentDraftWidgetId !== null && (
        <motion.div
          className=" overflow-auto h-full"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <div className="h-12 flex items-center px-2 absolute w-full bg-white/60 backdrop-blur z-50 space-x-2">
            <button
              onClick={() => setTab('configuration')}
              className={cx('text-sm select-none p-2 text-gray-400', {
                'font-bold text-theme-content-2': isConfigTab,
              })}
            >
              配置
            </button>
            <button
              onClick={() => setTab('json')}
              className={cx('text-sm select-none p-2 text-gray-400', {
                'font-bold text-theme-content-2': isJSONTab,
              })}
            >
              JSON
            </button>
          </div>
          <div className='w-full pt-12'>
            {isConfigTab && ConfigurationTab}
            {isJSONTab && JSONTab}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Configuration);
