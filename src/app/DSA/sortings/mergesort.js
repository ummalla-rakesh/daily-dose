Array.prototype.mySort = function (compareFn) {
  function merge(left, right) {
    let sortedArr = [];
    while (left.length && right.length) {
      if (compareFn ? compareFn(left[0], right[0]) <= 0 : left[0] <= right[0]) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }
    }
    return [...sortedArr, ...left, ...right];
  }

  function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
  }

  let sorted = mergeSort(this);
  for (let i = 0; i < sorted.length; i++) {
    this[i] = sorted[i]; // Modify the original array
  }
  return this;
};

// Example usage:
let arr = [5, 3, 8, 4, 2];
arr.mySort(); // Default ascending order
console.log(arr); // [2, 3, 4, 5, 8]

let arr2 = [5, 3, 8, 4, 2];
arr2.mySort((a, b) => b - a); // Descending order
console.log(arr2); // [8, 5, 4, 3, 2]
