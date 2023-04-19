'use client';
import { useEffect, useState } from 'react';
import * as MagnumImpl from '@/widget/components/magnum';
import { transformDraftWidget } from '@/schemas/draft';
import { getFormComponentProperties } from '@/utils/form';

type MagnumImplKeys = keyof typeof MagnumImpl;
type UserFormProps = {
  data: App.FormTemplate;
};

const UserForm = ({ data }: UserFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    return {};
  });
  const handleSetFormData = (fieldId: string, value: any) => {
    setFormData((data) => {
      data[fieldId] = value;
      return { ...data };
    });
  };
  const [widgets, setWidgets] = useState(() => {
    const widgets = data.template.fields.map((field) => {
      let eventName = 'onChange';
      if (field.field_type === 'Button') {
        eventName = 'onClick';
      }
      let onChange = (val: any) => {
        handleSetFormData(field.id, val);
      };
      return {
        event: {
          [eventName]: eventName === 'onChange' ? onChange : () => {},
        },
        ...transformDraftWidget(field, data.template.configs),
      };
    });
    return widgets;
  });

  const showData = () => {
    console.log(formData);
  };
  return (
    <div className="h-[86vh]  w-[46vh] overflow-y-auto">
      {widgets.map((item) => {
        const ElementComponent = MagnumImpl[
          item.name as MagnumImplKeys
        ] as React.ElementType;
        return (
          <ElementComponent
            {...item.internal}
            {...getFormComponentProperties(item.configuration)}
            className={item.internal.className}
            {...item.event}
            key={item.id}
          />
        );
      })}
      <button onClick={showData}>preview</button>
    </div>
  );
};

export default UserForm;
