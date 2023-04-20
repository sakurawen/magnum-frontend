declare namespace App {
  type ListForm = {
    id: string;
    title: string;
    description: string;
    create_at: string;
    update_at: string;
  };

  type FormModel = {
    id: string;
    user_id: string;
    title: string;
    description: string;
    create_at: string;
    update_at: string;
    is_release: 0 | 1;
    disabled: 0 | 1;
  };
  type FormFieldModel = {
    id: string;
    form_id: string;
    field_type: string;
    field_label: string;
    field_name: string;
    is_required: 0 | 1;
    order_index: number;
    create_at: string;
    update_at: string;
    options: string;
    placeholder: string;
    disabled: 0 | 1;
  };
  type FormFieldConfigModel = {
    id: string;
    field_id: string;
    key: string;
    type: string;
    value: string;
    text: string;
    order_index: number;
    disabled: 0 | 1;
  };
  type FormTemplate = {
    form: FormModel;
    template: {
      fields: FormFieldModel[];
      configs: FormFieldConfigModel[];
    };
  };
  type FormSubmissionModel = {
    id: string;
    form_id: string;
    user_id: string;
    create_at: string;
    is_deleted: 0 | 1;
  };
  type FormSubmissionDataModel = {
    id: string;
    submission_id: string;
    field_id: string;
    field_value: string;
    create_at: string;
    is_deleted: 0 | 1;
  };
  type AISchemaMap = {
    Input: {
      type: 'Input';
      label: string;
      placeholder: string;
    };
    Textarea: {
      type: 'Textarea';
      label: string;
      placeholder: string;
    };
    Select: {
      type: 'Select';
      label: string;
      options: Array<{
        text: string;
        value: any;
      }>;
    };
    Checkbox: {
      type: 'Checkbox';
      text: string;
    };
    Button: {
      type: 'Button';
      text: string;
    };
    Title: {
      type: 'Title';
      text: string;
    };
    Paragraph: {
      type: 'Paragraph';
      text: string;
    };
  };
  type AISchema = AISchemaMap[keyof AISchemaMap];
}
