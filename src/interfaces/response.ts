export type ResponseData<T> = {
  data: T;
};

export type ResponseError = {
  errors: Array<string>;
};
