export default interface apiResponse<T> {
  // this will be included in suggestions so if possible use the format if you know that.
  statusCode?: number;
  isSuccess?: boolean;
  errorMessages?: Array<string>;
  result: T;
  error?: any;
}