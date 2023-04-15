import { exceptionDecoder } from '@app/app/decoders/error';
import * as t from 'io-ts';

export type Exception = t.TypeOf<typeof exceptionDecoder>;
