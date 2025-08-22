// Database entity types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface ConnectionRequest {
  id: string;
  ticket_number: string;
  nombre: string;
  telefono: string;
  email?: string;
  direccion: string;
  tipo_conexion: string;
  tipo_propiedad: string;
  comentarios?: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assigned_to?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProblemReport {
  id: string;
  ticket_number: string;
  nombre: string;
  telefono: string;
  direccion: string;
  tipo_problema: string;
  descripcion: string;
  urgencia: 'normal' | 'urgente' | 'emergencia';
  status: 'reported' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  assigned_to?: string;
  resolved_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Question {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
  status: 'pending' | 'responded' | 'closed';
  responded_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ServiceArea {
  id: string;
  nombre: string;
  descripcion?: string;
  zona_cobertura?: string;
  created_at: Date;
}

export interface Tariff {
  id: string;
  tipo_conexion: string;
  descripcion?: string;
  precio: number;
  moneda: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AuditLog {
  id: string;
  table_name: string;
  record_id: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  old_values?: any;
  new_values?: any;
  user_id?: string;
  created_at: Date;
}

// API Request/Response types
export interface CreateConnectionRequestRequest {
  nombre: string;
  telefono: string;
  email?: string;
  direccion: string;
  tipo_conexion: string;
  tipo_propiedad: string;
  comentarios?: string;
}

export interface CreateProblemReportRequest {
  nombre: string;
  telefono: string;
  direccion: string;
  tipo_problema: string;
  descripcion: string;
  urgencia?: 'normal' | 'urgente' | 'emergencia';
}

export interface CreateQuestionRequest {
  nombre: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form data types
export interface ConnectionFormData {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  tipoConexion: string;
  tipoPropiedad: string;
  documentos: File[];
  comentarios: string;
}

export interface ProblemFormData {
  nombre: string;
  telefono: string;
  direccion: string;
  tipoProblema: string;
  descripcion: string;
  urgencia: 'normal' | 'urgente' | 'emergencia';
}
