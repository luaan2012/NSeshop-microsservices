import { ResponseResult } from "./responseResult"

export interface User {
  name: string,
  email: string,
  cpf: string,
  password: string,
  passwordConf: string
}

export interface UserResp {
  acessToken: string,
  refreshToken: string,
  usuarioToken: UserToken,
  responseResult: ResponseResult
}

export interface UserToken {
  id: string,
  email: string,
  claims: UsuarioClaim[]
}

export interface UsuarioClaim {
  value: string,
  type: string
}
