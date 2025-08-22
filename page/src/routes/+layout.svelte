<script>
  import '../lib/theme.css';
</script>

<svelte:head>
  <meta charset="utf-8" />
  <link rel="icon" href="/empsaat.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="EMPSAAT - Empresa de Servicios de Agua Potable de Tupiza, Bolivia. Servicios de agua potable, alcantarillado y saneamiento básico." />
  <meta name="keywords" content="agua potable, tupiza, bolivia, empsaat, servicios de agua, alcantarillado, saneamiento" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="EMPSAAT - Servicios de Agua Potable" />
  <meta property="og:description" content="Empresa de Servicios de Agua Potable de Tupiza, Bolivia" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://empsaat.gob.bo" />
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="EMPSAAT - Servicios de Agua Potable" />
  <meta name="twitter:description" content="Empresa de Servicios de Agua Potable de Tupiza, Bolivia" />
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
</svelte:head>

<div class="app">
  <slot />
</div>

<style>
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Outfit', sans-serif;
    background: rgb(var(--color-white));
    scroll-behavior: smooth;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Estilos globales para contenedores */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 var(--space-4);
  }

  @media (min-width: 640px) {
    .container { 
      max-width: 640px; 
      padding: 0 var(--space-6);
    }
  }

  @media (min-width: 768px) {
    .container { 
      max-width: 768px; 
      padding: 0 var(--space-8);
    }
  }

  @media (min-width: 1024px) {
    .container { 
      max-width: 1024px; 
      padding: 0 var(--space-8);
    }
  }

  @media (min-width: 1280px) {
    .container { 
      max-width: 1280px; 
      padding: 0 var(--space-8);
    }
  }

  /* Estilos globales para secciones */
  .section {
    padding: var(--space-16) 0;
  }

  .section-large {
    padding: var(--space-24) 0;
  }

  .section-small {
    padding: var(--space-8) 0;
  }

  /* Estilos globales para botones */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-lg);
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all var(--transition);
    font-size: 1rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    color: rgb(var(--color-white));
    box-shadow: var(--shadow-md);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-secondary {
    background: rgba(var(--color-white), 0.9);
    color: rgb(var(--color-gray-700));
    border: 2px solid rgba(var(--color-primary), 0.2);
  }

  .btn-secondary:hover {
    background: rgba(var(--color-primary), 0.1);
    border-color: rgb(var(--color-primary));
  }

  /* Estilos globales para cards */
  .card {
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.95) 0%, 
      rgba(var(--color-primary-lighter), 0.3) 100%);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 2px solid rgba(var(--color-primary), 0.2);
    backdrop-filter: blur(8px);
    padding: var(--space-6);
  }

  /* Estilos globales para formularios */
  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .form-group label {
    font-weight: 600;
    color: rgb(var(--color-gray-700));
    font-size: 0.875rem;
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
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: rgb(var(--color-primary));
    box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
  }

  /* Estilos globales para títulos */
  .title-large {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: var(--space-4);
  }

  .title-medium {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: var(--space-4);
  }

  .title-small {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: var(--space-3);
  }

  /* Estilos globales para texto */
  .text-large {
    font-size: 1.25rem;
    line-height: 1.6;
    color: rgb(var(--color-gray-600));
  }

  .text-medium {
    font-size: 1.125rem;
    line-height: 1.6;
    color: rgb(var(--color-gray-600));
  }

  .text-small {
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgb(var(--color-gray-500));
  }

  /* Estilos globales para gradientes de texto */
  .text-gradient {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Estilos globales para grids */
  .grid {
    display: grid;
    gap: var(--space-6);
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  /* Estilos globales para flexbox */
  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  /* Estilos globales para espaciado */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Estilos globales para animaciones */
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  /* Estilos responsivos globales */
  @media (max-width: 768px) {
    .title-large {
      font-size: 2rem;
    }

    .title-medium {
      font-size: 2rem;
    }

    .title-small {
      font-size: 1.25rem;
    }

    .text-large {
      font-size: 1.125rem;
    }

    .section {
      padding: var(--space-8) 0;
    }

    .section-large {
      padding: var(--space-16) 0;
    }

    .grid-2,
    .grid-3,
    .grid-4 {
      grid-template-columns: 1fr;
    }
  }
</style>
