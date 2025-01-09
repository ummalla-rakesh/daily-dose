/**
 * Performs a deep clone of a given value, handling special objects like Date, RegExp, Map, and Set.
 *
 * @param {*} value - The value to be cloned.
 * @returns {*} A deep copy of the input value.
 */
function deepClone(value) {
  // If the value is null or not an object/array, return it directly
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value);
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  // Handle Map
  if (value instanceof Map) {
    const clonedMap = new Map();
    value.forEach((val, key) => {
      clonedMap.set(deepClone(key), deepClone(val));
    });
    return clonedMap;
  }

  // Handle Set
  if (value instanceof Set) {
    const clonedSet = new Set();
    value.forEach(val => clonedSet.add(deepClone(val)));
    return clonedSet;
  }

  // Handle Array
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }

  // Handle Object
  const clonedObject = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      clonedObject[key] = deepClone(value[key]);
    }
  }

  return clonedObject;
}

// Example Usage
const original = {
  name: "John",
  age: 30,
  birthDate: new Date("1990-01-01"),
  pattern: /abc/gi,
  hobbies: ["reading", "traveling"],
  address: { city: "New York", zip: 10001 },
  map: new Map([["key1", "value1"], ["key2", { nested: "object" }]]),
  set: new Set([1, 2, 3, 4]),
};

const cloned = deepClone(original);

// Test mutations
cloned.name = "Jane";
cloned.birthDate.setFullYear(2000);
cloned.map.set("key3", "new value");
cloned.set.add(5);

console.log("Original:", original);
console.log("Cloned:", cloned);
