declare global {
  interface Array<T> {
    myMap: (callback: (item: T, index: T) => T) => T[];
    myReduce: (callback: ReducerCallback<T>, initialValue: T) => T;
  }
}

//reducer
type ReducerCallback<T> = (acc: T, item: T) => T;
Array.prototype.myReduce = function <T>(
  this: T[],
  callback: ReducerCallback<T>,
  initialValue: T
): T {
  let total: T = initialValue;
  this.forEach((item: T) => {
    total = callback(total, item);
  });
  return total;
};


// Adding myMap to Array.
Array.prototype.myMap = function <T>(
  this: T[],
  callback: (item: T, index: number) => T
): T[] {
  const result: T[] = [];

  this.forEach((item: T, i: number): void => {
    const res: T = callback(item, i);
    if (res) result.push(res);
  });

  return result;
};

export {};
