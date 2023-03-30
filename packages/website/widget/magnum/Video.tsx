import { MaterialSchema } from '@/schemas/material';
import { Icon } from '@iconify/react';
import { propertyType } from './consts';

const VideoImpl = () => {
  return (
    <div className="px-3 py-2 w-full aspect-video bg-theme-gray-2 rounded-sm flex justify-center items-center">
      <Icon icon="radix-icons:video" className="w-20 h-20 text-theme-gray-4" />
    </div>
  );
};

export const VideoWidgetConfig: MaterialSchema['item'] = {
  name: 'Video',
  text: '视频',
  componentType: VideoImpl,
  internal: {},
  config: [
    {
      key: 'source',
      value: '',
      type: propertyType.INPUT,
      text: '资源路径',
    },
  ],
};

export default VideoImpl;
