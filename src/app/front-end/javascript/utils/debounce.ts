/**
 * debounce
 */
let timerId: NodeJS.Timeout | null;
const debounce = (callback: () => void, timeDuration: number): void => {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    callback();
    timerId = null;
  }, timeDuration);
};

export { debounce };
