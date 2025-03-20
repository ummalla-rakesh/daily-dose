// linear search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// binary search
function binarySearch(target) {
  let left = 0;
  let right = this.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (this[mid] === target) return mid;
    if (this[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// test
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(linearSearch(arr, 5)); // 4
// console.log(binarySearch(arr, 5)); // 4

Array.prototype.linearSearch = function (target) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === target) return i;
  }
  return -1;
};

Array.prototype.binarySearch = binarySearch;

// test
// console.log(arr.linearSearch(5)); // 4
console.log(arr.binarySearch(5)); // 4
console.log(binarySearch.call(arr, 5)); // -1
