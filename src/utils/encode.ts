export const stringToBase64 = (input: string): string | null => {
  try {
    const CHUNK_SIZE = 8192;
    const binaryString = new TextEncoder().encode(input);
    const binaryLength = binaryString.length;
    let result = '';

    for (let index = 0; index < binaryLength; index += CHUNK_SIZE) {
      const chunk = binaryString.subarray(
        index,
        Math.min(index + CHUNK_SIZE, binaryLength),
      );
      // eslint-disable-next-line unicorn/prefer-spread
      const chunkString = String.fromCodePoint(...Array.from(chunk));
      result += btoa(chunkString);
    }

    return result;
  } catch (error) {
    console.error('Error encoding to base64:', error);
    return null;
  }
};
