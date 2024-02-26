export class RequestResult<T> {
    success: boolean;
    data: T;
    errorMessage: string;
  }