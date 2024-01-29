export const validator = ({
  firstName,
  lastName,
  email,
  DNI,
  phone1,
  password,
}) => {
  const regexName = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?\\|\/~-]/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPhone = /^\+[0-9]{1,3}-?[0-9]+$/;
  const regexPass = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
  const error = {
    firstName: "",
    lastName: "",
    email: "",
    phone1: "",
    password: "",
    username: "",
  };
  //? VALIDACION DE NOMBRE
  if (firstName.length < 2 && firstName.length > 0) {
    error.firstName = "El nombre tiene que tener mas de 1 letras.";
  }
  if (regexName.test(firstName)) {
    error.firstName = "El nombre no puede contener simbolos numeros.";
  }
  //? VALIDACION DE APELLIDO
  if (lastName.length < 2 && lastName.length > 0) {
    error.lastName = "El apellido tiene que tener mas de 1 letras.";
  }
  if (regexName.test(lastName)) {
    error.lastName = "El apellido no puede contener simbolos numeros.";
  }
  //? VALIDACION DE EMAIL
  if (!regexEmail.test(email) && email.length > 0) {
    error.email = "Este email no es valido.";
  }
  //? VALIDACION DE TELEFONO
  if (!regexPhone.test(phone1) && phone1.length > 0) {
    error.phone1 = "Este numero no es valido.";
  }
  if (!regexPass.test(password) && password.length > 0) {
    error.password =
      "Las contraseñas deben tener al menos una longitud de 8 caracteres. Las contraseñas deben tener al menos 1 dígito(s). Las contraseñas deben tener al menos 1 caracter(es) no alfanumérico(s) como *,-, o #.";
  }

  return error;
};
