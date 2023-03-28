import { z } from 'zod';
import { MaterialSchema } from '@/schemas/material';
import { immerable } from 'immer';
import { nanoid } from 'nanoid';
export const DraftWidgetSchema = z.object({
  id: z.string(),
  name: z.string(),
  text: z.string(),
  internal: z.record(z.string(), z.any()),
  config: z.array(
    z.object({
      key: z.string(),
      type: z.string(),
      text: z.string(),
      value: z.any(),
    }),
  ),
  componentType: z.custom<React.FC<any>>(),
});

export type DraftWidgetSchema = z.infer<typeof DraftWidgetSchema>;

export class DraftWidget {
  [immerable] = true;
  id;
  name;
  value: any;
  configuration;
  componentType: React.FC<any>;
  internal;
  constructor({
    id,
    componentType,
    name,
    config,
    internal,
  }: DraftWidgetSchema) {
    this.id = id;
    this.name = name;
    this.componentType = componentType;
    this.internal = internal;
    this.configuration = config;
  }
}

const testDraftWidget = z.instanceof(DraftWidget);

export function isDraftWidget(item: any) {
  return testDraftWidget.parse(item);
}

export function createDraftWidget({
  name,
  componentType,
  config,
  text,
  internal,
}: MaterialSchema['item']) {
  const properties = {
    name,
    id: nanoid(),
    text,
    componentType,
    config: config,
    internal,
  };
  return new DraftWidget(properties);
}
