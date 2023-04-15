import * as t from 'io-ts';

export const errorDecoder = t.type({
  message: t.string,
});

export const exceptionDecoder = t.type({
  status: t.number,
  message: t.string,
});
