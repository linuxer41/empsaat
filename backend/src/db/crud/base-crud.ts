import { BaseDB } from './base-db';

export class BaseCrud<
  MainSchema extends { id: string; createdAt: string | Date; updatedAt: string | Date },
  CreateSchema extends object,
  UpdateSchema extends object
> extends BaseDB {
  constructor(protected tableName: string) {
    super();
  }

  async create(data: CreateSchema): Promise<MainSchema> {
    const columns = Object.keys(data).join(', ');
    const values = Object.keys(data).map((key) => `@${key}`).join(', ');
    const sqlQuery = `INSERT INTO ${this.tableName} (${columns}) OUTPUT INSERTED.id VALUES (${values})`;
    const result = await this.executeQuery<{ id: string }>(sqlQuery, data);
    const _data = await this.findUnique({ id: result[0].id } as any);
    return _data!;
  }

  async findUnique(where: Partial<MainSchema>): Promise<MainSchema | null> {
    const conditions = Object.keys(where).map((key) => `${key} = @${key}`).join(' AND ');
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;
    const result = await this.executeQuery<MainSchema>(sqlQuery, where);
    return result[0] || null;
  }

  async findMany(where: Partial<MainSchema> = {}): Promise<MainSchema[]> {
    const conditions = Object.keys(where).length
      ? 'WHERE ' + Object.keys(where).map((key) => `${key} = @${key}`).join(' AND ')
      : '';
    const sqlQuery = `SELECT * FROM ${this.tableName} ${conditions}`;
    return this.executeQuery<MainSchema>(sqlQuery, where);
  }

  async update(where: Partial<MainSchema>, data: UpdateSchema): Promise<MainSchema | null> {
    if (Object.keys(where).length === 0) throw new Error("Debe proporcionar una condición para actualizar.");

    const setClause = Object.keys(data).map((key) => `${key} = @${key}`).join(', ');
    const conditions = Object.keys(where).map((key) => `${key} = @where_${key}`).join(' AND ');
    
    const sqlQuery = `
      UPDATE ${this.tableName} SET ${setClause} WHERE ${conditions};
      SELECT * FROM ${this.tableName} WHERE ${conditions};
    `;

    const values = {
      ...data,
      ...Object.fromEntries(Object.entries(where).map(([key, value]) => [`where_${key}`, value])),
    };

    const result = await this.executeQuery<MainSchema>(sqlQuery, values);
    return result[0] || null;
  }

  async delete(where: Partial<MainSchema>): Promise<MainSchema | null> {
    if (Object.keys(where).length === 0) throw new Error("Debe proporcionar una condición para eliminar.");

    const conditions = Object.keys(where).map((key) => `${key} = @${key}`).join(' AND ');
    const sqlQuery = `DELETE FROM ${this.tableName} OUTPUT DELETED.* WHERE ${conditions}`;
    
    const result = await this.executeQuery<MainSchema>(sqlQuery, where);
    return result[0] || null;
  }
}
