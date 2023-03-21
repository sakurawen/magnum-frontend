'use client';
import { useTrackedAppStore } from '@/store';
import { Input } from '@magnum/ui';

const Configuration = () => {
  const {
    app: {
      editor: { currentDraftElement },
    },
  } = useTrackedAppStore();

  return (
    <div className="p-2 ">
      <h1 className="text-sm select-none">Configuration</h1>
      <div>
        {Object.keys(currentDraftElement?.configuration.properties || {}).map(
          (property) => {
            return (
              <div key={property}>
                {property}:
                {JSON.stringify(
                  currentDraftElement?.configuration.properties[property].value,
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default Configuration;
