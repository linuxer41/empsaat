# EMPSAAT - Sistema de Gestión de Agua Potable

Sistema web para la gestión de solicitudes de conexión, reportes de problemas y consultas del servicio de agua potable en Tupiza, Bolivia.

## 🚀 Características

- **Solicitudes de Conexión**: Formulario para solicitar nuevas conexiones de agua
- **Reportes de Problemas**: Sistema para reportar problemas con el servicio
- **Consultas**: Formulario para preguntas generales
- **Base de Datos PostgreSQL**: Almacenamiento persistente de datos
- **API REST**: Endpoints para gestión de datos
- **Interfaz Moderna**: Diseño responsive y accesible

## 🛠️ Tecnologías

- **Frontend**: SvelteKit + TypeScript
- **Backend**: SvelteKit API Routes
- **Base de Datos**: PostgreSQL
- **ORM**: node-postgres (pg)
- **UI**: Lucide Icons + CSS Custom Properties

## 📋 Requisitos Previos

- Node.js 18+ 
- PostgreSQL 12+
- npm o yarn

## 🗄️ Configuración de la Base de Datos

### 1. Instalar PostgreSQL

**Windows:**
```bash
# Descargar desde https://www.postgresql.org/download/windows/
# O usar Chocolatey:
choco install postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Crear Base de Datos

```bash
# Conectar a PostgreSQL
sudo -u postgres psql

# Crear base de datos
CREATE DATABASE empsaat_db;

# Crear usuario (opcional)
CREATE USER empsaat_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE empsaat_db TO empsaat_user;

# Salir
\q
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/empsaat_db

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Reemplazar:**
- `username`: Tu usuario de PostgreSQL
- `password`: Tu contraseña de PostgreSQL
- `localhost:5432`: Host y puerto de tu PostgreSQL

## 🚀 Instalación y Configuración

### 1. Clonar e Instalar Dependencias

```bash
git clone <repository-url>
cd page
npm install
```

### 2. Inicializar Base de Datos

```bash
npm run init-db
```

Este comando:
- Prueba la conexión a la base de datos
- Crea todas las tablas necesarias
- Inserta datos de ejemplo (zonas de servicio, tarifas)
- Configura triggers y funciones

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📊 Estructura de la Base de Datos

### Tablas Principales

- **`connection_requests`**: Solicitudes de conexión
- **`problem_reports`**: Reportes de problemas
- **`questions`**: Consultas/preguntas
- **`users`**: Usuarios del sistema (futuro)
- **`service_areas`**: Zonas de cobertura
- **`tariffs`**: Tarifas de servicios
- **`audit_log`**: Registro de auditoría

### Índices y Optimizaciones

- Índices en campos de búsqueda frecuente
- Triggers para actualización automática de timestamps
- Constraints de integridad referencial

## 🔌 API Endpoints

### Solicitudes de Conexión
- `POST /api/connection-requests` - Crear solicitud
- `GET /api/connection-requests` - Listar solicitudes

### Reportes de Problemas
- `POST /api/problem-reports` - Crear reporte
- `GET /api/problem-reports` - Listar reportes

### Consultas
- `POST /api/questions` - Enviar consulta
- `GET /api/questions` - Listar consultas

### Tarifas
- `GET /api/tariffs` - Listar tarifas
- `GET /api/tariffs?tipo=residencial` - Obtener tarifa específica

### Estadísticas
- `GET /api/statistics` - Estadísticas generales
- `GET /api/statistics?type=connection-requests` - Stats de conexiones
- `GET /api/statistics?type=problem-reports` - Stats de problemas

## 🧪 Comandos Útiles

```bash
# Probar conexión a base de datos
npm run db:test

# Inicializar base de datos
npm run init-db

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Verificar tipos TypeScript
npm run check

# Formatear código
npm run format
```

## 📁 Estructura del Proyecto

```
src/
├── lib/
│   ├── database.ts          # Configuración de base de datos
│   ├── services.ts          # Lógica de negocio
│   ├── api.ts              # Cliente API para frontend
│   ├── types.ts            # Tipos TypeScript
│   └── schema.sql          # Esquema de base de datos
├── routes/
│   ├── api/                # Endpoints de la API
│   │   ├── connection-requests/
│   │   ├── problem-reports/
│   │   ├── questions/
│   │   ├── tariffs/
│   │   └── statistics/
│   ├── solicitar-conexion/ # Página de solicitudes
│   ├── reportar-problema/  # Página de reportes
│   └── tarifas/           # Página de tarifas
└── components/            # Componentes reutilizables
```

## 🔧 Configuración de Producción

### Variables de Entorno de Producción

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/empsaat_db
JWT_SECRET=very-secure-jwt-secret
```

### Construir y Desplegar

```bash
npm run build
npm run preview
```

## 🐛 Solución de Problemas

### Error de Conexión a Base de Datos

1. Verificar que PostgreSQL esté ejecutándose
2. Confirmar credenciales en `.env`
3. Verificar que la base de datos existe
4. Probar conexión: `npm run db:test`

### Error de Permisos

```bash
# En Linux/macOS, dar permisos al usuario postgres
sudo -u postgres createuser --interactive
```

### Puerto Ocupado

```bash
# Cambiar puerto en .env
PORT=3001
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@empsaat.com
- Teléfono: +591 2 694-1234
- Oficina: Tupiza, Bolivia
