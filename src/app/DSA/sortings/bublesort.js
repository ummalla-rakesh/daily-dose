// give buble sort algorithm
// max Time Complexity: O(n^2)
// Space Complexity: O(1)
//

/**
 * Sorts an array using the bubble sort algorithm. The function compares adjacent elements
 * and swaps them if they are in the wrong order. in each iteration swap one items so have to iterate n-1 times. if the array is already sorted then no need to iterate n-1 times. so we can break the loop if no swap is made in the current iteration by maintaining the swapped.
 *
 **/
// method-1

function bubbleSort(arr) {
  // Get the length of the array
  const n = arr.length;

  // Iterate through the array
  for (let i = 0; i < n; i++) {
    // Set a flag to check if any swaps are made in the current iteration
    let swapped = false;

    // Iterate through the array from 0 to n-i-1
    for (let j = 0; j < n - i - 1; j++) {
      // Compare the adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap the elements if they are in the wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps are made in the current iteration, the array is already sorted
    if (!swapped) {
      break;
    }
  }

  // Return the sorted array
  return arr;
}

//method-2
function bubleSort2(arr) {
  let length = arr.length;
  let notSorted;

  do {
    notSorted = false;
    for (let index = 0; index < length - 1; index++) {
      if (arr[index] > arr[index + 1]) {
        const tempItem = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = tempItem;
        notSorted = true;
      }
    }
    length--;
  } while (notSorted);

  return arr;
}

const arr = [64, 34, 25, 12, 22, 11, 90];
arr.sort((a, b) => a - b);