'use client';
import { useState } from 'react';
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
    console.log({
      widgets,
    });
    return widgets;
  });

  const showData = () => {
    console.log(formData);
  };
  return (
    <div className="md:h-[86vh] h-full  md:w-[46vh] overflow-y-auto">
      {widgets.map((item) => {
        const ElementComponent = MagnumImpl[
          item.name as MagnumImplKeys
        ] as React.ElementType;
        const configuration = getFormComponentProperties(item.configuration)
        console.log(configuration)
        return (
          <ElementComponent
            {...item.internal}
            {...configuration}
            className={item.internal.className}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default UserForm;
