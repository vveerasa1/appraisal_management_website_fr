export function mapToSelectOptions(data = [], keyMap = { label: 'name', value: 'id' }) {
  return data.map(item => {
    const newItem = {};
    for (const [newKey, valueOrFn] of Object.entries(keyMap)) {
      newItem[newKey] =
        typeof valueOrFn === 'function' ? valueOrFn(item) : item?.[valueOrFn];
    }
    return newItem;
  });
}