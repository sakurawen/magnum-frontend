import { MaterialSchema } from '@/schemas/material';
import { ButtonSchema } from './schema/Button';
import { CheckboxSchema } from './schema/Checkbox';
import { DividerSchema } from './schema/Divider';
import { ImageSchema } from './schema/Image';
import { ParagraphSchema } from './schema/Paragraph';
import { SelectSchema } from './schema/Select';
import { SpaceSchema } from './schema/Space';
import { TextareaSchema } from './schema/Textarea';
import { TitleSchema } from './schema/Title';
import { VideoSchema } from './schema/Video';
import { InputSchema } from './schema/Input';

const widgetSchemaMap = {
  button: ButtonSchema,
  checkbox: CheckboxSchema,
  divider: DividerSchema,
  image: ImageSchema,
  input: InputSchema,
  p: ParagraphSchema,
  title: TitleSchema,
  textarea: TextareaSchema,
  video: VideoSchema,
  space: SpaceSchema,
  select: SelectSchema,
};

export const getWidgetSchema = (
  widgetName: keyof typeof widgetSchemaMap,
): MaterialSchema['item'] => {
  return widgetSchemaMap[widgetName];
};
