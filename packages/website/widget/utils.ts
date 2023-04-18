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
  Button: ButtonSchema,
  Checkbox: CheckboxSchema,
  Divider: DividerSchema,
  Image: ImageSchema,
  Input: InputSchema,
  Paragraph: ParagraphSchema,
  Title: TitleSchema,
  Textarea: TextareaSchema,
  Video: VideoSchema,
  Space: SpaceSchema,
  Select: SelectSchema,
};
export type WidgetSchemaName = keyof typeof widgetSchemaMap;

export const getWidgetSchema = (
  widgetName: WidgetSchemaName,
): MaterialSchema['item'] => {
  return widgetSchemaMap[widgetName];
};
