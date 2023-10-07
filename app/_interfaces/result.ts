export interface Result {
  title: string;
  message: string;
  type: ResultType;
  data: Object;
}

export enum ResultType {
  error = 0,
  success = 1,
  warning = 2,
  info = 3
}
