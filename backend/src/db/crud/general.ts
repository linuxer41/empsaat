import { Factura } from '../../models/extra';
import { BaseDB } from './base-db';

class GeneralDB extends BaseDB {
  constructor() {
    super();
  }

  /**
   * Obtiene las deudas actuales de un abonado específico.
   * @param abonadoId - El ID del abonado.
   * @returns Una lista de deudas del abonado.
   */
  async getDeudasByAbonado(abonadoId: number): Promise<Factura[]> {
    const sqlQuery = `
      SELECT 
        factura, emision, lectura, conM3, impFactura, fecPago, codigoControl, abonado 
      FROM 
        facturas 
      WHERE 
        abonado = @param1 AND fecPago IS NULL AND impFactura > 0
    `;
    return this.executeQuery<Factura>(sqlQuery, [abonadoId]);
  }

  /**
   * Calcula el total de servicios no cobrados para un abonado.
   * @param abonadoId - El ID del abonado.
   * @returns El total y el detalle de los servicios no cobrados.
   */
  async getTotalOtrosServicios(abonadoId: number): Promise<{ total: number; detalle: string }> {
    const sqlQuery = `
      SELECT 
        SUM(costo) AS imp, STRING_AGG(nota, '; ') AS detalle 
      FROM 
        serviciosSolicitud 
      WHERE 
        cobrado = 0 AND estado = '1' AND costo > 0 AND abonado = @param1
    `;
    const result = await this.executeQuery<{ imp: number; detalle: string }>(sqlQuery, [abonadoId]);
    const row = result[0];
    return {
      total: parseFloat(row?.imp.toString() || '0'),
      detalle: row?.detalle || '',
    };
  }

  /**
   * Obtiene el historial de facturas de un abonado.
   * @param abonadoId - El ID del abonado.
   * @returns Una lista del historial de facturas.
   */
  async getHistorialFacturas(abonadoId: number): Promise<any[]> {
    const sqlQuery = `
      SELECT TOP 5 
        factura, emision, lectura, conM3, impFactura, fecPago, codigoControl, abonado
      FROM 
        facturas 
      WHERE 
        abonado = @param1 AND factura < @param2 AND impFactura > 0 
      ORDER BY 
        factura DESC
    `;
    return this.executeQuery(sqlQuery, [abonadoId]);
  }

  /**
   * Genera un código QR para una factura específica.
   * @param codigoControl - El código de control de la factura.
   * @param numFactura - El número de la factura.
   * @param numAutorizacion - El número de autorización.
   * @param nit - El NIT del cliente.
   * @param importe - El importe total de la factura.
   * @returns El texto del código QR generado.
   */

  /**
   * Cancela una factura existente.
   * @param facturaId - El ID de la factura.
   * @returns La factura cancelada.
   */
  async cancelarFactura(facturaId: number): Promise<any | null> {
    const conditions = `factura = @param1`;
    const sqlQuery = `
      DELETE FROM facturas OUTPUT DELETED.* WHERE ${conditions};
    `;
    const result = await this.executeQuery<any>(sqlQuery, [facturaId]);
    return result[0] || null;
  }
}

export const generalDB = new GeneralDB();