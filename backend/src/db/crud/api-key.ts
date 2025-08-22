
import { BaseCrud } from './base-crud';
import { ApiKey, ApiKeyCreate, ApiKeyUpdate } from '../../models/api-key';

class ApiKeyCrud extends BaseCrud<ApiKey, ApiKeyCreate, ApiKeyUpdate> {
  constructor() {
    super('ApiKeys');
  }

  baseQuery() {
    return `
      select * 
      from ApiKeys  
    `;
  }
}

export const apiKeyCrud = new ApiKeyCrud()
