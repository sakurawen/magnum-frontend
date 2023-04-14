import { immerable } from 'immer';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export const DraftWidgetConfig = z.object({
  key: z.string(),
  type: z.string(),
  text: z.string(),
  value: z.any(),
  options: z
    .array(
      z.object({
        text: z.string(),
        value: z.any(),
      }),
    )
    .optional(),
});
export type DraftWidgetConfigSchema = z.infer<typeof DraftWidgetConfig>;

export const DraftWidgetSchema = z.object({
  id: z.string(),
  name: z.string(),
  text: z.string(),
  internal: z.record(z.string(), z.any()),
  config: z.array(DraftWidgetConfig),
});

export type DraftWidgetSchema = z.infer<typeof DraftWidgetSchema>;

export class DraftWidget {
  [immerable] = true;
  id;
  name;
  value: any;
  configuration;
  internal;
  constructor({
    id,
    name,
    config,
    internal,
  }: DraftWidgetSchema) {
    this.id = id;
    this.name = name;
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
  config,
  text,
  internal,
}: DraftWidgetSchema) {
  const properties = {
    name,
    id: nanoid(),
    text,
    config: config,
    internal,
  };
  return new DraftWidget(properties);
}
