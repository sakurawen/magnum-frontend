import { Textarea, TextareaProps } from '@magnum/ui';

const TextareaImpl = (
  props: Omit<TextareaProps, 'onChange'> & {
    label: string;
  } & App.WidgetControl,
) => {
  const { label, onControl, ...restProps } = props;
  return (
    <div className="px-3 py-2">
      <span className="text-theme-content-1/90 mb-1 inline-block text-sm">
        {label}
      </span>
      <Textarea {...restProps} onChange={(val) => onControl?.(val)} />
    </div>
  );
};

export default TextareaImpl;
