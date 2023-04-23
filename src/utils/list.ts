export const mapRecord = <TKey, TValue, TOutput>(
  record: Map<TKey, TValue>,
  parseMethod: (value: TValue) => TOutput,
): Map<TKey, TOutput> => {
  const newMap = new Map<TKey, TOutput>();

  record.forEach((value, key) => {
    newMap.set(key, parseMethod(value));
  });

  return newMap;
};

export const mapToArray = <TKey, TValue, TOutput>(
  record: Map<TKey, TValue>,
  parseMethod: (value: TValue, key: TKey) => TOutput,
): Array<TOutput> => {
  const list: Array<TOutput> = [];

  record.forEach((value, key) => {
    list.push(parseMethod(value, key));
  });

  return list;
};
