import { Textarea, TextareaProps } from '@magnum/ui';

const TextareaImpl = (
  props: TextareaProps & {
    label: string;
  },
) => {
  const { label, ...restProps } = props;
  return (
    <div>
      <span className="mb-1 inline-block text-sm text-theme-content-1/90">
        {label}
      </span>
      <Textarea {...restProps} />
    </div>
  );
};

export default TextareaImpl;
