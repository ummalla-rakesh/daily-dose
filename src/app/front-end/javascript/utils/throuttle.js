/**
 * Creates a throttled version of the provided callback function, ensuring that
 * the callback is invoked at most once every `wait` milliseconds.
 *
 * @param {Function} callback - The function to be throttled.
 * @param {number} wait - The wait duration in milliseconds.
 * @returns {Function} A throttled version of the callback function.
 */
function throttle(callback, wait) {
  let lastExecuted = 0; // Keeps track of the last execution time

  return function (...args) {
    const now = Date.now(); // Get the current time

    // Check if the wait duration has passed since the last execution
    if (now - lastExecuted >= wait) {
      lastExecuted = now; // Update the last execution time
      callback.apply(this, args); // Invoke the callback with the current context and arguments
    }
  };
}

// Test cases

// Example: Log the current time at most once every 2 seconds
const logTime = throttle(() => {
  console.log('Executed at:', new Date().toISOString());
}, 2000);

// Simulate multiple rapid calls to the throttled function
const intervalId = setInterval(logTime, 500);

// Stop the simulation after 10 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log('Stopped simulation');
}, 10000);
