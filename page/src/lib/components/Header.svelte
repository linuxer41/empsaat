<script lang="ts">
  import { Menu, X, Droplets } from 'lucide-svelte';
  
  let mobileMenuOpen = false;
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    mobileMenuOpen = false;
  }
</script>

<header class="header">
  <div class="container">
    <div class="header-content">
      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon">
          <img src="/empsaat.png" alt="EMPSAAT Logo" />
        </div>
        <span class="logo-text">EMPSAAT</span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav-desktop">
        <a href="#home" class="nav-link">Inicio</a>
        <a href="#servicios" class="nav-link">Servicios</a>
        <a href="#nosotros" class="nav-link">Nosotros</a>
        <a href="/pagar-facturas" class="nav-link">Pagar Facturas</a>
        <a href="#contacto" class="nav-link">Contacto</a>
      </nav>

      <!-- CTA Button -->
      <div class="header-cta">
        <a href="/reportar-problema" class="btn-primary">Reportar Problema</a>
      </div>

      <!-- Mobile menu button -->
      <button class="mobile-menu-btn" on:click={toggleMobileMenu}>
        {#if mobileMenuOpen}
          <X />
        {:else}
          <Menu />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Navigation -->
  {#if mobileMenuOpen}
    <div class="mobile-nav">
      <div class="mobile-nav-content">
        <a href="#home" class="mobile-nav-link" on:click={() => scrollToSection('home')}>Inicio</a>
        <a href="#servicios" class="mobile-nav-link" on:click={() => scrollToSection('servicios')}>Servicios</a>
                 <a href="#nosotros" class="mobile-nav-link" on:click={() => scrollToSection('nosotros')}>Nosotros</a>
        <a href="/pagar-facturas" class="mobile-nav-link">Pagar Facturas</a>
        <a href="#contacto" class="mobile-nav-link" on:click={() => scrollToSection('contacto')}>Contacto</a>
        <a href="/reportar-problema" class="btn-primary mobile-cta">Reportar Problema</a>
      </div>
    </div>
  {/if}
</header>

<style>
  /* Header */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(219, 234, 254, 0.9) 100%);
    backdrop-filter: blur(12px);
    border-bottom: 2px solid;
    border-image: linear-gradient(90deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 50%, rgb(var(--color-accent)) 100%) 1;
    box-shadow: 0 4px 20px rgba(var(--color-primary), 0.1);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.5rem;
    position: relative;
  }

  .header-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(var(--color-primary), 0.05) 0%, 
      rgba(var(--color-secondary), 0.05) 50%, 
      rgba(var(--color-accent), 0.05) 100%);
    opacity: 0;
    transition: opacity var(--transition);
  }

  .header-content::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(var(--color-primary), 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(var(--color-secondary), 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 20%, rgba(var(--color-accent), 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity var(--transition);
    pointer-events: none;
  }

  .header-content:hover::before,
  .header-content:hover::after {
    opacity: 1;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    position: relative;
    z-index: 1;
    transition: transform var(--transition);
    animation: logoGlow 4s ease-in-out infinite;
  }

  @keyframes logoGlow {
    0%, 100% {
      filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));
    }
    50% {
      filter: drop-shadow(0 0 15px rgba(255,255,255,0.6));
    }
  }

  .logo:hover {
    transform: scale(1.05);
  }

  .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
  }

  .logo-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: var(--radius-lg);
  }

  .logo-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
  }

  .logo-icon::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: rotate(45deg) translateX(-100%);
    transition: transform 0.6s;
  }

  .logo:hover .logo-icon::after {
    transform: rotate(45deg) translateX(100%);
  }

  .logo-text {
    font-size: 1.75rem;
    font-weight: 900;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    letter-spacing: -0.01em;
  }

  .logo-text::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    transform: scaleX(0);
    transition: transform var(--transition);
  }

  .logo:hover .logo-text::after {
    transform: scaleX(1);
  }

  .nav-desktop {
    display: flex;
    gap: var(--space-8);
    position: relative;
    z-index: 1;
  }

  .nav-link {
    color: rgb(var(--color-gray-700));
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    transition: all var(--transition);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.01em;
    animation: navFloat 6s ease-in-out infinite;
  }

  .nav-link:nth-child(2) {
    animation-delay: 0.5s;
  }

  .nav-link:nth-child(3) {
    animation-delay: 1s;
  }

  .nav-link:nth-child(4) {
    animation-delay: 1.5s;
  }

  @keyframes navFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    opacity: 0;
    transition: opacity var(--transition);
    z-index: -1;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    transition: all var(--transition);
    transform: translateX(-50%);
  }

  .nav-link:hover {
    color: rgb(var(--color-white));
    transform: translateY(-2px);
  }

  .nav-link:hover::before {
    opacity: 1;
  }

  .nav-link:hover::after {
    width: 80%;
  }

  .header-cta {
    display: none;
    position: relative;
    z-index: 1;
  }

  /* Mostrar CTA en desktop */
  @media (min-width: 1024px) {
    .header-cta {
      display: block;
    }
  }

  .header-cta .btn-primary {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
    text-decoration: none;
  }

  .header-cta .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  .header-cta .btn-primary:hover::before {
    left: 100%;
  }

  .mobile-menu-btn {
    display: none;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    border: none;
    color: rgb(var(--color-white));
    cursor: pointer;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-lg);
    position: relative;
    z-index: 1;
    transition: all var(--transition);
    box-shadow: var(--shadow-md);
    animation: buttonPulse 3s ease-in-out infinite;
  }

  @keyframes buttonPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .mobile-menu-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .mobile-menu-btn svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .mobile-nav {
    display: none;
    background: linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-primary-lighter)) 100%);
    border-top: 2px solid;
    border-image: linear-gradient(90deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%) 1;
    box-shadow: 0 4px 20px rgba(var(--color-primary), 0.1);
    position: relative;
    overflow: hidden;
  }

  .mobile-nav::before {
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

  .mobile-nav-content {
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    position: relative;
    z-index: 1;
  }

  .mobile-nav-link {
    padding: var(--space-3) var(--space-4);
    color: rgb(var(--color-gray-700));
    text-decoration: none;
    font-weight: 600;
    border-radius: var(--radius-lg);
    transition: all var(--transition);
    position: relative;
    overflow: hidden;
    background: rgba(var(--color-white), 0.5);
    backdrop-filter: blur(8px);
  }

  .mobile-nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    opacity: 0;
    transition: opacity var(--transition);
    z-index: -1;
  }

  .mobile-nav-link:hover {
    color: rgb(var(--color-white));
    transform: translateX(10px);
  }

  .mobile-nav-link:hover::before {
    opacity: 1;
  }

  .mobile-cta {
    margin-top: var(--space-6);
    background: linear-gradient(135deg, rgb(var(--color-accent)) 0%, rgb(var(--color-accent-dark)) 100%);
    border: none;
    color: rgb(var(--color-white));
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-lg);
    font-weight: 600;
    box-shadow: var(--shadow-md);
    transition: all var(--transition);
    text-decoration: none;
  }

  .mobile-cta:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

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
  }
</style>
