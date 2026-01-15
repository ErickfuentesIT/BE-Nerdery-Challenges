/* 
Challenge: "Find Majority Element";

The function findMajorityElement accepts an array of numbers and returns the majority element if it exists, otherwise returns null. The majority element is the element that appears more than n/2 (floor of that division) times in the array.

Requirements:
- The function should handle arrays of any length.
- The function should return the majority element if it exists, otherwise return null.
- The function should be efficient and handle large arrays.
- The function should not modify the original array.

Example:
findMajorityElement([1, 2, 3, 1, 1]); // Expected output: 1
findMajorityElement([1, 2, 3, 4]); // Expected output: null
findMajorityElement([1, 1, 2, 2, 2]); // Expected output: 2
findMajorityElement([1, 2, 2, 3, 3, 3]); // Expected output: null
findMajorityElement([1, 2, 3, 4, 5]); // Expected output: null


*/

const findMajorityElement = (arr) => {
  if (arr.length === 0) return null;

  if (arr.length === 1) return arr[0];

  const counts = {};
  const limit = Math.floor(arr.length / 2);

  for (const num of arr) {
    counts[num] = (counts[num] || 0) + 1;

    if (counts[num] > limit) {
      return num;
    }
  }

  return null;
};

module.exports = findMajorityElement;
