import { Icon } from '@iconify/react';
import { memo, useEffect, useState } from 'react';

type ImageProps = {
  source: string;
};

const ImageImpl = (props: ImageProps) => {
  const { source } = props;
  const [status, setStatus] = useState<'wait' | 'load' | 'fail'>('wait');
  useEffect(() => {
    setStatus('wait');
    const i = new Image();
    if (source.trim().length === 0) {
      setStatus('wait');
      return;
    }
    i.src = source;
    i.onload = () => {
      setStatus('load');
      console.log('load');
    };
    i.onerror = () => {
      setStatus('fail');
    };
  }, [source]);
  
  if (status === 'fail') {
    return (
      <div className="w-full aspect-video bg-theme-gray-2 rounded-sm flex justify-center items-center">
        加载图片失败
      </div>
    );
  }
  if (status === 'load') {
    return (
      <div>
        <div className="w-full aspect-video bg-theme-gray-2 rounded-sm flex justify-center items-center">
          <img src={source} alt="image" className="rounded shadow-sm" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full aspect-video bg-theme-gray-2 rounded-sm flex justify-center items-center">
      <Icon icon="radix-icons:image" className="w-20 h-20 text-theme-gray-4" />
    </div>
  );
};

export default memo(ImageImpl);
