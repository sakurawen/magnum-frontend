'use client';
import { Control, useHotKey } from '@/hooks/use-hot-key';
import { DraftWidgetConfigSchema } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
import { propertyType } from '@/widget/magnum/consts';
import { Button, Checkbox, Input, Select, Textarea } from '@magnum/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, PropsWithChildren, useMemo } from 'react';

type ConfigurationPropertyProps = PropsWithChildren<{
  label: string;
}>;
const ConfigurationProperty = ({
  label,
  children,
}: ConfigurationPropertyProps) => {
  return (
    <div className="mb-2 px-4 py-1 flex items-center justify-between">
      <span className="inline-block text-xs w-[8em]">{label}:</span>
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

  const handleDeleteDraftWidget = (id: string) => {
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

  const renderPropertyControlComponent = (
    draftWidgetId: string,
    property: DraftWidgetConfigSchema,
    propertyIdx: number,
  ) => {
    switch (property.type) {
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

  return (
    <AnimatePresence>
      {currentDraftWidgetId !== null && (
        <motion.div
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
          <h1 className="text-sm select-none px-4 py-4">配置</h1>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Configuration);
