/**
 * find the dublicates in array
 * 1. basic way to just check , using the set.
 * 2. to know the values also, we can go for map.
 *
 *
 * in any array related problem, go for object for count related.
 *  */
function isArrayDuplicated(array: number[]): Boolean {
  const items = new Set(array);
  return items.size !== array.length;
}

function getBuplicatedCount(arr: number[]) {
  const map = new Map();
  const duplicates = new Set();

  for (const item of arr) {
    if (map.has(item)) {
      duplicates.add(item); // Add only duplicates
    }
    map.set(item, (map.get(item) || 0) + 1);
  }

  return [...duplicates]; // Convert Set to Array
}

// getBuplicatedCount([1, 2, 3, 2, 3, 4, 5, 3]);





