import { immerable } from 'immer';

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

export type DraftProperty = {
  id: string;
  name: string;
  configuration: {
    properties: Record<string, any>;
    raw: Record<string, any>;
  };
  defaultClassName?: string;
  componentType: React.FC<any>;
};

export class DraftElement {
  [immerable] = true;
  id;
  name;
  value: any;
  configuration: ReturnType<typeof createMaterialConfiguration>;
  componentType: React.FC<any>;
  defaultClassName;
  constructor({ id, componentType, name, configuration, defaultClassName }: DraftProperty) {
    this.id = id;
    this.name = name;
    this.componentType = componentType;
    this.defaultClassName = defaultClassName;
    this.configuration = createMaterialConfiguration(configuration);
  }
}

export function createDraftElement(args: DraftProperty) {
  return new DraftElement(args);
}
