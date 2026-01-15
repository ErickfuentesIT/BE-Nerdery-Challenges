/*
Challenge 1

"Time difference calculator"

The function timeDifference accepts two positive numbers representing time in seconds. You should modify the function to return the difference between the two times in a human-readable format HH:MM:SS.

Requirements:
- The function should accept two positive numbers representing time in seconds.
- The function should return the absolute difference between the two times.
- The result should be formatted as HH:MM:SS.

Example:

timeDifference(7200, 3400); // Expected output: "01:03:20"

*/

const TIME_PROPS = {
  hourInSeconds: 3600,
  minuteInSeconds: 60,
};

const timeDifference = (a, b) => {
  const difference = Math.abs(a - b);

  const hours = Math.trunc(difference / TIME_PROPS.hourInSeconds).toFixed(0);
  const minutes = Math.trunc(
    (difference % TIME_PROPS.hourInSeconds) / TIME_PROPS.minuteInSeconds,
  ).toFixed(0);
  const seconds = Math.trunc(
    (difference % TIME_PROPS.hourInSeconds) % TIME_PROPS.minuteInSeconds,
  ).toFixed(0);

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
};

module.exports = timeDifference;
