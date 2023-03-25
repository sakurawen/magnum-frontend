'use client';
import { useTrackedAppStore } from '@/store';
import { Input, Button } from '@magnum/ui';
import { memo, useMemo } from 'react';

const Configuration = () => {
  const {
    app: {
      setDraftElementProperties,
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

  if (currentDraftElementId === null) {
    return null;
  }
  return (
    <div>
      <h1 className="text-sm select-none px-4 py-2">Configuration</h1>
      <div>
        {Object.keys(currentDraftElement?.configuration.properties || {}).map(
          (property) => {
            return (
              <div
                key={property}
                className="mb-2 px-4 py-1 flex items-center justify-between"
              >
                <span className="inline-block text-xs w-[8em]">
                  {property}:
                </span>
                <div className="flex-1">
                  <Input
                    fill
                    size="small"
                    value={
                      currentDraftElement?.configuration.properties[property]
                        .value
                    }
                    onChange={(e) => {
                      setDraftElementProperties(
                        currentDraftElement?.id || '',
                        property,
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
            Delete Element
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Configuration);
