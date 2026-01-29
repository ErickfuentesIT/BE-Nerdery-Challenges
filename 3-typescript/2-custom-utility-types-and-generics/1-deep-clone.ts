/**
 * Challenge: Create a deep clone function
 *
 * Create a function that takes an object and returns a deep clone of that object. The function should handle nested objects, arrays, and primitive types.
 *
 * Requirements:
 * - The function should accept an object of any type.
 * - It should return a new object that is a deep clone of the original object.
 * - The function should handle nested objects and arrays.
 * - It should handle primitive types (strings, numbers, booleans, null, undefined).
 * - The function should not use any external libraries
 */

//? implement the function  here

const brands = require("./../1-ecommerce/data/brands.json");

function deepClone<T>(object: T): T {
  if (object === null || typeof object !== "object") {
    return object;
  }
  if (Array.isArray(object)) {
    const arrayCopy = [];
    for (let i = 0; i < object.length; i++) {
      arrayCopy[i] = deepClone(object[i]);
    }
    return arrayCopy as T;
  }

  const objectCopy = Object.create(Object.getPrototypeOf(object));
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      objectCopy[key] = deepClone(object[key]);
    }
  }
  return objectCopy as T;
}

const brand = deepClone(brands);

console.log("Object Copy: ", brand);
