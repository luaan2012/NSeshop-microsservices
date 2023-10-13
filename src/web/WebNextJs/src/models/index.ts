import { ValidCpf, validateEmail } from "@/utils";
import * as Yup from "yup";

export const SignUpScheme = () =>
  Yup.object().shape({
    name: Yup.string().min(3, "Nome inválido").required("Campo obrigatório."),
    cpf: Yup.string()
      .min(8, "O CPF digitado é inválido.")
      .required("Campo obrigatório.")
      .test("cpf", "O CPF digitado é inválido.", function (value: any) {
        return ValidCpf(value);
      }),
    password: Yup.string()
      .min(6, "Senha muito curta!")
      .required("Campo obrigatório.")
      .oneOf([Yup.ref("passwordConfirm")], "As senhas devem ser iguais"),
    passwordConfirm: Yup.string()
      .min(6, "Muito curto!")
      .required("Campo obrigatório.")
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
  });

export const SignInSchema = () =>
  Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório."),
    password: Yup.string().required("Campo obrigatório."),
  });
