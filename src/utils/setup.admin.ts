import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "../model/user.model.js";
import {
  isPasswordStrong,
  PASSWORD_ERROR_MESSAGE,
} from "./password.validator.js";

export async function ensureAdminExists() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // PASO 1: Verificar que las variables de entorno estén configuradas
  if (!adminEmail || !adminPassword) {
    console.log(
      "El admin y el password son obligatorios. Verifique el archivo .env",
    );
    return;
  }

  // PASO 2: Verificar que la contraseña sea fuerte
  if (!isPasswordStrong(adminPassword)) {
    console.error(`❌ ${PASSWORD_ERROR_MESSAGE}`);
    console.error("🔒 No se creó el admin porque la contraseña es débil.");
    return;
  }

  // PASO 3: Verificar si el admin ya existe en Firestore
  try {
    const existingAdmin = await findUserByEmail(adminEmail);

    if (existingAdmin) {
      console.log(`ℹ️  El admin ${adminEmail} ya existe. Todo bien!`);
      return;
    }

    // PASO 4: Crear el usuario administrador si no existe
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await createUser(adminEmail, hashedPassword);
    console.log(`✅ Usuario administrador creado: ${adminEmail}`);
  } catch (error: any) {
    console.error("❌ Error al verificar/crear admin:", error.message);
  }
}
