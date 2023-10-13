import * as Yup from "yup";

export const CompanySchema = () =>
  Yup.object().shape({
    publicPlace: Yup.string().required("Informe o endereço"),
    number: Yup.string().required("Informe o número"),
    complement: Yup.string().required("Informe o complemento"),
    neighborhood: Yup.string().required("Informe o bairro"),
    cep: Yup.string().required("Informe o cep"),
    city: Yup.string().required("Informe a cidade"),
    state: Yup.string().length(2, "Selecione um estado").required("Selecione um estado"),
    email: Yup.string().required("Informe um e-mail").email("Informe um e-mail válido"),
    cvvCard: Yup.string().min(3, "Cvc teve conter 3 digitos no minimo").matches(/^\d+$/, "O Cvc do cartão deve conter apenas números").required("Informe seu Cvc"),
    cardExpiration: Yup.string().length(5, "Data de vencimento deve conter 4 digitos").required("Informe o vencimento do seu cartão"),
    cardName: Yup.string().required("Informe o nome do seu cartão"),
    cardNumber: Yup.string().length(19, "Número do cartão deve conter 16 digitos").required("Informe o número do seu cartão"),
  });
