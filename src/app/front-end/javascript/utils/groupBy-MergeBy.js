/**
 * Groups elements of an array by a specified criterion.
 *
 * @param {Array} collection - The array to group.
 * @param {Function|String} iteratee - The function or property to group by.
 * @returns {Object} The grouped object.
 */
function groupBy(collection, iteratee) {
  return collection.reduce((result, item) => {
    // Determine the key based on the iteratee (function or string)
    const key =
      typeof iteratee === 'function' ? iteratee(item) : item[iteratee];

    // If the key doesn't exist, initialize it as an array
    if (!result[key]) {
      result[key] = [];
    }

    // Push the current item to the appropriate group
    result[key].push(item);

    return result;
  }, {});
}

// Example usage
const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Jim', age: 25 },
  { name: 'Jack', age: 35 },
];

const groupedByAge = groupBy(users, 'age');
console.log(groupedByAge);

/**
 * Output:
 * {
 *   25: [
 *     { name: 'John', age: 25 },
 *     { name: 'Jim', age: 25 }
 *   ],
 *   30: [{ name: 'Jane', age: 30 }],
 *   35: [{ name: 'Jack', age: 35 }]
 * }
 * ***********************************************************************************
 */

/**
 * Merges elements of an array by a specified key.
 *
 * @param {Array} collection - The array of objects to merge.
 * @param {Function|string} iteratee - The function or property name to merge by.
 * @returns {Array} The merged array of objects.
 */
function mergeBy(collection, iteratee) {
  const map = new Map();

  collection.forEach((item) => {
    // Get the key from the iteratee (either a function or property)
    const key =
      typeof iteratee === 'function' ? iteratee(item) : item[iteratee];

    if (!map.has(key)) {
      map.set(key, { ...item });
    } else {
      const existing = map.get(key);

      // Merge the objects with the same key
      Object.keys(item).forEach((field) => {
        if (Array.isArray(item[field])) {
          // Merge and deduplicate arrays
          existing[field] = Array.from(
            new Set([...(existing[field] || []), ...item[field]])
          );
        } else if (typeof item[field] === 'number') {
          // Sum numeric fields
          existing[field] = (existing[field] || 0) + item[field];
        } else {
          // Keep the first value or merge if it's an object (deep merge can be added here)
          existing[field] = existing[field] || item[field];
        }
      });
    }
  });

  return Array.from(map.values());
}

// Example usage
const sessions = [
  { user: 1, duration: 30, equipment: ['bike'] },
  { user: 2, duration: 45, equipment: ['bench'] },
  { user: 1, duration: 60, equipment: ['treadmill'] },
  { user: 2, duration: 30, equipment: ['dumbbell'] },
];

const mergedSessions = mergeBy(sessions, 'user');
console.log(mergedSessions);

/**
 * Output:
 * [
 *   { user: 1, duration: 90, equipment: ['bike', 'treadmill'] },
 *   { user: 2, duration: 75, equipment: ['bench', 'dumbbell'] }
 * ]
 */
