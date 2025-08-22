import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { questionService } from '$lib/server/services';
import type { ApiResponse, CreateQuestionRequest } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: CreateQuestionRequest = await request.json();
    
    // Validate required fields
    if (!body.nombre || !body.email || !body.asunto || !body.mensaje) {
      return json<ApiResponse>({
        success: false,
        error: 'Todos los campos obligatorios deben ser completados'
      }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return json<ApiResponse>({
        success: false,
        error: 'Formato de email inválido'
      }, { status: 400 });
    }

    const question = await questionService.create(body);
    
    return json<ApiResponse>({
      success: true,
      data: question,
      message: 'Pregunta enviada exitosamente'
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};

export const GET: RequestHandler = async () => {
  try {
    const questions = await questionService.getAll();
    
    return json<ApiResponse>({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};
