import { z } from 'zod';
import { DraftElementSchema } from './draft';

export const MaterialSchema = z.object({
  type: z.string(),
  preview: z.custom<React.ReactElement>(),
  item: DraftElementSchema.omit({
    id: true,
    config: true,
  }).extend({
    config: z.record(z.string(), z.any()),
  }),
});

export type MaterialSchema = z.infer<typeof MaterialSchema>;
