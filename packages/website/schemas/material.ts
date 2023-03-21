import { z } from 'zod';
import { DraftItem } from './draft';

export const Material = z.object({
  type: z.string(),
  preview: z.custom<React.ReactElement>(),
  item: DraftItem.omit({
    id: true,
    config: true,
  }).extend({
    config: z.record(z.string(), z.any()),
  }),
});

export type Material = z.infer<typeof Material>;
