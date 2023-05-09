import * as t from 'io-ts';

// Custom codec that checks if a value is not undefined
export const notUndefined = <T extends t.Mixed>(
  type: T,
): t.Type<T['_A'], T['_O'], T['_I']> => {
  return new t.Type<T['_A'], T['_O'], T['_I']>(
    'NotUndefined',
    (input: unknown): input is T['_A'] => input !== undefined && type.is(input),
    (input, context) =>
      input !== undefined
        ? type.validate(input, context)
        : t.failure(input, context),
    t.identity,
  );
};
