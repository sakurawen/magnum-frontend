import { z } from 'zod';
import { DraftWidgetSchema } from './draft';

export const MaterialSchema = z.object({
  type: z.string(),
  preview: z.custom<React.ReactElement>(),
  item: DraftWidgetSchema.omit({
    id: true,
    config: true,
  }).extend({
    text:z.string(),
    config: z.array(z.object({
      key:z.string(),
      type:z.string(),
      text:z.string(),
      value:z.any()
    })) 
  }),
});
export type MaterialSchema = z.infer<typeof MaterialSchema>;
