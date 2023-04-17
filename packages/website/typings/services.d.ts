declare namespace Service {
  type Response<T = any> = {
    code: number;
    data: T;
    msg: string;
  };
}
