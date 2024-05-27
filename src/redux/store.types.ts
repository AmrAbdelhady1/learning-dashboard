export interface ApiResponse<
  DataType = { useInfo: any; storeInfo: any },
  ErrorType = any
> {
  data: DataType;
  error: ErrorType;
}
