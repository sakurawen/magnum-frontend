import cx from 'clsx';
import { alignClassName } from '../../consts';

type ParagraphProps = {
  text: string;
  indent: boolean;
  align: 'left' | 'right' | 'center' | 'justify';
};

const ParagraphImpl = ({ text, indent, align }: ParagraphProps) => {
  return (
    <p
      className={cx(
        'min-h-[1em] whitespace-pre-wrap px-3 py-2 text-sm/6',
        alignClassName[align],
        [indent && 'indent-8'],
      )}
    >
      {text}
    </p>
  );
};


export default ParagraphImpl;
