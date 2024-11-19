export function objectsToArray<T extends object>(data: T[], keys: (keyof T)[]) {
  return keys.map((key) => {
    return data.map((item) => item[key]);
  });
}
