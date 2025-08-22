import { Abonado, Cliente } from '../../models/subscriber';
import { BaseDB } from './base-db';

export class AbonadoDB extends BaseDB {
  constructor() {
    super();
  }
  

  /**
   * Obtiene las deudas actuales de un abonado específico.
   * @param offset - El número de registros desde el que se iniciarán a mostrar.
   * @param limit - El número de registros que se mostrarán.
   * @param search - La cadena de búsqueda.
   * @param abonado - El ID del abonado.
   */
  async list(
    offset: number,
    limit: number,
    search?: string,
    abonado?: number
  ): Promise<{ count: number; data: Abonado[] }> {
    const countQuery = `
      SELECT COUNT(*) as count
      FROM Usuarios
      WHERE (@search IS NULL OR nombre LIKE @search)
      AND (@abonado IS NULL OR abonado = @abonado);
    `;

    const dataQuery = `
      SELECT 
        abonado,
        nombre,
        nit,
        medidor,
        zona,
        calle,
        num,
        categoria,
        ley1886,
        estado
      FROM Usuarios
      WHERE (@search IS NULL OR nombre LIKE @search)
      AND (@abonado IS NULL OR abonado = @abonado)
      ORDER BY nombre DESC
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
    `;

    const params = {
      search: search ? `%${search}%` : null, // Agregar '%' para búsqueda parcial
      abonado: abonado || null,
      offset,
      limit
    };

    try {
      const countResult = await this.executeQuery<{ count: number }>(countQuery, params);
      const dataResult = await this.executeQuery<Abonado>(dataQuery, params);

      return {
        count: countResult[0]?.count || 0,
        data: dataResult
      };
    } catch (error) {
      console.error("Error ejecutando la consulta:", error);
      throw new Error("Error al obtener los datos de los usuarios.");
    }
  }

  // /**
  //  * Obtiene las deudas actuales de un abonado específico con paginación por cursor y orden dinámico.
  //  * @param limit - Número de registros a devolver.
  //  * @param cursor - Último valor del cursor (ID, fecha, etc.).
  //  * @param search - Texto de búsqueda.
  //  * @param abonado - ID del abonado (opcional).
  //  * @param orderBy - Columna por la que se ordenará (nombre, fecha_creacion, etc.).
  //  * @param orderDir - Dirección de ordenamiento ("ASC" o "DESC").
  //  */
  // async list(
  //   limit: number,
  //   cursor?: number | string, 
  //   search?: string,
  //   abonado?: number,
  //   orderBy: "nombre" | "fecha_creacion" = "nombre", // Orden por defecto: nombre
  //   orderDir: "ASC" | "DESC" = "ASC" // Dirección de orden por defecto: ASC
  // ): Promise<{ data: Abonado[]; totalCount: number; nextCursor?: any }> {
  //   const query = `
  //     WITH PagedData AS (
  //       SELECT 
  //         abonado,
  //         nombre,
  //         nit,
  //         medidor,
  //         zona,
  //         calle,
  //         num,
  //         categoria,
  //         ley1886,
  //         estado,
  //         fecha_creacion,
  //         COUNT(*) OVER () AS total_count
  //       FROM Usuarios
  //       WHERE (@search IS NULL OR nombre LIKE @search)
  //       AND (@abonado IS NULL OR abonado = @abonado)
  //       ${cursor ? `AND ${orderBy} ${orderDir === "ASC" ? ">" : "<"} @cursor` : ""}
  //     )
  //     SELECT TOP (@limit) *, total_count FROM PagedData
  //     ORDER BY ${orderBy} ${orderDir};
  //   `;

  //   const params = {
  //     search: search ? `%${search}%` : null, // Búsqueda parcial con LIKE
  //     abonado: abonado || null,
  //     cursor: cursor || null,
  //     limit,
  //   };

  //   try {
  //     const dataResult = await this.executeQuery(query, params);

  //     // Obtener el siguiente cursor basado en la columna de orden
  //     const nextCursor = dataResult.length > 0 
  //       ? dataResult[dataResult.length - 1][orderBy] 
  //       : undefined;

  //     // Extraer el total de registros (de la primera fila)
  //     const totalCount = dataResult.length > 0 ? dataResult[0].total_count : 0;

  //     return {
  //       data: dataResult,
  //       total: totalCount,
  //       nextCursor,
  //     };
  //   } catch (error) {
  //     console.error("Error ejecutando la consulta:", error);
  //     throw new Error("Error al obtener los datos de los usuarios.");
  //   }
  // }


  /**
   * Obtener un abonado.
   * @param abonado - El ID del abonado.
   */
  async get(abonado: number): Promise<Abonado> {
    const query = `
        SELECT TOP 1 
        abonado,
        nombre,
        nit,
        medidor,
        zona,
        calle,
        num,
        categoria,
        ley1886,
        estado
        FROM Usuarios
        WHERE abonado = @abonado
        ORDER BY Nombre DESC;
        `;
    return (await this.executeQuery<Abonado>(query, { abonado }))[0];
  }

  /**
   * Actualiza un abonado.
   * @param abonado - El ID del abonado.
   */
  async update(abonado: number, data: {correo: string}): Promise<void> {
    const query = `
      UPDATE 
        Usuarios
      SET 
        correo = @correo,
      WHERE 
        abonado = @abonado
      `;
      await this.executeQuery(query, { abonado, correo: data.correo });
  }
}

export const subscriberDB = new AbonadoDB();