import { MaterialSchema } from '@/schemas/material';
import { Icon } from '@iconify/react';
import cx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { propertyType } from '../../consts';

type ImageProps = {
  source: string;
  fill?: boolean;
};

const ImageImpl = (props: ImageProps) => {
  const { source, fill } = props;
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
  const renderImage = () => {
    if (status === 'fail') {
      return <span>加载图片失败</span>;
    }
    if (status === 'load') {
      return (
        <img
          src={source}
          alt="image"
          className={cx('shadow', [fill ? '' : 'rounded-sm'])}
        />
      );
    }
    return (
      <Icon icon="radix-icons:image" className="text-theme-gray-4 h-20 w-20" />
    );
  };
  return (
    <div className={cx('transition', [fill ? undefined : 'px-3 py-2'])}>
      <div
        className={cx(
          'bg-gray-blue-50 flex aspect-video w-full items-center justify-center ring-1 ring-gray-blue-100',
          [!fill && 'rounded-sm'],
        )}
      >
        {renderImage()}
      </div>
    </div>
  );
};

export const ImageWidgetConfig: MaterialSchema['item'] = {
  name: 'Image',
  text: '图片',
  internal: {},
  config: [
    {
      key: 'source',
      value: '',
      type: propertyType.INPUT,
      text: '资源路径',
    },
    {
      key: 'fill',
      value: false,
      type: propertyType.CHECKBOX,
      text: '填充间隙',
    },
  ],
};

export default memo(ImageImpl);