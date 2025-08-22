<script lang="ts">
  import SecondaryHeader from '$lib/components/SecondaryHeader.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { AlertCircle, Phone, MapPin, Clock, CheckCircle } from 'lucide-svelte';

  let formData = {
    nombre: '',
    telefono: '',
    direccion: '',
    tipoProblema: '',
    descripcion: '',
    urgencia: 'normal'
  };

  let submitted = false;
  let loading = false;

  function handleSubmit() {
    loading = true;
    
    // Simular envío
    setTimeout(() => {
      submitted = true;
      loading = false;
      
      // Reset form after 5 seconds
      setTimeout(() => {
        submitted = false;
        formData = {
          nombre: '',
          telefono: '',
          direccion: '',
          tipoProblema: '',
          descripcion: '',
          urgencia: 'normal'
        };
      }, 5000);
    }, 1000);
  }
</script>

<svelte:head>
  <title>Reportar Problema - EMPSAAT</title>
  <meta name="description" content="Reporta problemas con el servicio de agua potable en Tupiza, Bolivia">
</svelte:head>

<SecondaryHeader 
  title="Reportar Problema"
  description="¿Tienes un problema con el servicio de agua potable? Reporta aquí y te atenderemos lo antes posible."
  breadcrumbs={[{ label: 'Reportar Problema' }]}
/>

<main>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-image">
          <div class="emergency-card">
            <AlertCircle size={48} />
            <h3>Emergencias 24/7</h3>
            <p>Línea directa para problemas urgentes</p>
            <a href="tel:+59126941234" class="emergency-btn">
              <Phone size={20} />
              +591 2 694-1234
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Form Section -->
  <section class="form-section">
    <div class="container">
      <div class="form-content">
        <div class="form-info">
          <h2>Información del Problema</h2>
          <p>Completa el formulario con los detalles del problema para que podamos atenderte de manera eficiente.</p>
          
          <div class="info-cards">
            <div class="info-card">
              <Clock size={24} />
              <h4>Tiempo de Respuesta</h4>
              <p>Problemas urgentes: 2-4 horas<br>Problemas normales: 24-48 horas</p>
            </div>
            <div class="info-card">
              <MapPin size={24} />
              <h4>Cobertura</h4>
              <p>Atendemos toda la ciudad de Tupiza y áreas aledañas</p>
            </div>
            <div class="info-card">
              <CheckCircle size={24} />
              <h4>Seguimiento</h4>
              <p>Recibirás actualizaciones sobre el estado de tu reporte</p>
            </div>
          </div>
        </div>

        <div class="form-container">
          {#if submitted}
            <div class="success-message">
              <CheckCircle size={48} />
              <h3>¡Reporte Enviado!</h3>
              <p>Hemos recibido tu reporte. Un técnico se pondrá en contacto contigo pronto.</p>
              <p class="ticket-number">Reporte enviado exitosamente</p>
            </div>
          {:else}
            <form on:submit|preventDefault={handleSubmit} class="report-form">
              <div class="form-group">
                <label for="nombre">Nombre Completo *</label>
                <input 
                  type="text" 
                  id="nombre" 
                  bind:value={formData.nombre} 
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div class="form-group">
                <label for="telefono">Teléfono *</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  bind:value={formData.telefono} 
                  required
                  placeholder="+591 7XX XXX XXX"
                />
              </div>

              <div class="form-group">
                <label for="direccion">Dirección *</label>
                <input 
                  type="text" 
                  id="direccion" 
                  bind:value={formData.direccion} 
                  required
                  placeholder="Dirección exacta del problema"
                />
              </div>

              <div class="form-group">
                <label for="tipoProblema">Tipo de Problema *</label>
                <select id="tipoProblema" bind:value={formData.tipoProblema} required>
                  <option value="">Selecciona el tipo de problema</option>
                  <option value="corte-agua">Corte de agua</option>
                  <option value="baja-presion">Baja presión</option>
                  <option value="agua-sucia">Agua sucia o turbia</option>
                  <option value="fuga">Fuga de agua</option>
                  <option value="medidor">Problema con medidor</option>
                  <option value="alcantarillado">Problema de alcantarillado</option>
                  <option value="otro">Otro problema</option>
                </select>
              </div>

              <div class="form-group">
                <label for="urgencia">Nivel de Urgencia</label>
                <select id="urgencia" bind:value={formData.urgencia}>
                  <option value="normal">Normal (24-48 horas)</option>
                  <option value="urgente">Urgente (2-4 horas)</option>
                  <option value="emergencia">Emergencia (Inmediato)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="descripcion">Descripción del Problema *</label>
                <textarea 
                  id="descripcion" 
                  bind:value={formData.descripcion} 
                  required
                  rows="4"
                  placeholder="Describe detalladamente el problema que estás experimentando..."
                ></textarea>
              </div>

              <button type="submit" class="submit-btn">
                <AlertCircle size={20} />
                Reportar Problema
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
  .hero {
    padding-top: var(--space-16);
    padding-bottom: var(--space-16);
    background: linear-gradient(135deg, 
      rgb(var(--color-error), 0.1) 0%, 
      rgb(var(--color-warning), 0.1) 50%, 
      rgb(var(--color-primary-lighter)) 100%);
    position: relative;
    overflow: hidden;
  }

  .hero-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .emergency-card {
    background: linear-gradient(135deg, rgb(var(--color-error)) 0%, rgb(var(--color-warning)) 100%);
    color: rgb(var(--color-white));
    padding: var(--space-8);
    border-radius: var(--radius-2xl);
    text-align: center;
    box-shadow: var(--shadow-xl);
    animation: emergencyPulse 2s ease-in-out infinite;
  }

  @keyframes emergencyPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }

  .emergency-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: var(--space-4) 0;
  }

  .emergency-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: rgba(255, 255, 255, 0.2);
    color: rgb(var(--color-white));
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: 600;
    margin-top: var(--space-4);
    transition: all var(--transition);
    backdrop-filter: blur(8px);
  }

  .emergency-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .form-section {
    padding: var(--space-24) 0;
    background: rgb(var(--color-white));
  }

  .form-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
  }

  .form-info h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-4);
  }

  .form-info p {
    font-size: 1.125rem;
    color: rgb(var(--color-gray-600));
    line-height: 1.6;
    margin-bottom: var(--space-8);
  }

  .info-cards {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .info-card {
    background: linear-gradient(135deg, 
      rgba(var(--color-primary), 0.1) 0%, 
      rgba(var(--color-secondary), 0.1) 100%);
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    border: 1px solid rgba(var(--color-primary), 0.2);
  }

  .info-card h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--color-primary));
    margin: var(--space-2) 0;
  }

  .info-card p {
    color: rgb(var(--color-gray-600));
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .form-container {
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.95) 0%, 
      rgba(var(--color-primary-lighter), 0.3) 100%);
    padding: var(--space-8);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-lg);
    border: 2px solid rgba(var(--color-primary), 0.2);
    backdrop-filter: blur(8px);
  }

  .report-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .form-group label {
    font-weight: 600;
    color: rgb(var(--color-gray-700));
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: var(--space-3);
    border: 2px solid rgba(var(--color-gray-300), 0.5);
    border-radius: var(--radius-lg);
    font-size: 1rem;
    transition: all var(--transition);
    background: rgba(var(--color-white), 0.8);
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: rgb(var(--color-primary));
    box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
  }

  .submit-btn {
    background: linear-gradient(135deg, rgb(var(--color-error)) 0%, rgb(var(--color-warning)) 100%);
    color: rgb(var(--color-white));
    border: none;
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-lg);
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    transition: all var(--transition);
    box-shadow: var(--shadow-md);
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .success-message {
    text-align: center;
    padding: var(--space-8);
    color: rgb(var(--color-success));
  }

  .success-message h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: var(--space-4) 0;
  }

  .success-message p {
    color: rgb(var(--color-gray-600));
    margin-bottom: var(--space-4);
  }

  .ticket-number {
    background: linear-gradient(135deg, rgb(var(--color-success)) 0%, rgb(var(--color-secondary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    .hero-content,
    .form-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .hero-text h1 {
      font-size: 2rem;
    }

    .form-info h2 {
      font-size: 2rem;
    }
  }
</style>
