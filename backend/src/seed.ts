import { db } from './db';
import bcrypt from 'bcryptjs';
import { randomBytes } from "crypto";

function getUUID() {
  return crypto.randomUUID().toString();
}

function generateSegment(length = 6) {
  return randomBytes(length).toString("base64url").slice(0, length);
}

function generateApiKey() {
  const prefix = "empsaat";
  return `${prefix}_${generateSegment()}-${generateSegment()}_${generateSegment()}-${generateSegment()}`;
}

async function main() {


  // Verificar e insertar usuario por defecto
  const defaultUser = {
    id: getUUID(),
    name: "Usuario Admin",
    email: "admin@example.com",
    phone: "71307408",
    role: "admin",
    status: "active",
    password: await bcrypt.hash("password123", 10), // Generar contraseña con bcrypt
    // password: await Bun.password.hash("password123")
  };

  let user = await db.user.findUnique({ email: defaultUser.email });
  if (!user) {
    user = await db.user.create(defaultUser);
    console.log('Usuario por defecto creado', user);
  }

  // Crear API Keys por defecto
  const apiKeys = [
    {
      id: getUUID(),
      apiKey: generateApiKey(),
      owner: "admin@example.com",
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 año desde ahora
    },
    {
      id: getUUID(),
      apiKey: generateApiKey(),
      owner: "test@example.com",
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 año desde ahora
    }
  ];

  for (const apiKeyData of apiKeys) {
    const existingApiKey = await db.apiKey.findUnique({ owner: apiKeyData.owner });
    if (!existingApiKey) {
      const apiKey = await db.apiKey.create(apiKeyData);
      console.log('API Key creada:', apiKey);
    } else {
      console.log('API Key ya existe para:', apiKeyData.owner);
    }
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // await db.$disconnect();
    console.log('Seed finalizado');
    process.exit(0);
  });