export type ObjectType = {
  [key: string]: unknown;
};

export const filterFields = (obj: ObjectType, fieldsToInclude: string[]): object => {
  return Object.entries(obj)
    .filter(([key]) => fieldsToInclude.includes(key))
    .reduce((acc: ObjectType, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
};
