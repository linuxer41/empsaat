import { config } from 'dotenv';
import { initializeDatabase, testConnection } from '../src/lib/server/database.js';

// Load environment variables
config();

async function main() {
  try {
    console.log('🚀 Inicializando base de datos EMPSAAT...');
    
    // Test database connection
    console.log('📡 Probando conexión a la base de datos...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ No se pudo conectar a la base de datos');
      console.log('💡 Asegúrate de que:');
      console.log('   1. PostgreSQL esté ejecutándose');
      console.log('   2. La base de datos "empsaat_db" exista');
      console.log('   3. Las credenciales en .env sean correctas');
      process.exit(1);
    }
    
    console.log('✅ Conexión exitosa');
    
    // Initialize database schema
    console.log('🗄️  Creando esquema de base de datos...');
    await initializeDatabase();
    
    console.log('🎉 Base de datos inicializada exitosamente!');
    console.log('');
    console.log('📋 Tablas creadas:');
    console.log('   - users (usuarios)');
    console.log('   - connection_requests (solicitudes de conexión)');
    console.log('   - problem_reports (reportes de problemas)');
    console.log('   - questions (preguntas/consultas)');
    console.log('   - service_areas (zonas de servicio)');
    console.log('   - tariffs (tarifas)');
    console.log('   - audit_log (registro de auditoría)');
    console.log('');
    console.log('📊 Datos de ejemplo insertados:');
    console.log('   - Zonas de servicio de Tupiza');
    console.log('   - Tarifas básicas');
    console.log('');
    console.log('🚀 La aplicación está lista para usar!');
    
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    process.exit(1);
  }
}

main();
