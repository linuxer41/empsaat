import { getConnection } from '../connection';

export class BaseDB {
  async executeQuery<T>(sqlQuery: string, params: {[key: string]: any} = {}): Promise<T[]> {
    const pool = await getConnection();
    const request = pool.request();

    // params.forEach((param, index) => {
    //   request.input(`param${index + 1}`, param);
    // });
    Object.keys(params).forEach((key, index) => {
      request.input(`${key}`, params[key]);
    });

    try {
      console.debug(`Ejecutando consulta SQL:`, sqlQuery);
      const result = await request.query(sqlQuery);
      return result.recordset;
    } catch (error) {
      console.error(`Error en la consulta SQL :`, error);
      throw error;
    }
  }

}
