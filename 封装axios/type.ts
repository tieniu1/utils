export interface IResult<T> {
  code: number;
  message: string;
  result: T ;
}
