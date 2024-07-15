type ObjType<T> = T extends Record<string, any> ? T : never;

export const objectSmartMerge = <T>(target: ObjType<T>, source: ObjType<T>) => {
  const targetCopy = structuredClone(target);

  const sourceCopy = structuredClone(source);

  Object.keys(targetCopy).forEach((key) => {
    targetCopy[key] = sourceCopy[key] ?? targetCopy[key];
  });

  return targetCopy;
};
