import { MinLengthValidator, Validators } from "@angular/forms";
import { RegisterDTO } from "./RegisterDTO";
import { Validation } from "./validation";

export interface User {
  id: string;
  name: string;
  nickname: string;
  password: string;
  email: string;
  
}
export function ValidateUser(user: RegisterDTO): Validation {

  var ValidationResult: Validation = { message: "", error: false };

  validateName(user.name);
  if (ValidationResult.error)
    return ValidationResult;

  validateEmail(user.email);
  if (ValidationResult.error)
    return ValidationResult;

  validatePassword(user.password);
  if (ValidationResult.error)
  return ValidationResult;

  return ValidationResult;

  function validateName(name: string) {
    if (name == "")
      ValidationResult = { message: "El nombre no puede estar vacio", error: true };

    if (name.length < 5)
      ValidationResult = { message: "El nombre debe contener mas de 5 caracteres", error: true };
  }
  function validateEmail(email: string) {
    if (email == "")
      ValidationResult = { message: "El email no puede estar vacio", error: true };

    if (!/[_a-zA-Z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email))
      ValidationResult = { message: "El email no cumple con el formato", error: true };
  }
  function validatePassword(password: string) {
    if (password == "")
      ValidationResult = { message: "El password no puede estar vacio", error: true };
    //El password debe contener mas de 6 caracteres-cumple
    if (user.password.length < 6)
      ValidationResult = { message: "El password debe contener mas de 6 caracteres", error: true };
    //El password debe incluir numeros
    if (!/[0-9]+/.test(user.password))
      ValidationResult = { message: "El password debe incluir numeros", error: true };
    //El password debe tener letra mayuscula
    if (!/[A-Z]+/.test(user.password))
      ValidationResult = { message: "El password debe tener letra mayuscula", error: true };
  }
  
}