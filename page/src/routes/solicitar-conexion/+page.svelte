<script lang="ts">
  import SecondaryHeader from '$lib/components/SecondaryHeader.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { Droplets, FileText, Clock, CheckCircle, MapPin, Calculator, Phone } from 'lucide-svelte';

  let formData = {
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    tipoConexion: '',
    tipoPropiedad: '',
    documentos: [],
    comentarios: ''
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
          email: '',
          direccion: '',
          tipoConexion: '',
          tipoPropiedad: '',
          documentos: [],
          comentarios: ''
        };
      }, 5000);
    }, 1000);
  }
</script>

<svelte:head>
  <title>Solicitar Conexión - Empresa Municipal Prestadora de Servicios de Agua Potable y Alcantarillado Sanitario Tupiza</title>
  <meta name="description" content="Solicita una nueva conexión de agua potable en Tupiza, Bolivia">
</svelte:head>

<SecondaryHeader 
  title="Solicitar Conexión"
  description="¿Necesitas una nueva conexión de agua potable? Solicita aquí y te guiaremos en todo el proceso."
  breadcrumbs={[{ label: 'Solicitar Conexión' }]}
/>

<main>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">

        <div class="hero-image">
          <div class="connection-card">
            <Droplets size={48} />
            <h3>Nueva Conexión</h3>
            <p>Proceso simple y rápido</p>
            <div class="steps">
              <div class="step">
                <span class="step-number">1</span>
                <span>Solicitud</span>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <span>Evaluación</span>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <span>Instalación</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Info Section -->
  <section class="info-section">
    <div class="container">
      <div class="info-grid">
        <div class="info-card">
          <FileText size={32} />
          <h3>Documentos Requeridos</h3>
          <ul>
            <li>Cédula de identidad</li>
            <li>Certificado de propiedad</li>
            <li>Plano de ubicación</li>
            <li>Formulario de solicitud</li>
          </ul>
        </div>
        <div class="info-card">
          <Clock size={32} />
          <h3>Tiempo de Proceso</h3>
          <ul>
            <li>Evaluación: 3-5 días</li>
            <li>Aprobación: 1-2 días</li>
            <li>Instalación: 7-15 días</li>
            <li>Total: 2-3 semanas</li>
          </ul>
        </div>
        <div class="info-card">
          <Calculator size={32} />
          <h3>Costos Aproximados</h3>
          <ul>
            <li>Conexión residencial: Bs. 800</li>
            <li>Conexión comercial: Bs. 1,200</li>
            <li>Medidor: Bs. 300</li>
            <li>Instalación: Bs. 500</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Form Section -->
  <section class="form-section">
    <div class="container">
      <div class="form-content">
        <div class="form-info">
          <h2>Solicitud de Conexión</h2>
          <p>Completa el formulario con tus datos y la información de la propiedad para solicitar tu nueva conexión de agua potable.</p>
          
          <div class="requirements">
            <h4>Requisitos Importantes:</h4>
            <ul>
              <li>La propiedad debe estar en zona de cobertura</li>
              <li>Documentos de propiedad al día</li>
              <li>Pago de derechos de conexión</li>
              <li>Acceso para instalación</li>
            </ul>
          </div>
        </div>

        <div class="form-container">
          {#if submitted}
            <div class="success-message">
              <CheckCircle size={48} />
              <h3>¡Solicitud Enviada!</h3>
              <p>Hemos recibido tu solicitud. Te contactaremos en los próximos días para coordinar la evaluación.</p>
              <p class="ticket-number">Solicitud enviada exitosamente</p>
            </div>
          {:else}
            <form on:submit|preventDefault={handleSubmit} class="connection-form">
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
                <label for="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={formData.email} 
                  placeholder="tu@email.com"
                />
              </div>

              <div class="form-group">
                <label for="direccion">Dirección de la Propiedad *</label>
                <input 
                  type="text" 
                  id="direccion" 
                  bind:value={formData.direccion} 
                  required
                  placeholder="Dirección exacta de la propiedad"
                />
              </div>

              <div class="form-group">
                <label for="tipoConexion">Tipo de Conexión *</label>
                <select id="tipoConexion" bind:value={formData.tipoConexion} required>
                  <option value="">Selecciona el tipo de conexión</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="institucional">Institucional</option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipoPropiedad">Tipo de Propiedad *</label>
                <select id="tipoPropiedad" bind:value={formData.tipoPropiedad} required>
                  <option value="">Selecciona el tipo de propiedad</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="local">Local Comercial</option>
                  <option value="terreno">Terreno</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div class="form-group">
                <label for="comentarios">Comentarios Adicionales</label>
                <textarea 
                  id="comentarios" 
                  bind:value={formData.comentarios} 
                  rows="4"
                  placeholder="Información adicional sobre la propiedad o requerimientos especiales..."
                ></textarea>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" required />
                  <span>Acepto los términos y condiciones del servicio</span>
                </label>
              </div>

              <button type="submit" class="submit-btn">
                <Droplets size={20} />
                Solicitar Conexión
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section">
    <div class="container">
      <div class="contact-content">
        <h2>¿Necesitas Ayuda?</h2>
        <p>Nuestro equipo está disponible para resolver tus dudas sobre el proceso de conexión.</p>
        <div class="contact-buttons">
          <a href="tel:+59126944636" class="contact-btn">
            <Phone size={20} />
            Tel: 26944636
          </a>
          <a href="tel:+59173327013" class="contact-btn">
            <Phone size={20} />
            Cel: 73327013
          </a>
          <a href="/contacto" class="contact-btn secondary">
            <MapPin size={20} />
            Visitar Oficina
          </a>
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
      rgb(var(--color-primary-lighter)) 0%, 
      rgb(var(--color-secondary-lighter)) 50%, 
      rgb(var(--color-accent-lighter)) 100%);
    position: relative;
    overflow: hidden;
  }

  .hero-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .connection-card {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    color: rgb(var(--color-white));
    padding: var(--space-8);
    border-radius: var(--radius-2xl);
    text-align: center;
    box-shadow: var(--shadow-xl);
  }

  .connection-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: var(--space-4) 0;
  }

  .steps {
    display: flex;
    justify-content: space-around;
    margin-top: var(--space-6);
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }

  .step-number {
    width: 2rem;
    height: 2rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.875rem;
  }

  .info-section {
    padding: var(--space-16) 0;
    background: rgb(var(--color-white));
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
  }

  .info-card {
    background: linear-gradient(135deg, 
      rgba(var(--color-primary), 0.1) 0%, 
      rgba(var(--color-secondary), 0.1) 100%);
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    text-align: center;
    border: 1px solid rgba(var(--color-primary), 0.2);
  }

  .info-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--color-primary));
    margin: var(--space-4) 0;
  }

  .info-card ul {
    list-style: none;
    padding: 0;
    text-align: left;
  }

  .info-card li {
    padding: var(--space-1) 0;
    color: rgb(var(--color-gray-600));
    font-size: 0.875rem;
  }

  .info-card li::before {
    content: '✓';
    color: rgb(var(--color-success));
    font-weight: bold;
    margin-right: var(--space-2);
  }

  .form-section {
    padding: var(--space-24) 0;
    background: linear-gradient(135deg, 
      rgb(var(--color-secondary-lighter)) 0%, 
      rgb(var(--color-white)) 50%, 
      rgb(var(--color-primary-lighter)) 100%);
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

  .requirements {
    background: rgba(var(--color-warning), 0.1);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(var(--color-warning), 0.3);
  }

  .requirements h4 {
    color: rgb(var(--color-warning));
    font-weight: 600;
    margin-bottom: var(--space-3);
  }

  .requirements ul {
    list-style: none;
    padding: 0;
  }

  .requirements li {
    padding: var(--space-1) 0;
    color: rgb(var(--color-gray-600));
    font-size: 0.875rem;
  }

  .requirements li::before {
    content: '•';
    color: rgb(var(--color-warning));
    font-weight: bold;
    margin-right: var(--space-2);
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

  .connection-form {
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

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    cursor: pointer;
  }

  .checkbox-label input[type="checkbox"] {
    margin-top: 0.25rem;
  }

  .submit-btn {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
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

  .contact-section {
    padding: var(--space-16) 0;
    background: linear-gradient(135deg, 
      rgb(var(--color-accent-lighter)) 0%, 
      rgb(var(--color-primary-lighter)) 100%);
    text-align: center;
  }

  .contact-content h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-4);
  }

  .contact-content p {
    font-size: 1.125rem;
    color: rgb(var(--color-gray-600));
    margin-bottom: var(--space-8);
  }

  .contact-buttons {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition);
    box-shadow: var(--shadow-md);
  }

  .contact-btn:first-child {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    color: rgb(var(--color-white));
  }

  .contact-btn.secondary {
    background: rgba(var(--color-white), 0.9);
    color: rgb(var(--color-gray-700));
    border: 2px solid rgba(var(--color-primary), 0.2);
  }

  .contact-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
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

    .contact-buttons {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
