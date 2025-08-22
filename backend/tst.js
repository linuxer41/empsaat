import { randomBytes } from "crypto";

// Prefijos para diferenciar servicios
const PREFIXES = {
  github: "empsaat",
  custom: "api",
};

// Función para generar un segmento seguro de la clave
function generateSegment(length = 6) {
  return randomBytes(length).toString("base64url").slice(0, length); // base64url evita caracteres especiales
}

// Función para generar una API Key al estilo GitHub/Docker
function generateApiKey(service = "custom") {
  const prefix = PREFIXES[service] || PREFIXES.custom;
  return `${prefix}_${generateSegment()}-${generateSegment()}_${generateSegment()}-${generateSegment()}`;
}

// Ejemplo de generación
console.log("GitHub API Key:", generateApiKey("empsaat"));
console.log("Docker API Key:", generateApiKey("docker"));
console.log("Custom API Key:", generateApiKey("custom"));
