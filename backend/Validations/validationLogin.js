import * as yup from 'yup';

const validationLogin = yup.object().shape({
  email: yup .string() .email("E-mail inválido").required("O campo e-mail é obrigatório")
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "E-mail inválido, deve conter um @ e um domínio válido"
  ) .test(
    "valid-domain",
    "O domínio do e-mail não é válido",
    (value) => {
      if (!value) return false;
      const validDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
      const domain = value.split("@")[1];
      return validDomains.includes(domain); // Verifica se o domínio é permitido
    }
  ),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default validationLogin;
