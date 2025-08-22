<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { 
    Droplets, 
    Shield, 
    Clock, 
    Phone, 
    Mail, 
    MapPin, 
    CheckCircle,
    Users,
    Zap,
    Award,
    CreditCard
  } from 'lucide-svelte';
  
  import heroBg from '$lib/assets/hero-bg.svg';

  let currentSection = 'home';

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection = entry.target.id;
        }
      });
    });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
  });
</script>

<svelte:head>
  <title>EMPSAAT - Empresa de Servicios de Agua Potable de Tupiza</title>
  <meta name="description" content="EMPSAAT es la empresa líder en servicios de agua potable en Tupiza, Bolivia. Brindamos agua de calidad y servicio confiable a toda la comunidad.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<Header />

<!-- Hero Section -->
<section id="home" class="hero">
  <div class="hero-bg">
    <img src={heroBg} alt="" />
  </div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-badge">
          <Droplets />
          <span>Servicio Municipal de Agua Potable</span>
        </div>
        <div class="hero-title">
          <h1>Agua Potable de <span class="text-gradient">Calidad</span> para Tupiza</h1>
        </div>
        <p class="hero-description">
          EMPSAAT garantiza el suministro de agua potable segura y confiable para toda la comunidad de Tupiza, Bolivia. 
          Nuestro compromiso es brindar un servicio de excelencia las 24 horas del día.
        </p>
        
        <div class="hero-buttons">
          <a href="/solicitar-conexion" class="btn-primary btn-large">
            <Zap />
            <span>Solicitar Conexión</span>
          </a>
          <a href="/pagar-facturas" class="btn-secondary btn-large">
            <CreditCard />
            <span>Pagar Facturas</span>
          </a>
        </div>

        <div class="hero-features">
          <div class="feature">
            <div class="feature-icon">
              <CheckCircle />
            </div>
            <span>Servicio 24/7</span>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <Shield />
            </div>
            <span>Agua Certificada</span>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <Clock />
            </div>
            <span>Respuesta Rápida</span>
          </div>
        </div>
      </div>

      <div class="hero-card">
        <div class="stats-card">
          <div class="stats-header">
            <div class="stats-icon">
              <img src="/empsaat.png" alt="EMPSAAT Logo" />
            </div>
            <h3>Cobertura Actual</h3>
            <p>Más de 8,000 hogares conectados</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat">
              <div class="stat-number">98%</div>
              <div class="stat-label">Cobertura</div>
            </div>
            <div class="stat">
              <div class="stat-number">24h</div>
              <div class="stat-label">Disponibilidad</div>
            </div>
          </div>
        </div>
        
        <!-- Decorative elements -->
        <div class="hero-decoration">
          <div class="decoration-circle circle-1"></div>
          <div class="decoration-circle circle-2"></div>
          <div class="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section id="servicios" class="services">
  <div class="container">
    <div class="section-header">
      <h2>Nuestros Servicios</h2>
      <p>Brindamos una amplia gama de servicios relacionados con el agua potable para satisfacer todas las necesidades de nuestra comunidad.</p>
    </div>

    <div class="services-grid">
      <!-- Service 1 -->
      <div class="service-card">
        <div class="service-icon primary">
          <Droplets />
        </div>
        <h3>Suministro de Agua Potable</h3>
        <p>Distribución continua de agua potable de alta calidad a todos los hogares y establecimientos de Tupiza.</p>
        <ul class="service-features">
          <li><CheckCircle /> Monitoreo 24/7</li>
          <li><CheckCircle /> Calidad certificada</li>
          <li><CheckCircle /> Presión constante</li>
        </ul>
      </div>

      <!-- Service 2 -->
      <div class="service-card">
        <div class="service-icon secondary">
          <Shield />
        </div>
        <h3>Mantenimiento de Redes</h3>
        <p>Mantenimiento preventivo y correctivo de toda la infraestructura de distribución de agua.</p>
        <ul class="service-features">
          <li><CheckCircle /> Inspección regular</li>
          <li><CheckCircle /> Reparaciones rápidas</li>
          <li><CheckCircle /> Equipos especializados</li>
        </ul>
      </div>

      <!-- Service 3 -->
      <div class="service-card">
        <div class="service-icon accent">
          <Users />
        </div>
        <h3>Atención al Cliente</h3>
        <p>Servicio de atención personalizada para resolver consultas, reportes y solicitudes de nuestros usuarios.</p>
        <ul class="service-features">
          <li><CheckCircle /> Atención 24/7</li>
          <li><CheckCircle /> Respuesta inmediata</li>
          <li><CheckCircle /> Seguimiento completo</li>
        </ul>
      </div>

      <!-- Service 4 -->
      <div class="service-card">
        <div class="service-icon purple">
          <Zap />
        </div>
        <h3>Nuevas Conexiones</h3>
        <p>Instalación de nuevas conexiones de agua potable para viviendas y establecimientos comerciales.</p>
        <ul class="service-features">
          <li><CheckCircle /> Evaluación técnica</li>
          <li><CheckCircle /> Instalación profesional</li>
          <li><CheckCircle /> Certificación de obra</li>
        </ul>
      </div>

      <!-- Service 5 -->
      <div class="service-card">
        <div class="service-icon red">
          <Clock />
        </div>
        <h3>Emergencias</h3>
        <p>Servicio de emergencia para atender fugas, cortes de agua y otros problemas urgentes.</p>
        <ul class="service-features">
          <li><CheckCircle /> Respuesta inmediata</li>
          <li><CheckCircle /> Equipos de emergencia</li>
          <li><CheckCircle /> Comunicación constante</li>
        </ul>
      </div>

      <!-- Service 6 -->
      <div class="service-card">
        <div class="service-icon teal">
          <Award />
        </div>
        <h3>Certificaciones</h3>
        <p>Certificación de calidad del agua y cumplimiento de estándares nacionales e internacionales.</p>
        <ul class="service-features">
          <li><CheckCircle /> Análisis periódicos</li>
          <li><CheckCircle /> Cumplimiento normativo</li>
          <li><CheckCircle /> Transparencia total</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="stats">
  <div class="container">
    <div class="section-header">
      <h2>EMPSAAT en Números</h2>
      <p>Nuestro compromiso con Tupiza reflejado en estadísticas</p>
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number">8,000+</div>
        <div class="stat-label">Hogares Conectados</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">98%</div>
        <div class="stat-label">Cobertura de Red</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">24/7</div>
        <div class="stat-label">Disponibilidad</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">25+</div>
        <div class="stat-label">Años de Servicio</div>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="nosotros" class="about">
  <div class="container">
    <div class="about-content">
      <div class="about-text">
        <h2>Sobre EMPSAAT</h2>
        <p>EMPSAAT es la empresa municipal de servicios de agua potable y alcantarillado de Tupiza, 
          comprometida con brindar un servicio de calidad a toda la comunidad desde hace más de 25 años.</p>
        <p>Nuestra misión es garantizar el acceso universal al agua potable de calidad, 
          contribuyendo al desarrollo sostenible y bienestar de Tupiza y sus habitantes.</p>
        
        <div class="about-values">
          <div class="value-item">
            <div class="value-title">Misión</div>
            <p>Brindar agua potable de calidad y servicio confiable a toda la comunidad de Tupiza.</p>
          </div>
          <div class="value-item">
            <div class="value-title">Visión</div>
            <p>Ser la empresa líder en servicios de agua potable en Bolivia, reconocida por la excelencia y sostenibilidad.</p>
          </div>
        </div>
      </div>

      <div class="about-card">
        <div class="values-card">
          <h3>Nuestros Valores</h3>
          
          <div class="values-list">
            <div class="value">
              <div class="value-number">1</div>
              <div>
                <h4>Excelencia</h4>
                <p>Buscamos la excelencia en todos nuestros servicios y procesos.</p>
              </div>
            </div>
            
            <div class="value">
              <div class="value-number">2</div>
              <div>
                <h4>Responsabilidad</h4>
                <p>Asumimos la responsabilidad de cuidar este recurso vital.</p>
              </div>
            </div>
            
            <div class="value">
              <div class="value-number">3</div>
              <div>
                <h4>Sostenibilidad</h4>
                <p>Promovemos el uso responsable y sostenible del agua.</p>
              </div>
            </div>
            
            <div class="value">
              <div class="value-number">4</div>
              <div>
                <h4>Comunidad</h4>
                <p>Trabajamos para el bienestar de toda la comunidad de Tupiza.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section id="contacto" class="contact">
  <div class="container">
    <div class="section-header">
      <h2>Contáctanos</h2>
      <p>Estamos aquí para ayudarte. Contáctanos para cualquier consulta, reporte o solicitud de servicio.</p>
    </div>

    <div class="contact-content">
      <!-- Contact Info -->
      <div class="contact-info">
        <div class="contact-item">
          <div class="contact-icon">
            <Phone />
          </div>
          <div>
            <h3>Teléfono</h3>
            <p>+591 2 694-XXXX</p>
            <p>Emergencias: +591 2 694-XXXX</p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <Mail />
          </div>
          <div>
            <h3>Email</h3>
            <p>info@empsaat.gob.bo</p>
            <p>emergencias@empsaat.gob.bo</p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <MapPin />
          </div>
          <div>
            <h3>Dirección</h3>
            <p>Av. Principal #123</p>
            <p>Tupiza, Potosí, Bolivia</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form">
        <h3>Enviarnos un Mensaje</h3>
        
        <form class="form">
          <div class="form-row">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="tu@email.com">
            </div>
          </div>
          
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input type="tel" id="telefono" name="telefono" placeholder="+591 XXX XXX XXX">
          </div>
          
          <div class="form-group">
            <label for="asunto">Asunto</label>
            <select id="asunto" name="asunto">
              <option value="">Selecciona un asunto</option>
              <option value="nueva-conexion">Nueva Conexión</option>
              <option value="reporte-problema">Reporte de Problema</option>
              <option value="consulta-tarifas">Consulta de Tarifas</option>
              <option value="facturacion">Facturación</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows="4" placeholder="Describe tu consulta o solicitud..."></textarea>
          </div>
          
          <button type="submit" class="btn-primary btn-full">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  </div>
</section>

<Footer />

<style>


  /* Buttons */
  .btn-primary {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-dark)) 100%);
    color: rgb(var(--color-white));
    border: none;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
    text-decoration: none;
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  .btn-primary:hover::before {
    left: 100%;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-secondary {
    background: linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-secondary-dark)) 100%);
    color: rgb(var(--color-white));
    border: none;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
    text-decoration: none;
  }

  .btn-secondary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  .btn-secondary:hover::before {
    left: 100%;
  }

  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-large {
    padding: var(--space-3) var(--space-6);
    font-size: 1.125rem;
  }

  .btn-full {
    width: 100%;
  }

  /* Hero Section */
  .hero {
    padding-top: 6rem;
    padding-bottom: var(--space-24);
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, rgb(var(--color-primary-lighter)) 0%, rgb(var(--color-white)) 50%, rgb(var(--color-primary-lighter)) 100%);
    animation: heroFadeIn 1.5s ease-out;
  }

  @keyframes heroFadeIn {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.6;
  }

  .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    color: rgb(var(--color-white));
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: var(--space-6);
    box-shadow: var(--shadow-lg);
    animation: badgePulse 2s ease-in-out infinite;
  }

  @keyframes badgePulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .hero-badge svg {
    width: 1rem;
    height: 1rem;
  }

  .text-gradient {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
  }

  .hero-title h1 {
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.05;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-6);
    letter-spacing: -0.02em;
    animation: titleGlow 3s ease-in-out infinite alternate;
  }

  @keyframes titleGlow {
    0% {
      filter: drop-shadow(0 0 10px rgba(var(--color-primary), 0.3));
    }
    100% {
      filter: drop-shadow(0 0 20px rgba(var(--color-primary), 0.6));
    }
  }

  .text-primary {
    color: rgb(var(--color-primary));
  }

  .hero-description {
    font-size: 1.25rem;
    color: rgb(var(--color-gray-600));
    line-height: 1.6;
    margin-bottom: var(--space-8);
  }

  .hero-buttons {
    display: flex;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .hero-features {
    display: flex;
    gap: var(--space-6);
    font-size: 0.875rem;
    color: rgb(var(--color-gray-600));
  }

  .feature {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.9) 0%, 
      rgba(var(--color-primary-lighter), 0.3) 100%);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition);
    border: 1px solid rgba(var(--color-primary), 0.2);
  }

  .feature:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: var(--shadow-md);
  }

  .feature {
    animation: featureFloat 4s ease-in-out infinite;
  }

  .feature:nth-child(2) {
    animation-delay: 0.5s;
  }

  .feature:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes featureFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .feature-icon {
    width: 1.5rem;
    height: 1.5rem;
    background: linear-gradient(135deg, rgb(var(--color-success)) 0%, rgb(var(--color-secondary)) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(var(--color-white));
    animation: iconPulse 2s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .feature-icon svg {
    width: 1rem;
    height: 1rem;
  }

  .hero-card {
    position: relative;
  }

  .stats-card {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-dark)) 100%);
    color: rgb(var(--color-white));
    padding: var(--space-8);
    border-radius: var(--radius-2xl);
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-xl);
  }

  .stats-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  .stats-icon {
    width: 6rem;
    height: 6rem;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-4);
    backdrop-filter: blur(8px);
  }

  .stats-icon img {
    width: 4.5rem;
    height: 4.5rem;
    object-fit: contain;
  }

  .hero-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .decoration-circle {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(var(--color-accent), 0.3) 0%, rgba(var(--color-secondary), 0.2) 100%);
    animation: float 4s ease-in-out infinite;
  }

  .circle-1 {
    width: 3rem;
    height: 3rem;
    top: 20%;
    right: 10%;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 2rem;
    height: 2rem;
    top: 60%;
    right: 20%;
    animation-delay: 1s;
  }

  .circle-3 {
    width: 1.5rem;
    height: 1.5rem;
    top: 40%;
    right: 5%;
    animation-delay: 2s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .stats-header h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: var(--space-2);
  }

  .stats-header p {
    color: rgb(var(--color-primary-lighter));
    margin-bottom: var(--space-6);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }

  .stat-number {
    font-size: 1.875rem;
    font-weight: 700;
  }

  .stat-label {
    font-size: 0.875rem;
    color: rgb(var(--color-primary-lighter));
  }

  /* Section Headers */
  .section-header {
    text-align: center;
    margin-bottom: var(--space-16);
  }

  .section-header h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-4);
    letter-spacing: -0.01em;
  }

  .section-header p {
    font-size: 1.125rem;
    color: rgb(var(--color-gray-600));
    max-width: 48rem;
    margin: 0 auto;
  }

  /* Services Section */
  .services {
    padding: var(--space-24) 0;
    background: linear-gradient(135deg, 
      rgb(var(--color-primary-lighter)) 0%, 
      rgb(var(--color-secondary-lighter)) 50%, 
      rgb(var(--color-accent-lighter)) 100%);
    position: relative;
    overflow: hidden;
    animation: sectionSlideIn 1s ease-out 0.5s both;
  }

  @keyframes sectionSlideIn {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .services::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/src/lib/assets/water-pattern.svg');
    opacity: 0.1;
    pointer-events: none;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: var(--space-8);
  }

  .service-card {
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.9) 0%, 
      rgba(var(--color-primary-lighter), 0.3) 100%);
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition);
    position: relative;
    overflow: hidden;
    border: 2px solid rgba(var(--color-primary), 0.2);
    backdrop-filter: blur(8px);
    animation: cardFloat 6s ease-in-out infinite;
  }

  .service-card:nth-child(2) {
    animation-delay: 1s;
  }

  .service-card:nth-child(3) {
    animation-delay: 2s;
  }

  @keyframes cardFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
  }

  .service-card:hover {
    transform: translateY(-0.5rem);
    box-shadow: var(--shadow-xl);
    border-color: rgba(var(--color-primary), 0.5);
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.95) 0%, 
      rgba(var(--color-primary-lighter), 0.5) 100%);
  }

  .service-icon {
    width: 4rem;
    height: 4rem;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-6);
    position: relative;
    overflow: hidden;
    animation: iconRotate 8s linear infinite;
  }

  @keyframes iconRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .service-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
  }

  .service-icon.primary {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-dark)) 100%);
    color: rgb(var(--color-white));
    box-shadow: 0 4px 12px rgba(var(--color-primary), 0.3);
  }

  .service-icon.secondary {
    background: linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-secondary-dark)) 100%);
    color: rgb(var(--color-white));
    box-shadow: 0 4px 12px rgba(var(--color-secondary), 0.3);
  }

  .service-icon.accent {
    background: linear-gradient(135deg, rgb(var(--color-accent)) 0%, rgb(var(--color-accent-dark)) 100%);
    color: rgb(var(--color-white));
    box-shadow: 0 4px 12px rgba(var(--color-accent), 0.3);
  }

  .service-icon.purple {
    background: linear-gradient(135deg, rgb(147, 51, 234) 0%, rgb(124, 58, 237) 100%);
    color: rgb(var(--color-white));
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  }

  .service-icon.red {
    background: linear-gradient(135deg, rgb(220, 38, 38) 0%, rgb(185, 28, 28) 100%);
    color: rgb(var(--color-white));
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }

  .service-icon.teal {
    background: linear-gradient(135deg, rgb(13, 148, 136) 0%, rgb(15, 118, 110) 100%);
    color: rgb(var(--color-white));
    box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
  }

  .service-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-4);
    letter-spacing: -0.01em;
  }

  .service-card p {
    color: rgb(var(--color-gray-600));
    margin-bottom: var(--space-6);
    line-height: 1.6;
  }

  .service-features {
    list-style: none;
    padding: 0;
  }

  .service-features li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    color: rgb(var(--color-gray-700));
    margin-bottom: var(--space-3);
  }

  .service-features svg {
    width: 1.25rem;
    height: 1.25rem;
    color: rgb(var(--color-success));
  }

  /* Stats Section */
  .stats {
    padding: var(--space-24) 0;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-dark)) 100%);
    color: rgb(var(--color-white));
    position: relative;
    overflow: hidden;
  }

  .stats::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/src/lib/assets/water-pattern.svg');
    opacity: 0.1;
    pointer-events: none;
  }

  .stats .container {
    position: relative;
    z-index: 1;
  }

  .stats .section-header h2,
  .stats .section-header p {
    color: rgb(var(--color-white));
  }

  .stats .section-header p {
    color: rgb(var(--color-primary-lighter));
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: var(--space-8);
  }

  .stat-item {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform var(--transition);
    animation: statBounce 4s ease-in-out infinite;
  }

  .stat-item:nth-child(2) {
    animation-delay: 0.5s;
  }

  .stat-item:nth-child(3) {
    animation-delay: 1s;
  }

  .stat-item:nth-child(4) {
    animation-delay: 1.5s;
  }

  @keyframes statBounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .stat-item:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  .stat-item .stat-number {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: var(--space-2);
    background: linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-primary-lighter)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .stat-item .stat-label {
    font-size: 1.125rem;
    color: rgb(var(--color-primary-lighter));
    font-weight: 500;
  }

  /* About Section */
  .about {
    padding: var(--space-24) 0;
    background: linear-gradient(135deg, 
      rgb(var(--color-secondary-lighter)) 0%, 
      rgb(var(--color-white)) 50%, 
      rgb(var(--color-accent-lighter)) 100%);
    position: relative;
    overflow: hidden;
    animation: sectionSlideIn 1s ease-out 1s both;
  }

  .about::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/src/lib/assets/water-pattern.svg');
    opacity: 0.1;
    pointer-events: none;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .about-text h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-6);
    letter-spacing: -0.01em;
  }

  .about-text p {
    font-size: 1.125rem;
    color: rgb(var(--color-gray-600));
    line-height: 1.6;
    margin-bottom: var(--space-6);
  }

  .about-values {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    margin-top: var(--space-8);
  }

  .value-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: rgb(var(--color-primary));
    margin-bottom: var(--space-2);
  }

  .values-card {
    background: linear-gradient(135deg, 
      rgba(var(--color-primary), 0.1) 0%, 
      rgba(var(--color-secondary), 0.1) 50%, 
      rgba(var(--color-accent), 0.1) 100%);
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    border: 2px solid rgba(var(--color-primary), 0.2);
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-lg);
  }

  .values-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-6);
  }

  .values-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .value {
    display: flex;
    gap: var(--space-4);
  }

  .value-number {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    color: rgb(var(--color-white));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
    animation: valueSpin 3s linear infinite;
  }

  @keyframes valueSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .value-number::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
  }

  .value h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-2);
  }

  .value p {
    color: rgb(var(--color-gray-600));
    line-height: 1.5;
  }

  /* Contact Section */
  .contact {
    padding: var(--space-24) 0;
    background: linear-gradient(135deg, 
      rgb(var(--color-accent-lighter)) 0%, 
      rgb(var(--color-primary-lighter)) 50%, 
      rgb(var(--color-secondary-lighter)) 100%);
    position: relative;
    overflow: hidden;
    animation: sectionSlideIn 1s ease-out 1.5s both;
  }

  .contact::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/src/lib/assets/water-pattern.svg');
    opacity: 0.1;
    pointer-events: none;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    position: relative;
    z-index: 1;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .contact-item {
    display: flex;
    gap: var(--space-4);
    background: rgba(var(--color-white), 0.8);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(var(--color-primary), 0.1);
    transition: all var(--transition);
    animation: contactSlide 5s ease-in-out infinite;
  }

  .contact-item:nth-child(2) {
    animation-delay: 1s;
  }

  .contact-item:nth-child(3) {
    animation-delay: 2s;
  }

  @keyframes contactSlide {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
  }

  .contact-item:hover {
    transform: translateY(-2px);
    background: rgba(var(--color-white), 0.95);
    border-color: rgba(var(--color-primary), 0.3);
  }

  .contact-icon {
    width: 3rem;
    height: 3rem;
    background: rgb(var(--color-primary));
    color: rgb(var(--color-white));
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .contact-item h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-2);
  }

  .contact-item p {
    color: rgb(var(--color-gray-600));
    margin-bottom: var(--space-1);
  }

  .contact-form {
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.95) 0%, 
      rgba(var(--color-primary-lighter), 0.3) 100%);
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 2px solid rgba(var(--color-primary), 0.2);
    backdrop-filter: blur(8px);
  }

  .contact-form h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(var(--color-gray-900));
    margin-bottom: var(--space-6);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .form-group label {
    font-weight: 500;
    color: rgb(var(--color-gray-700));
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: var(--space-3);
    border: 1px solid rgb(var(--color-gray-300));
    border-radius: var(--radius-lg);
    font-family: var(--font-family);
    transition: border-color var(--transition);
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: rgb(var(--color-primary));
    box-shadow: 0 0 0 2px rgba(var(--color-primary), 0.1);
  }

  /* Footer */
  .footer {
    background: linear-gradient(135deg, 
      rgb(var(--color-gray-900)) 0%, 
      rgb(var(--color-primary-dark)) 50%, 
      rgb(var(--color-secondary-dark)) 100%);
    color: rgb(var(--color-white));
    padding: var(--space-16) 0 var(--space-8);
    position: relative;
    overflow: hidden;
  }

  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/src/lib/assets/water-pattern.svg');
    opacity: 0.05;
    pointer-events: none;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: var(--space-8);
    margin-bottom: var(--space-8);
    position: relative;
    z-index: 1;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .footer-logo .logo-icon {
    width: 2rem;
    height: 2rem;
  }

  .footer-logo span {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .footer-section p {
    color: rgb(var(--color-gray-400));
    line-height: 1.6;
    margin-bottom: var(--space-4);
  }

  .social-links {
    display: flex;
    gap: var(--space-4);
  }

  .social-link {
    background: none;
    border: none;
    color: rgb(var(--color-gray-400));
    text-decoration: none;
    transition: color var(--transition);
    cursor: pointer;
    font-size: inherit;
    padding: 0;
  }

  .social-link:hover {
    color: rgb(var(--color-white));
  }

  .footer-link {
    background: none;
    border: none;
    color: rgb(var(--color-gray-400));
    text-decoration: none;
    transition: color var(--transition);
    cursor: pointer;
    font-size: inherit;
    padding: 0;
  }

  .footer-link:hover {
    color: rgb(var(--color-white));
  }

  .footer-section h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--space-4);
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
  }

  .footer-section li {
    margin-bottom: var(--space-2);
  }

  .footer-section a {
    color: rgb(var(--color-gray-400));
    text-decoration: none;
    transition: color var(--transition);
  }

  .footer-section a:hover {
    color: rgb(var(--color-white));
  }

  .footer-section li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: rgb(var(--color-gray-400));
  }

  .footer-section svg {
    width: 1rem;
    height: 1rem;
  }

  .footer-bottom {
    border-top: 1px solid rgb(var(--color-gray-800));
    padding-top: var(--space-8);
    text-align: center;
    color: rgb(var(--color-gray-400));
  }

  .footer-bottom a {
    color: rgb(var(--color-gray-400));
    text-decoration: none;
  }

  .footer-bottom a:hover {
    color: rgb(var(--color-white));
  }

  /* Container utility */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 var(--space-4);
  }

  @media (min-width: 640px) {
    .container { max-width: 640px; }
  }

  @media (min-width: 768px) {
    .container { max-width: 768px; }
  }

  @media (min-width: 1024px) {
    .container { max-width: 1024px; }
  }

  @media (min-width: 1280px) {
    .container { max-width: 1280px; }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .nav-desktop,
    .header-cta {
      display: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .mobile-nav {
      display: block;
    }

    .hero-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .hero-title h1 {
      font-size: 2.5rem;
    }

    .hero-buttons {
      flex-direction: column;
    }

    .hero-features {
      flex-direction: column;
      gap: var(--space-3);
    }

    .about-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .about-values {
      grid-template-columns: 1fr;
    }

    .contact-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .hero-title h1 {
      font-size: 2rem;
    }
  }
</style>
