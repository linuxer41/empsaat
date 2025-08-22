import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { connectionRequestService } from '$lib/server/services';
import type { ApiResponse, CreateConnectionRequestRequest } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: CreateConnectionRequestRequest = await request.json();
    
    // Validate required fields
    if (!body.nombre || !body.telefono || !body.direccion || !body.tipo_conexion || !body.tipo_propiedad) {
      return json<ApiResponse>({
        success: false,
        error: 'Todos los campos obligatorios deben ser completados'
      }, { status: 400 });
    }

    const connectionRequest = await connectionRequestService.create(body);
    
    return json<ApiResponse>({
      success: true,
      data: connectionRequest,
      message: 'Solicitud de conexión creada exitosamente'
    });
  } catch (error) {
    console.error('Error creating connection request:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};

export const GET: RequestHandler = async () => {
  try {
    const connectionRequests = await connectionRequestService.getAll();
    
    return json<ApiResponse>({
      success: true,
      data: connectionRequests
    });
  } catch (error) {
    console.error('Error fetching connection requests:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};
