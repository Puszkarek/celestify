/**
 * Clones an object, returning a new object with the same values so that the original object is not mutated
 * @param value - The value to clone
 * @returns A clone of the value
 */
export const clone = <T extends object>(value: T): T => ({ ...value });
