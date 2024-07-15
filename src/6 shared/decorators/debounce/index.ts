export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number, abortValue: any = undefined) {
  let cancel = new Function();

  type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

  type ReturnT = Awaited<ReturnType<T>>;

  return (...args: Parameters<T>): Promise<ReturnT> => {
    cancel();

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve(fn(...args)), wait);

      cancel = () => {
        clearTimeout(timer);

        if (abortValue !== undefined) {
          reject(abortValue);
        }
      };
    });
  };
}
