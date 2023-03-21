declare namespace Service {
  interface Response<T = any> {
    code: number;
    data: T;
    msg: string;
  }
}
