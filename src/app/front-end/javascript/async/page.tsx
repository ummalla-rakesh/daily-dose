'use client';
import { ChangeEventHandler, FC, useState } from 'react';
import { debounce } from './debounce';
import { ResumableInterval } from './resumableTimeInterval';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      <Input
        // className="border border-black"
        type="text"
        onChange={onChangeHandler}
        width={100}
        className="w-3/12"
      />
      <hr />
      <div>
        <p>here you can track the debounce functionality in the console.</p>
        <Button
          onClick={() => {
            timer.start();
          }}
        >
          start timer
        </Button>
        <br />
        <Button
          onClick={() => {
            timer.pause();
          }}
        >
          pause timer
        </Button>
        <br />
        <Button
          onClick={() => {
            timer.resume();
          }}
        >
          resume timer
        </Button>
        <br />
        <Button
          onClick={() => {
            timer.stop();
          }}
        >
          stop timer
        </Button>
      </div>
    </>
  );
};

export default AsyncComponent;
