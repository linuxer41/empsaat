-- Elimina la tabla si ya existe
DROP TABLE IF EXISTS Users;

-- Crea la tabla nuevamente
CREATE TABLE Users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),      -- Identificador único (UUID) generado automáticamente
    name NVARCHAR(255) NOT NULL,                          -- Nombre completo del usuario
    email NVARCHAR(255) NOT NULL,                         -- Correo electrónico del usuario
    phone NVARCHAR(255) NOT NULL,                         -- Teléfono del usuario
    role NVARCHAR(255) NOT NULL DEFAULT 'user',           -- Rol del usuario (user, admin)
    status NVARCHAR(255) NOT NULL DEFAULT 'active',       -- Estado del usuario (active, inactive)
    password NVARCHAR(255) NOT NULL,                      -- Contraseña encriptada del usuario
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),        -- Fecha de creación del registro, con valor predeterminado
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()         -- Fecha de última actualización del registro, con valor predeterminado
);

-- Opcional: Agregar un índice único en el correo electrónico para garantizar que no se repitan
CREATE UNIQUE INDEX idx_email ON Users (email);


CREATE TABLE ApiKeys (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),  -- Identificador único de la clave API
    apiKey NVARCHAR(255) NOT NULL UNIQUE,             -- Clave API única
    isActive BIT NOT NULL DEFAULT 1,                  -- Indica si la clave está activa (1) o inactiva (0)
    owner NVARCHAR(255) NOT NULL,                    -- Identificador único del usuario que tiene la clave API
    expiresAt DATETIME NOT NULL DEFAULT DATEADD(YEAR, 1, GETDATE()),        -- Fecha de expiración de la clave API
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),    -- Fecha de creación de la clave
    updatedAt DATETIME NOT NULL DEFAULT GETDATE(), 
)

CREATE UNIQUE INDEX idx_apiKey ON ApiKeys (apiKey);
CREATE UNIQUE INDEX idx_owner ON ApiKeys (owner);
