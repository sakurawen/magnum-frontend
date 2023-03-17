export type DraftItem = {
  name: string;
  uuid: string;
  configuration: Record<string, any>;
  componentType: React.FC;
};
