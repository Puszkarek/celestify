import { exceptionDecoder } from '@app/app/decoders/error';
import { Exception } from '@app/interfaces/error';
import { HTTP_STATUS_CODE } from '@app/interfaces/http';

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
