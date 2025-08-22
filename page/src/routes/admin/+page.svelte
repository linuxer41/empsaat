<script lang="ts">
  import { onMount } from 'svelte';
  import { connectionRequestsApi, problemReportsApi, statisticsApi } from '$lib/api';
  import type { ConnectionRequest, ProblemReport } from '$lib/types';
  import { 
    Droplets, 
    AlertCircle, 
    Users, 
    TrendingUp, 
    Clock, 
    CheckCircle, 
    XCircle,
    RefreshCw
  } from 'lucide-svelte';

  let connectionRequests: ConnectionRequest[] = [];
  let problemReports: ProblemReport[] = [];
  let statistics: any = {};
  let loading = true;
  let error = '';

  async function loadData() {
    try {
      loading = true;
      error = '';
      
      const [connRes, probRes, statsRes] = await Promise.all([
        connectionRequestsApi.getAll(),
        problemReportsApi.getAll(),
        statisticsApi.getAll(5)
      ]);

      if (connRes.success) connectionRequests = connRes.data || [];
      if (probRes.success) problemReports = probRes.data || [];
      if (statsRes.success) statistics = statsRes.data || {};
      
    } catch (err) {
      console.error('Error loading data:', err);
      error = 'Error al cargar los datos';
    } finally {
      loading = false;
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'pending':
      case 'reported':
        return 'text-yellow-600 bg-yellow-100';
      case 'approved':
      case 'in_progress':
      case 'assigned':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
      case 'closed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      case 'in_progress': return 'En Progreso';
      case 'completed': return 'Completado';
      case 'reported': return 'Reportado';
      case 'assigned': return 'Asignado';
      case 'resolved': return 'Resuelto';
      case 'closed': return 'Cerrado';
      default: return status;
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onMount(() => {
    loadData();
  });
</script>

<svelte:head>
  <title>Panel de Administración - EMPSAAT</title>
  <meta name="description" content="Panel de administración para gestionar solicitudes y reportes">
</svelte:head>

<main class="admin-dashboard">
  <div class="container">
    <header class="dashboard-header">
      <h1>Panel de Administración</h1>
      <button on:click={loadData} class="refresh-btn" disabled={loading}>
        <RefreshCw size={20} class:rotate={loading} />
        Actualizar
      </button>
    </header>

    {#if error}
      <div class="error-message">
        <AlertCircle size={20} />
        {error}
      </div>
    {/if}

    {#if loading}
      <div class="loading">
        <RefreshCw size={32} class="animate-spin" />
        <p>Cargando datos...</p>
      </div>
    {:else}
      <!-- Statistics Cards -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <Droplets size={24} />
            </div>
            <div class="stat-content">
              <h3>Solicitudes de Conexión</h3>
              <p class="stat-number">{connectionRequests.length}</p>
              <p class="stat-label">Total de solicitudes</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div class="stat-content">
              <h3>Reportes de Problemas</h3>
              <p class="stat-number">{problemReports.length}</p>
              <p class="stat-label">Total de reportes</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <Clock size={24} />
            </div>
            <div class="stat-content">
              <h3>Pendientes</h3>
              <p class="stat-number">
                {connectionRequests.filter(r => r.status === 'pending').length + 
                 problemReports.filter(r => r.status === 'reported').length}
              </p>
              <p class="stat-label">Requieren atención</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div class="stat-content">
              <h3>Completados</h3>
              <p class="stat-number">
                {connectionRequests.filter(r => r.status === 'completed').length + 
                 problemReports.filter(r => r.status === 'resolved').length}
              </p>
              <p class="stat-label">Procesados exitosamente</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Connection Requests -->
      <section class="data-section">
        <h2>Solicitudes de Conexión</h2>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {#each connectionRequests.slice(0, 10) as request}
                <tr>
                  <td class="ticket-number">{request.ticket_number}</td>
                  <td>{request.nombre}</td>
                  <td>{request.telefono}</td>
                  <td>{request.tipo_conexion}</td>
                  <td>
                    <span class="status-badge {getStatusColor(request.status)}">
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td>{formatDate(request.created_at)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Problem Reports -->
      <section class="data-section">
        <h2>Reportes de Problemas</h2>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Tipo</th>
                <th>Urgencia</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {#each problemReports.slice(0, 10) as report}
                <tr>
                  <td class="ticket-number">{report.ticket_number}</td>
                  <td>{report.nombre}</td>
                  <td>{report.telefono}</td>
                  <td>{report.tipo_problema}</td>
                  <td>
                    <span class="urgency-badge {report.urgencia === 'emergencia' ? 'bg-red-100 text-red-800' : 
                                                   report.urgencia === 'urgente' ? 'bg-orange-100 text-orange-800' : 
                                                   'bg-green-100 text-green-800'}">
                      {report.urgencia}
                    </span>
                  </td>
                  <td>
                    <span class="status-badge {getStatusColor(report.status)}">
                      {getStatusText(report.status)}
                    </span>
                  </td>
                  <td>{formatDate(report.created_at)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
    {/if}
  </div>
</main>

<style>
  .admin-dashboard {
    padding: 2rem 0;
    background: rgb(var(--color-gray-50));
    min-height: 100vh;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .dashboard-header h1 {
    font-size: 2rem;
    font-weight: 800;
    color: rgb(var(--color-gray-900));
  }

  .refresh-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgb(var(--color-primary));
    color: rgb(var(--color-white));
    border: none;
    border-radius: var(--radius-lg);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition);
  }

  .refresh-btn:hover:not(:disabled) {
    background: rgb(var(--color-primary-dark));
    transform: translateY(-1px);
  }

  .refresh-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .rotate {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgb(var(--color-error), 0.1);
    color: rgb(var(--color-error));
    border: 1px solid rgb(var(--color-error), 0.2);
    border-radius: var(--radius-lg);
    margin-bottom: 2rem;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 4rem 0;
    color: rgb(var(--color-gray-600));
  }

  .stats-section {
    margin-bottom: 3rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: rgb(var(--color-white));
    padding: 1.5rem;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgb(var(--color-gray-200));
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-icon {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(var(--color-white));
  }

  .stat-content h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(var(--color-gray-600));
    margin-bottom: 0.25rem;
  }

  .stat-number {
    font-size: 1.5rem;
    font-weight: 800;
    color: rgb(var(--color-gray-900));
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.75rem;
    color: rgb(var(--color-gray-500));
  }

  .data-section {
    background: rgb(var(--color-white));
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgb(var(--color-gray-200));
    margin-bottom: 2rem;
    overflow: hidden;
  }

  .data-section h2 {
    padding: 1.5rem;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: rgb(var(--color-gray-900));
    border-bottom: 1px solid rgb(var(--color-gray-200));
  }

  .table-container {
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
  }

  .data-table th,
  .data-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgb(var(--color-gray-200));
  }

  .data-table th {
    background: rgb(var(--color-gray-50));
    font-weight: 600;
    color: rgb(var(--color-gray-700));
    font-size: 0.875rem;
  }

  .data-table td {
    font-size: 0.875rem;
    color: rgb(var(--color-gray-600));
  }

  .ticket-number {
    font-family: monospace;
    font-weight: 600;
    color: rgb(var(--color-primary));
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .urgency-badge {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .data-table {
      font-size: 0.75rem;
    }

    .data-table th,
    .data-table td {
      padding: 0.75rem 0.5rem;
    }
  }
</style>
