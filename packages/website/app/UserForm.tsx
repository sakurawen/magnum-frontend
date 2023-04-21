'use client';
import { useMemo, useState } from 'react';
import * as MagnumImpl from '@/widget/components/magnum';
import { DraftWidget, transformDraftWidget } from '@/schemas/draft';
import { getFormComponentProperties } from '@/utils/form';
import { formService } from '@/services';
import { toast } from 'sonner';
import cx from 'clsx';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

type MagnumImplKeys = keyof typeof MagnumImpl;
type UserFormProps = {
  data: App.FormTemplate | App.FormSnapshot;
};

type UserFormWidget = DraftWidget & {
  [key: string]: any;
};
const UserForm = ({ data }: UserFormProps) => {
  const pathname = usePathname();
  const isPreview = pathname.startsWith('/preview');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  const { widgets, formId } = useMemo<{
    formId: string;
    widgets: UserFormWidget[];
  }>(() => {
    if ('json' in data) {
      console.log('form preview');
      const widgets = JSON.parse(data.json) as UserFormWidget[];
      const controlWidgets = widgets.map((w) => {
        return {
          ...w,
        };
      });
      return {
        formId: data.id,
        widgets: controlWidgets,
      };
    }
    const widgets = data.template.fields.map((field) => {
      return {
        ...transformDraftWidget(field, data.template.configs),
      };
    }) as UserFormWidget[];

    return {
      formId: data.form.id,
      widgets,
    };
  }, [data]);

  const [formData, setFormData] = useState<
    Record<
      string,
      {
        id: string;
        type: string;
        value: any;
        config: any;
      }
    >
  >(() => {
    const result: Record<
      string,
      {
        id: string;
        type: string;
        value: any;
        config: any;
      }
    > = {};
    widgets.forEach((item) => {
      const defaultValue = item.name === 'Checkbox' ? false : '';
      result[item.id] = {
        id: item.id,
        type: item.name,
        value: defaultValue,
        config: item.configuration,
      };
    });
    return result;
  });

  const handleSubmit = () => {
    const fieldType = ['Checkbox', 'Input', 'Select', 'Textarea'];
    const filterFormData = Object.values(formData).filter((item) =>
      fieldType.includes(item.type),
    );
    const submissions: App.Submission[] = [];
    filterFormData.forEach((field) => {
      const fieldType = field.type;
      let label = '';
      let value = field.value;
      switch (fieldType) {
        case 'Input':
        case 'Textarea':
          label = field.config.find((c: any) => c.key === 'label').value;
          break;
        case 'Select':
          label = field.config.find((c: any) => c.key === 'label').value;
          break;
        case 'Checkbox':
          label = field.config.find((c: any) => c.key === 'description').value;
          break;
      }

      const item: App.Submission = {
        field_id: field.id,
        field_type: field.type,
        field_value: JSON.stringify(value),
        field_label: label,
      };
      submissions.push(item);
    });
    setSubmitLoading(true);
    formService
      .submit(formId, submissions)
      .then(() => {
        toast.success('表单提交成功');
        setFinish(true);
      })
      .catch((err) => {
        toast.error('表单提交失败，请稍后再试');
        console.log('提交失败：', err);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleSetFormData = (type: string, fieldId: string, value: any) => {
    if (type === 'Button') {
      handleSubmit();
      return;
    }
    setFormData((f) => {
      f[fieldId].value = value;
      return { ...f };
    });
  };

  const controls = useMemo(() => {
    const result: Record<string, App.WidgetControl['onControl']> = {};
    widgets.forEach((w) => {
      result[w.id] = (type: string, value: any) => {
        if (isPreview) return;
        handleSetFormData(type, w.id, value);
      };
    });
    return result;
  }, [widgets, isPreview]);

  return (
    <div
      className={cx(
        'h-full overflow-y-auto pb-8 md:h-[86vh] md:w-[46vh]   md:pb-[4vh] ',
        {
          'pt-4 md:pt-[4vh]': widgets[0]?.name !== 'Image',
        },
      )}
    >
      {finish ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto bg-green-200 p-3">
              <Icon icon="ph:check-fat-duotone" className=" m-auto block h-12 w-12" />
            </div>
            <p className="mt-4 text-xl font-bold">提交成功</p>
          </div>
        </div>
      ) : (
        <div>
          {widgets.map((item) => {
            const ElementComponent = MagnumImpl[
              item.name as MagnumImplKeys
            ] as React.ElementType;
            const configuration = getFormComponentProperties(
              item.configuration,
            );
            const disabledProps =
              item.name === 'Button'
                ? {
                    loading: submitLoading,
                  }
                : {};
            const loadingProps = ['Input', 'Select', 'Textarea', 'Checkbox']
              ? {
                  disabled: submitLoading,
                }
              : {};
            return (
              <ElementComponent
                onControl={(val: any) => controls[item.id]?.(item.name, val)}
                value={formData[item.id].value}
                {...configuration}
                {...disabledProps}
                {...loadingProps}
                className={item.internal.className}
                key={item.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserForm;
