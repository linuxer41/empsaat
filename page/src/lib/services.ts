import pool from './database';
import type { 
  ConnectionRequest, 
  ProblemReport, 
  Question, 
  ServiceArea, 
  Tariff,
  CreateConnectionRequestRequest,
  CreateProblemReportRequest,
  CreateQuestionRequest
} from './types';

// Utility function to generate ticket numbers
function generateTicketNumber(prefix: string): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

// Connection Requests Services
export const connectionRequestService = {
  async create(data: CreateConnectionRequestRequest): Promise<ConnectionRequest> {
    const ticketNumber = generateTicketNumber('CON');
    
    const query = `
      INSERT INTO connection_requests (
        ticket_number, nombre, telefono, email, direccion, 
        tipo_conexion, tipo_propiedad, comentarios
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [
      ticketNumber,
      data.nombre,
      data.telefono,
      data.email,
      data.direccion,
      data.tipo_conexion,
      data.tipo_propiedad,
      data.comentarios
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAll(): Promise<ConnectionRequest[]> {
    const query = 'SELECT * FROM connection_requests ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async getById(id: string): Promise<ConnectionRequest | null> {
    const query = 'SELECT * FROM connection_requests WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  async getByTicketNumber(ticketNumber: string): Promise<ConnectionRequest | null> {
    const query = 'SELECT * FROM connection_requests WHERE ticket_number = $1';
    const result = await pool.query(query, [ticketNumber]);
    return result.rows[0] || null;
  },

  async updateStatus(id: string, status: string): Promise<ConnectionRequest> {
    const query = 'UPDATE connection_requests SET status = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }
};

// Problem Reports Services
export const problemReportService = {
  async create(data: CreateProblemReportRequest): Promise<ProblemReport> {
    const ticketNumber = generateTicketNumber('EMP');
    
    const query = `
      INSERT INTO problem_reports (
        ticket_number, nombre, telefono, direccion, 
        tipo_problema, descripcion, urgencia
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      ticketNumber,
      data.nombre,
      data.telefono,
      data.direccion,
      data.tipo_problema,
      data.descripcion,
      data.urgencia || 'normal'
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAll(): Promise<ProblemReport[]> {
    const query = 'SELECT * FROM problem_reports ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async getById(id: string): Promise<ProblemReport | null> {
    const query = 'SELECT * FROM problem_reports WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  async getByTicketNumber(ticketNumber: string): Promise<ProblemReport | null> {
    const query = 'SELECT * FROM problem_reports WHERE ticket_number = $1';
    const result = await pool.query(query, [ticketNumber]);
    return result.rows[0] || null;
  },

  async updateStatus(id: string, status: string): Promise<ProblemReport> {
    const query = 'UPDATE problem_reports SET status = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  },

  async resolve(id: string): Promise<ProblemReport> {
    const query = `
      UPDATE problem_reports 
      SET status = 'resolved', resolved_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

// Questions Services
export const questionService = {
  async create(data: CreateQuestionRequest): Promise<Question> {
    const query = `
      INSERT INTO questions (nombre, email, telefono, asunto, mensaje)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [
      data.nombre,
      data.email,
      data.telefono,
      data.asunto,
      data.mensaje
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAll(): Promise<Question[]> {
    const query = 'SELECT * FROM questions ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async getById(id: string): Promise<Question | null> {
    const query = 'SELECT * FROM questions WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  async respond(id: string): Promise<Question> {
    const query = `
      UPDATE questions 
      SET status = 'responded', responded_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

// Service Areas Services
export const serviceAreaService = {
  async getAll(): Promise<ServiceArea[]> {
    const query = 'SELECT * FROM service_areas ORDER BY nombre';
    const result = await pool.query(query);
    return result.rows;
  },

  async getById(id: string): Promise<ServiceArea | null> {
    const query = 'SELECT * FROM service_areas WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
};

// Tariffs Services
export const tariffService = {
  async getAll(): Promise<Tariff[]> {
    const query = 'SELECT * FROM tariffs WHERE activo = true ORDER BY tipo_conexion';
    const result = await pool.query(query);
    return result.rows;
  },

  async getByType(tipo: string): Promise<Tariff | null> {
    const query = 'SELECT * FROM tariffs WHERE tipo_conexion = $1 AND activo = true';
    const result = await pool.query(query, [tipo]);
    return result.rows[0] || null;
  },

  async getById(id: string): Promise<Tariff | null> {
    const query = 'SELECT * FROM tariffs WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
};

// Statistics Services
export const statisticsService = {
  async getConnectionRequestStats() {
    const query = `
      SELECT 
        status,
        COUNT(*) as count,
        COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
      FROM connection_requests 
      GROUP BY status
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async getProblemReportStats() {
    const query = `
      SELECT 
        status,
        urgencia,
        COUNT(*) as count
      FROM problem_reports 
      GROUP BY status, urgencia
      ORDER BY status, urgencia
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async getRecentActivity(limit: number = 10) {
    const query = `
      (SELECT 
        'connection_request' as type,
        ticket_number,
        nombre,
        created_at,
        status
       FROM connection_requests
       ORDER BY created_at DESC
       LIMIT $1)
      UNION ALL
      (SELECT 
        'problem_report' as type,
        ticket_number,
        nombre,
        created_at,
        status
       FROM problem_reports
       ORDER BY created_at DESC
       LIMIT $1)
      ORDER BY created_at DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }
};
