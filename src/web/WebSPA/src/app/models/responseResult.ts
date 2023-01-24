export interface ResponseResult {
  title: string,
  status: string,
  errors: ResponseErrosMessages
}

export interface ResponseErrosMessages {
  messages: string[]
}
