import { FC, ReactElement } from 'react';



const Reduce: FC<ReactElement> = () => {
  const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  const callback = (acc: number, item: number): number => acc + item;

  // Using the custom myReduce method
  const sum: number = data.myReduce(callback, 0);

  // Original reduce
  const original = data.reduce(callback, 0);

  return (
    <>
      <h3>Custom myReduce: {sum}</h3>
      <h3>Original reduce: {original}</h3>
    </>
  );
};

export default Reduce;
