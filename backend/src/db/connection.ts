import {ConnectionPool} from 'mssql';

// Configuración de la conexión usando connection string o parámetros individuales
const connectionString = process.env.DB_CONNECTION_STRING!;
const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'yourStrong(!)Password',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'parking',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  options: {
    encrypt: true, // Requerido para Azure SQL, cambiar a false si no es necesario
    trustServerCertificate: true, // Útil para entornos de desarrollo
  },
  pool: {
    max: 20,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const parsedConfig = ConnectionPool.parseConnectionString(connectionString);
parsedConfig.pool = {
  max: 20,
  min: 0,
  idleTimeoutMillis: 30000,
};

console.log('parsedConfig', parsedConfig);

console.log('config', config);

// Crear el pool de conexiones
const pool = new ConnectionPool(parsedConfig);
const poolConnect = pool.connect()
  .then(() => console.log('Conexión establecida correctamente a SQL Server'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Función para obtener una conexión
async function getConnection() {
  await poolConnect; // Asegurar que el pool está conectado antes de usarlo
  return pool;
}

// Función para ejecutar una consulta
async function query(sqlQuery: string, params: any[] = []) {
  const pool = await getConnection();
  try {
    const request = pool.request();
    
    // Asignar parámetros si los hay
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });
    
    const result = await request.query(sqlQuery);
    return result.recordset;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  }
}

// Exportar el pool y las funciones
export {
  pool,
  getConnection,
  query,
};
