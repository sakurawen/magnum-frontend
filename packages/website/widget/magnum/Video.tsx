import { MaterialSchema } from '@/schemas/material';
import { Icon } from '@iconify/react';
import { propertyType } from './consts';

const VideoImpl = () => {
  return (
    <div className="bg-gray-blue-50   flex aspect-video w-full items-center justify-center rounded-sm px-3 py-2">
      <Icon icon="radix-icons:video" className="text-theme-gray-4 h-20 w-20" />
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
