import { MaterialSchema } from '@/schemas/material';
import { ButtonWidgetConfig } from './Button';
import { CheckboxWidgetConfig } from './Checkbox';
import { DividerWidgetConfig } from './Divider';
import { ImageWidgetConfig } from './Image';
import { InputWidgetConfig } from './Input';
import { ParagraphWidgetConfig } from './Paragraph';
import { TextareaWidgetConfig } from './Textarea';
import { TitleWidgetConfig } from './Title';
import { VideoWidgetConfig } from './Video';
import { SpaceWidgetConfig } from './Space';

const widgetConfigMap = {
  button: ButtonWidgetConfig,
  checkbox: CheckboxWidgetConfig,
  divider: DividerWidgetConfig,
  image: ImageWidgetConfig,
  input: InputWidgetConfig,
  p: ParagraphWidgetConfig,
  title: TitleWidgetConfig,
  textarea: TextareaWidgetConfig,
  video: VideoWidgetConfig,
  space: SpaceWidgetConfig,
};

export const getWidgetConfig = (
  widgetName: keyof typeof widgetConfigMap,
): MaterialSchema['item'] => {
  return widgetConfigMap[widgetName];
};
