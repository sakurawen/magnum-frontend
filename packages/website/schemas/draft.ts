import { immerable } from 'immer';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { WidgetSchemaName, getWidgetSchema } from '@/widget/utils';
import { cloneDeep } from 'lodash-es';

export const DraftWidgetConfig = z.object({
  key: z.string(),
  type: z.string(),
  text: z.string(),
  value: z.any(),
  id: z.string().optional(),
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
  constructor({ id, name, config, internal }: DraftWidgetSchema) {
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

export function createDraftWidget(name: string): DraftWidget {
  const schema = getWidgetSchema(name as WidgetSchemaName);
  const properties = {
    id: nanoid(),
    ...schema,
  };
  return new DraftWidget(properties);
}

export function transformAIDraftWidget(aiSchema: App.AISchema): DraftWidget {
  const result = cloneDeep(getWidgetSchema(aiSchema.type as WidgetSchemaName));
  const { type, ...keys } = aiSchema;
  Object.keys(keys).forEach((key) => {
    const idx = result.config.findIndex((c) => c.key === key);
    const k = key as keyof typeof keys;
    if (idx !== -1) {
      // if (type === 'Select' && k === 'options') {
      //   result.config[idx]['options'] = aiSchema[k as 'options'];
      // } else {
      result.config[idx]['value'] = aiSchema[k];
      // }
    }
  });
  return new DraftWidget({
    id: nanoid(),
    ...result,
  });
}

export function transformDraftWidget(
  field: App.FormFieldModel,
  configs: App.FormFieldConfigModel[],
): DraftWidget {
  const { config: rawConfigs, ...schema } = getWidgetSchema(
    field.field_name as WidgetSchemaName,
  );
  const config: DraftWidgetConfigSchema[] = configs
    .filter((config) => config.field_id === field.id)
    .map((c) => {
      const { id, key, value } = c;
      return {
        ...(rawConfigs.find((rc) => rc.key === key) as DraftWidgetConfigSchema),
        id,
        value: JSON.parse(value),
      };
    });
  const properties = {
    id: field.id,
    config,
    ...schema,
  };
  return new DraftWidget(properties);
}
