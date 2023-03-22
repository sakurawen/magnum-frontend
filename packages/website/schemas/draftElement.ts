import { z } from 'zod';

export const DraftElementProperty = z.object({
  key: z.string(),
  type: z.string(),
});

export const DraftElementPropertyOption = z.object({});

type CreateOptionPropertiesParams = {
  key: string;
};

function createButtonDraftProperties() {
  return {};
}

const optionsProperties = {
  key: 'size',
  type: 'string',
  options: [
    {
      label: 'large',
      value: 'large',
    },
    {
      label: 'middle',
      value: 'middle',
    },
    {
      label: 'small',
      size: 'small',
    },
  ],
};

const booleanProperties = {
  key: 'size',
  type: 'boolean',
  options: [
    {
      label: 'true',
      value: true,
    },
    {
      label: 'false',
      value: false,
    },
  ],
};

const stringProperties = {
  key: 'name',
  type: 'string',
  label:"wuhu",
  value:"wuhu"
};
