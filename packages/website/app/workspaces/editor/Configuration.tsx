'use client';
import { useTrackedAppStore } from '@/store';
import { Input, Button } from '@magnum/ui';
import { memo, useMemo } from 'react';
import { useHotKey, Control } from '@/hooks/use-hot-key';
import { motion, AnimatePresence } from 'framer-motion';

const Configuration = () => {
  const {
    app: {
      setDraftElementProperties,
      setCurrentDraftElementIdWithIndex,
      delDraftElementWithId,
      editor: { currentDraftElementId, draftElements },
    },
  } = useTrackedAppStore();

  const currentDraftElement = useMemo(
    () => draftElements.find((item) => item.id === currentDraftElementId),
    [draftElements, currentDraftElementId],
  );

  const handleDeleteDraftElement = (id: string) => {
    delDraftElementWithId(id);
  };

  /**
   * 注册删除元素快捷键
   */
  useHotKey(
    [['d'], [Control]],
    () => {
      if (currentDraftElementId === null) return;
      const idx = delDraftElementWithId(currentDraftElementId);
      setCurrentDraftElementIdWithIndex(idx);
    },
    [currentDraftElementId],
  );

  return (
    <AnimatePresence>
      {currentDraftElementId === null ? null : (
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
            {currentDraftElement?.configuration?.map(
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
                        size="small"
                        value={property.value}
                        onChange={(e) => {
                          setDraftElementProperties(
                            currentDraftElement?.id || '',
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
                onClick={() => handleDeleteDraftElement(currentDraftElementId)}
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
