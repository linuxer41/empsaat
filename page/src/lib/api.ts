import type { 
  CreateConnectionRequestRequest, 
  CreateProblemReportRequest, 
  CreateQuestionRequest,
  ApiResponse 
} from './types';

const API_BASE = '/api';

// Generic API client function
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error en la solicitud');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Connection Requests API
export const connectionRequestsApi = {
  async create(data: CreateConnectionRequestRequest) {
    return apiRequest('/connection-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getAll() {
    return apiRequest('/connection-requests');
  },

  async getByTicketNumber(ticketNumber: string) {
    return apiRequest(`/connection-requests/${ticketNumber}`);
  }
};

// Problem Reports API
export const problemReportsApi = {
  async create(data: CreateProblemReportRequest) {
    return apiRequest('/problem-reports', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getAll() {
    return apiRequest('/problem-reports');
  },

  async getByTicketNumber(ticketNumber: string) {
    return apiRequest(`/problem-reports/${ticketNumber}`);
  }
};

// Questions API
export const questionsApi = {
  async create(data: CreateQuestionRequest) {
    return apiRequest('/questions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getAll() {
    return apiRequest('/questions');
  }
};

// Tariffs API
export const tariffsApi = {
  async getAll() {
    return apiRequest('/tariffs');
  },

  async getByType(tipo: string) {
    return apiRequest(`/tariffs?tipo=${encodeURIComponent(tipo)}`);
  }
};

// Statistics API
export const statisticsApi = {
  async getAll(limit: number = 10) {
    return apiRequest(`/statistics?limit=${limit}`);
  },

  async getConnectionRequestStats() {
    return apiRequest('/statistics?type=connection-requests');
  },

  async getProblemReportStats() {
    return apiRequest('/statistics?type=problem-reports');
  },

  async getRecentActivity(limit: number = 10) {
    return apiRequest(`/statistics?type=recent-activity&limit=${limit}`);
  }
};
