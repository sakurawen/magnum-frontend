
import { DraftWidget } from '@/schemas/draft';
import { propertyType } from '@/widget/consts';



export const getFormComponentProperties = (conf: DraftWidget['configuration'])=>{
  const properties: Record<string, any> = {};
  for (let idx in conf) {
    const property = conf[idx];
    if (property.type === propertyType.SELECT) {
      const option = property.value;
      properties[property.key] = option.value;
      continue;
    }
    properties[property.key] = property.value;
  }
  return properties;
}
