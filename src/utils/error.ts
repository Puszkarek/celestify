import { exceptionDecoder } from '@app/decoders/error';
import { Exception } from '@app/interfaces/error';
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import { Errors } from 'io-ts';

export const createException = (
  message: string,
  status: HTTP_STATUS_CODE = HTTP_STATUS_CODE.BadRequest,
): Exception => ({
  status,
  message,
});

export const extractException = (error: unknown): Exception => {
  if (error instanceof Error) {
    return {
      status: HTTP_STATUS_CODE.BadRequest,
      message: error.message,
    };
  }

  if (exceptionDecoder.is(error)) {
    return error;
  }

  return {
    status: HTTP_STATUS_CODE.BadRequest,
    message: 'Unknown Exception',
  };
};

export const codecErrorsToException = (errors: Errors): Exception => {
  return {
    status: HTTP_STATUS_CODE.BadRequest,
    message: errors.map((error) => error.message).join('::'),
  };
};

export const extractError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === 'string') {
    return new Error(error);
  }

  if (exceptionDecoder.is(error)) {
    return new Error(error.message);
  }

  return new Error('Unknown Exception');
};
