<script lang="ts">
  import { ChevronRight, Home, Droplets } from 'lucide-svelte';

  export let title: string;
  export let breadcrumbs: Array<{ label: string; href?: string }> = [];
  export let description: string = '';

  // Agregar "Inicio" al inicio de los breadcrumbs
  $: fullBreadcrumbs = [
    { label: 'Inicio', href: '/' },
    ...breadcrumbs
  ];
</script>

<header class="secondary-header">
  <div class="container">
    <!-- Logo y navegación principal -->
    <div class="header-top">
      <div class="logo">
        <a href="/" class="logo-link">
          <div class="logo-icon">
            <Droplets />
          </div>
          <span class="logo-text">EMPSAAT</span>
        </a>
      </div>

      <nav class="secondary-nav">
        <a href="/" class="nav-link">Inicio</a>
        <a href="/servicios" class="nav-link">Servicios</a>
        <a href="/nosotros" class="nav-link">Nosotros</a>
        <a href="/pagar-facturas" class="nav-link">Pagar Facturas</a>
        <a href="/contacto" class="nav-link">Contacto</a>
      </nav>
    </div>

    <!-- Breadcrumbs y título de página -->
    <div class="page-header">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          {#each fullBreadcrumbs as breadcrumb, index}
            <li class="breadcrumb-item">
              {#if breadcrumb.href && index < fullBreadcrumbs.length - 1}
                <a href={breadcrumb.href} class="breadcrumb-link">
                  {#if index === 0}
                    <Home size={16} />
                  {/if}
                  {breadcrumb.label}
                </a>
              {:else}
                <span class="breadcrumb-current">
                  {breadcrumb.label}
                </span>
              {/if}
              
              {#if index < fullBreadcrumbs.length - 1}
                <ChevronRight size={16} class="breadcrumb-separator" />
              {/if}
            </li>
          {/each}
        </ol>
      </nav>

      <div class="page-title-section">
        <h1 class="page-title">{title}</h1>
        {#if description}
          <p class="page-description">{description}</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Línea decorativa -->
  <div class="header-decoration">
    <div class="decoration-line"></div>
    <div class="decoration-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</header>

<style>
  .secondary-header {
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.98) 0%, 
      rgba(var(--color-primary-lighter), 0.1) 100%);
    border-bottom: 2px solid;
    border-image: linear-gradient(90deg, 
      rgb(var(--color-primary)) 0%, 
      rgb(var(--color-secondary)) 50%, 
      rgb(var(--color-accent)) 100%) 1;
    box-shadow: 0 2px 20px rgba(var(--color-primary), 0.1);
    position: relative;
    overflow: hidden;
  }

  .secondary-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/src/lib/assets/water-pattern.svg');
    opacity: 0.03;
    pointer-events: none;
  }

  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 var(--space-4);
    position: relative;
    z-index: 1;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-4) 0;
    border-bottom: 1px solid rgba(var(--color-gray-200), 0.5);
  }

  .logo-link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    transition: transform var(--transition);
  }

  .logo-link:hover {
    transform: scale(1.02);
  }

  .logo-icon {
    width: 2rem;
    height: 2rem;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(var(--color-white));
    box-shadow: var(--shadow-sm);
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .secondary-nav {
    display: flex;
    gap: var(--space-6);
  }

  .nav-link {
    color: rgb(var(--color-gray-600));
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    transition: all var(--transition);
    position: relative;
  }

  .nav-link:hover {
    color: rgb(var(--color-primary));
    background: rgba(var(--color-primary), 0.1);
  }

  .page-header {
    padding: var(--space-6) 0;
  }

  .breadcrumbs {
    margin-bottom: var(--space-4);
  }

  .breadcrumb-list {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .breadcrumb-link {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    color: rgb(var(--color-gray-500));
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color var(--transition);
  }

  .breadcrumb-link:hover {
    color: rgb(var(--color-primary));
  }

  .breadcrumb-current {
    color: rgb(var(--color-gray-700));
    font-size: 0.875rem;
    font-weight: 600;
  }

  .breadcrumb-separator {
    color: rgb(var(--color-gray-400));
    flex-shrink: 0;
  }

  .page-title-section {
    text-align: center;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: rgb(var(--color-gray-900));
    margin: 0 0 var(--space-2) 0;
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .page-description {
    font-size: 1.125rem;
    color: rgb(var(--color-gray-600));
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .header-decoration {
    position: relative;
    height: 4px;
    background: linear-gradient(90deg, 
      rgb(var(--color-primary)) 0%, 
      rgb(var(--color-secondary)) 50%, 
      rgb(var(--color-accent)) 100%);
  }

  .decoration-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255,255,255,0.3) 50%, 
      transparent 100%);
    animation: shimmer 2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
  }

  .decoration-dots {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: var(--space-2);
  }

  .dot {
    width: 8px;
    height: 8px;
    background: rgb(var(--color-white));
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255,255,255,0.5);
    animation: dotPulse 2s ease-in-out infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.3s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes dotPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    .header-top {
      flex-direction: column;
      gap: var(--space-4);
      text-align: center;
    }

    .secondary-nav {
      gap: var(--space-4);
      flex-wrap: wrap;
      justify-content: center;
    }

    .page-title {
      font-size: 2rem;
    }

    .page-description {
      font-size: 1rem;
    }

    .breadcrumb-list {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .secondary-nav {
      gap: var(--space-2);
    }

    .nav-link {
      font-size: 0.75rem;
      padding: var(--space-1) var(--space-2);
    }

    .page-title {
      font-size: 1.75rem;
    }
  }
</style>
