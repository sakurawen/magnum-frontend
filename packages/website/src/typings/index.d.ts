export type GetElementPropsType<T> = T extends (props: infer p) => JSX.Element ? p : undefined;

export type Material = {
  type: string;
  preview: React.ReactElement;
  item: {
    componentType: React.FC<any>;
    configuration: Record<string, any>;
    [key: string]: any;
  };
};
