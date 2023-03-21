import { z } from 'zod';
import { Material } from '@/schemas/material';
import { immerable } from 'immer';
import { nanoid } from 'nanoid';

export const DraftItem = z.object({
  id: z.string(),
  name: z.string(),
  internal: z.record(z.string(), z.any()),
  config: z.object({
    properties: z.record(z.string(), z.any()),
    raw: z.record(z.string(), z.any()),
  }),
  componentType: z.custom<React.FC<any>>(),
});

export type DraftItem = z.infer<typeof DraftItem>;

const configValueType = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
};

function createMaterialConfiguration(config: Record<string, any>) {
  let properties: Record<string, any> = {};
  for (let p in config) {
    properties[p] = {
      value: config[p],
      type: typeof config[p],
    };
  }
  return {
    properties,
    raw: config,
  };
}

export class DraftElement {
  [immerable] = true;
  id;
  name;
  value: any;
  configuration: ReturnType<typeof createMaterialConfiguration>;
  componentType: React.FC<any>;
  internal;
  constructor({ id, componentType, name, config, internal }: DraftItem) {
    this.id = id;
    this.name = name;
    this.componentType = componentType;
    this.internal = internal;
    this.configuration = config;
  }
}

const testDraftElement = z.instanceof(DraftElement);

export function isDraftElement(item: any) {
  return testDraftElement.parse(item);
}

export function createDraftElement({
  name,
  componentType,
  config,
  internal,
}: Material['item']) {
  const properties = {
    name,
    id: nanoid(),
    componentType,
    config: createMaterialConfiguration(config),
    internal,
  };
  return new DraftElement(properties);
}