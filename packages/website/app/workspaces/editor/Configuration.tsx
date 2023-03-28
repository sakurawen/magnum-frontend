'use client';
import { useTrackedAppStore } from '@/store';
import { Input, Button } from '@magnum/ui';
import { memo, useMemo } from 'react';
import { useHotKey, Control } from '@/hooks/use-hot-key';
import { motion, AnimatePresence } from 'framer-motion';
import ReactJson from 'react-json-view';
const reactJsonConfig = {
  name: false as const,
  iconStyle: 'triangle' as const,
  enableClipboard: false,
  displayObjectSize: false,
  displayDataTypes: false,
  displayArrayKey: false,
  indentWidth: 2,
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
            {currentDraftWidget?.configuration?.map(
              (property, propertyIdx) => {
                return (
                  <div
                    key={property.key}
                    className="mb-2 px-4 py-1 flex items-center justify-between"
                  >
                    <span className="inline-block text-xs w-[8em]">
                      {property.text}:
                    </span>
                    <div className="flex-1">
                      <Input
                        fill
                        size="middle"
                        value={property.value}
                        onChange={(e) => {
                          setDraftWidgetProperties(
                            currentDraftWidget?.id || '',
                            propertyIdx,
                            e.target.value,
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              },
            )}
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
