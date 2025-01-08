/**
 * Converts a function that takes multiple arguments into a sequence of functions
 * that each take a single argument until all required arguments are provided.
 *
 * @param {Function} func - The function to be curried.
 * @returns {Function} A curried version of the original function.
 */
function curry(func) {
  // Return a curried function
  return function curried(...args) {
    // Check if the number of provided arguments is sufficient
    if (args.length >= func.length) {
      // If so, invoke the original function with all collected arguments
      return func(...args);
    }
    // Otherwise, return a function to collect more arguments
    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

// Test cases

// Example function that adds three numbers
function add(a, b, c) {
  return a + b + c;
}

// Create a curried version of the add function
const curriedAdd = curry(add);

// Test the curried function
console.log(curriedAdd(1)(2)(3)); // Output: 6
console.log(curriedAdd(1, 2)(3)); // Output: 6
console.log(curriedAdd(1)(2, 3)); // Output: 6
console.log(curriedAdd(1, 2, 3)); // Output: 6
