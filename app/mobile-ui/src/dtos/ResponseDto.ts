export type ResponseDto<T> = {
  data: T;
};

export type CreateIdResponse = ResponseDto<{id: string}>;