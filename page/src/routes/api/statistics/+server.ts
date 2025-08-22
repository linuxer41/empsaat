import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { statisticsService } from '$lib/services';
import type { ApiResponse } from '$lib/types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const type = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    
    let data;
    
    switch (type) {
      case 'connection-requests':
        data = await statisticsService.getConnectionRequestStats();
        break;
      case 'problem-reports':
        data = await statisticsService.getProblemReportStats();
        break;
      case 'recent-activity':
        data = await statisticsService.getRecentActivity(limit);
        break;
      default:
        // Return all statistics
        const [connectionStats, problemStats, recentActivity] = await Promise.all([
          statisticsService.getConnectionRequestStats(),
          statisticsService.getProblemReportStats(),
          statisticsService.getRecentActivity(limit)
        ]);
        
        data = {
          connectionRequests: connectionStats,
          problemReports: problemStats,
          recentActivity: recentActivity
        };
    }
    
    return json<ApiResponse>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
};
