import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { problemReportService } from '$lib/services';
import type { ApiResponse, CreateProblemReportRequest } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: CreateProblemReportRequest = await request.json();
    
    // Validate required fields
    if (!body.nombre || !body.telefono || !body.direccion || !body.tipo_problema || !body.descripcion) {
      return json<ApiResponse>({
        success: false,
        error: 'Todos los campos obligatorios deben ser completados'
      }, { status: 400 });
    }

    const problemReport = await problemReportService.create(body);
    
    return json<ApiResponse>({
      success: true,
      data: problemReport,
      message: 'Reporte de problema creado exitosamente'
    });
  } catch (error) {
    console.error('Error creating problem report:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};

export const GET: RequestHandler = async () => {
  try {
    const problemReports = await problemReportService.getAll();
    
    return json<ApiResponse>({
      success: true,
      data: problemReports
    });
  } catch (error) {
    console.error('Error fetching problem reports:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};
