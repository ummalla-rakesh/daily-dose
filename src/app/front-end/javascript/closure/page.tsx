/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';

/**
 * Implement a function that takes one or more values and returns a function that cycles through those values each time it is called.
 * ex: 
      const helloFn = cycle('hello');
      console.log(helloFn()); // "hello"
      console.log(helloFn()); // "hello"

      const onOffFn = cycle('on', 'off');
      console.log(onOffFn()); // "on"
      console.log(onOffFn()); // "off"
      console.log(onOffFn()); // "on
 */
const Cycle: FC = () => {
  const cycle = (...args: any[]): (() => any) => {
    let index: number = 0;
    return function () {
      const data = args[index];
      if (index === args.length - 1) {
        index = 0;
      } else {
        index++;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    };
  };

  const myClosur = cycle('one', 'two', 'three');

  return (
    <>
      <h1> my input: </h1>
      <p>
        calling manytime :{' '}
        {[
          myClosur(),
          myClosur(),
          myClosur(),
          myClosur(),
          myClosur(),
          myClosur(),
          myClosur(),
        ].join(', ')}
      </p>
    </>
  );
};

const Closure: FC = () => {
  return (
    <>
      <h1>Closure</h1>
      <Cycle />
    </>
  );
};
export default Closure;
