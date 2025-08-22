<script lang="ts">
  import { Droplets, Phone, Mail, MapPin } from 'lucide-svelte';
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <!-- Company Info -->
      <div class="footer-section">
        <div class="footer-logo">
          <div class="logo-icon">
            <img src="/empsaat.png" alt="EMPSAAT Logo" />
          </div>
          <span>EMPSAAT</span>
        </div>
        <p>Empresa Municipal de Servicios de Agua Potable y Alcantarillado de Tupiza.</p>
        <div class="social-links">
          <a href="#" class="social-link">Facebook</a>
          <a href="#" class="social-link">Instagram</a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h3>Enlaces Rápidos</h3>
        <ul>
          <li><a href="#home">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div class="footer-section">
        <h3>Servicios</h3>
        <ul>
          <li><a href="/solicitar-conexion" class="footer-link">Nueva Conexión</a></li>
          <li><a href="/reportar-problema" class="footer-link">Reporte de Problemas</a></li>
          <li><a href="/pagar-facturas" class="footer-link">Pagar Facturas</a></li>
          <li><a href="#" class="footer-link">Facturación</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-section">
        <h3>Contacto</h3>
        <ul>
          <li><Phone /> +591 2 694-XXXX</li>
          <li><Mail /> info@empsaat.gob.bo</li>
          <li><MapPin /> Tupiza, Potosí, Bolivia</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2024 EMPSAAT. Todos los derechos reservados. | 
        <a href="#" class="footer-link">Política de Privacidad</a> | 
        <a href="#" class="footer-link">Términos de Servicio</a>
      </p>
    </div>
  </div>
</footer>

<style>
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
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-logo .logo-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: var(--radius-lg);
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
</style>
