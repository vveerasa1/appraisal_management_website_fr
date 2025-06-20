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

export function createFilterObject(input = {}) {
  const allowedKeys = ['id', 'search', 'department', 'designation', 'role','pageSize', 'pageIndex'];
  const filterObject = {};

  allowedKeys.forEach((key) => {
    if (input[key] !== undefined && input[key] !== '') {
      filterObject[key] = input[key];
    }
  });

  return filterObject;
}