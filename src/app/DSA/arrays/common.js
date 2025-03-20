// find the second largest element in an array
// Time Complexity: O(n)
// Space Complexity: O(1)
function findSecondLargest(arr) {
  let first = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > first) {
      second = first;
      first = arr[i];
    } else if (arr[i] > second && arr[i] !== first) {
      second = arr[i];
    }
  }

  return second;
}
// // test
// console.log(findSecondLargest([1, 2, 3, 4, 5])); // 4

// find the second smallest element in an array
// Time Complexity: O(n)
// Space Complexity: O(1)
function findSecondSmallest(arr) {
  let first = Infinity;
  let second = Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < first) {
      second = first;
      first = arr[i];
    } else if (arr[i] < second && arr[i] !== first) {
      second = arr[i];
    }
  }

  return second;
}

// Write a function that moves all zeroes in an array to the end while maintaining the relative order of non-zero elements.
// Time Complexity: O(n)
// Space Complexity: O(1)
function moveZeroesToEnd(arr) {
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    if (arr[right] !== 0) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
    }
  }

  return arr;
}
