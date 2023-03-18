'use client';
import { useTrackedAppStore } from '@/store';
const MaterialConfiguration = () => {
  const {
    app: {
      editor: { currentDraftElement },
    },
  } = useTrackedAppStore();
  return (
    <div className="p-2 ">
      <h1 className="text-sm select-none">Configuration</h1>
      <div>
        <p>
          component id:
          <br />
          {currentDraftElement?.id}
        </p>
        {JSON.stringify(currentDraftElement?.configuration)}
      </div>
    </div>
  );
};

export default MaterialConfiguration;
