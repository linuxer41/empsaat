import { db } from './db';

function getUUID() {
  return crypto.randomUUID().toString();
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
    // password: await bcrypt.hash("password123", 10), // Generar contraseña con bcrypt
    password: await Bun.password.hash("password123")
  };

  let user = await db.user.findUnique({ email: defaultUser.email });
  if (!user) {
    user = await db.user.create(defaultUser);
    console.log('Usuario por defecto creado', user);
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