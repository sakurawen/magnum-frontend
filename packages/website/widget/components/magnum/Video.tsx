import { Icon } from '@iconify/react';
import cx from 'clsx';

type VideoImplProps = {
  fill: boolean;
};
const VideoImpl = (props: VideoImplProps) => {
  const { fill } = props;
  return (
    <div className={fill ? undefined : 'px-3 py-2'}>
      <div
        className={cx(
          'bg-gray-blue-50  flex aspect-video w-full items-center justify-center rounded-sm ',
          fill ? undefined : 'ring-gray-blue-100 ring-1 ',
        )}
      >
        <Icon
          icon="radix-icons:video"
          className="text-theme-gray-4 h-20 w-20"
        />
      </div>
    </div>
  );
};


export default VideoImpl;
