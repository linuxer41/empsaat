import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { tariffService } from '$lib/services';
import type { ApiResponse } from '$lib/types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const tipo = url.searchParams.get('tipo');
    
    if (tipo) {
      const tariff = await tariffService.getByType(tipo);
      if (!tariff) {
        return json<ApiResponse>({
          success: false,
          error: 'Tarifa no encontrada'
        }, { status: 404 });
      }
      
      return json<ApiResponse>({
        success: true,
        data: tariff
      });
    }
    
    const tariffs = await tariffService.getAll();
    
    return json<ApiResponse>({
      success: true,
      data: tariffs
    });
  } catch (error) {
    console.error('Error fetching tariffs:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};
