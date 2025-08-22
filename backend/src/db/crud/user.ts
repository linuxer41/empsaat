
import { BaseCrud } from './base-crud';
import { User, UserCreate, UserUpdate } from '../../models/user';

class UserCrud extends BaseCrud<User, UserCreate, UserUpdate> {
  constructor() {
    super('Users');
  }

  baseQuery() {
    return `
      select Users.* 
      from Users  
    `;
  }
}

export const userCrud = new UserCrud()
