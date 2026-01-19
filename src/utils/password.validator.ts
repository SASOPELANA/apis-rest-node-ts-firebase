import validator from "validator";

// Las reglas que debe cumplir la contraseña
export const PASSWORD_RULES = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

// Función que verifica si una contraseña es fuerte
export function isPasswordStrong(password: string): boolean {
  return validator.isStrongPassword(password, PASSWORD_RULES);
}

// Mensaje de error para mostrar al usuario
export const PASSWORD_ERROR_MESSAGE =
  "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
