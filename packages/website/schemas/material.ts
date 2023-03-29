import { z } from 'zod';
import { DraftWidgetSchema } from './draft';

export const MaterialSchema = z.object({
  type: z.string(),
  preview: z.custom<React.ReactElement>(),
  item: DraftWidgetSchema.omit({ id: true }),
});

export type MaterialSchema = z.infer<typeof MaterialSchema>;
