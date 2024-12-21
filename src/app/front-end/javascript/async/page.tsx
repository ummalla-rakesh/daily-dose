'use client';
import { ChangeEventHandler, FC, useState } from 'react';
import { debounce } from './debounce';
import { ResumableInterval } from './resumableTimeInterval';

const AsyncComponent: FC = () => {
  //debounce
  const [debounceText, setDebounceText] = useState<string>('');
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> | undefined = (
    event
  ): void => {
    debounce(() => {
      setDebounceText(event.target.value);
    }, 500);
  };

  // ResumableInterval
  const timer = new ResumableInterval(() => {
    console.log('Timer callback');
  }, 1000);

  return (
    <>
      <p>Async component</p>
      <br />
      <div>
        <p> debounce Text: {debounceText}</p>
      </div>
      <input
        className="border border-black"
        type="text"
        onChange={onChangeHandler}
      />
      <hr />
      <div>
        <p>here you can track the debounce functionality in the console.</p>
        <button
          onClick={() => {
            timer.start();
          }}
        >
          start timer
        </button>
        <br />
        <button
          onClick={() => {
            timer.pause();
          }}
        >
          pause timer
        </button>
        <br />
        <button
          onClick={() => {
            timer.resume();
          }}
        >
          resume timer
        </button>
        <br />
        <button
          onClick={() => {
            timer.stop();
          }}
        >
          stop timer
        </button>
      </div>
    </>
  );
};

export default AsyncComponent;
