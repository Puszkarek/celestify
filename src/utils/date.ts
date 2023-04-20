/**
 * Subtract 'x' days from the current date
 *
 * @param days - The number of days to subtract from the current date
 * @returns A Date with the specified number of days subtracted (in the past)
 */
export const subtractDaysFromCurrentDate = (days: number): Date => {
  // Get the current timestamp
  const now = Date.now();

  // Convert 'x' days to milliseconds
  const daysInMilliseconds = days * 24 * 60 * 60 * 1000;

  // Subtract the days in milliseconds from the current timestamp
  const newTimestamp = now - daysInMilliseconds;

  // Create a new Date object with the updated timestamp
  return new Date(newTimestamp);
};
