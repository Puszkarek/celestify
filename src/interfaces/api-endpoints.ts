import { topItemsResponseDecoder } from '@app/decoders/api-endpoints';
import * as t from 'io-ts';

// * Endpoints

export type TopItemsResponse = t.TypeOf<typeof topItemsResponseDecoder>;
