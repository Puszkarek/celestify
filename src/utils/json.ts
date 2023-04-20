import { flow, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';

export const safeJSONParse = <T>(jsonString: string): O.Option<T> => {
  return O.tryCatch(() => JSON.parse(jsonString) as T);
};

export const strictJSONParse = <T>(
  jsonString: string,
  predicate: (t: T) => t is T,
): O.Option<T> => {
  return pipe(
    O.tryCatch(() => JSON.parse(jsonString) as T),
    O.chain(O.fromPredicate(predicate)),
  );
};
