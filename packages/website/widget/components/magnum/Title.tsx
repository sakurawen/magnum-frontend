import cx from 'clsx';
import { alignClassName } from '../../consts';

type TitleProps = {
  text: string;
  align: 'left' | 'right' | 'center' | 'justify';
};

const TitleImpl = ({ text, align }: TitleProps) => {
  return (
    <div className="px-3 py-2">
      <h2
        className={cx(
          'mb-1 mt-3 min-h-[1em] whitespace-pre-wrap  text-2xl font-bold',
          alignClassName[align],
        )}
      >
        {text}
      </h2>
    </div>
  );
};


export default TitleImpl;
