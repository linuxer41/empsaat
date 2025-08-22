<script lang="ts">
  import SecondaryHeader from './SecondaryHeader.svelte';
  import Footer from './Footer.svelte';

  export let title: string;
  export let description: string = '';
  export let breadcrumbs: Array<{ label: string; href?: string }> = [];
  export let showHero: boolean = true;
</script>

<svelte:head>
  <title>{title} - EMPSAAT</title>
  <meta name="description" content={description} />
</svelte:head>

<SecondaryHeader 
  {title}
  {description}
  {breadcrumbs}
/>

<main class="page-main">
  {#if showHero}
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <slot name="hero" />
        </div>
      </div>
    </section>
  {/if}

  <div class="page-content">
    <slot />
  </div>
</main>

<Footer />

<style>
  .page-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .hero-section {
    padding-top: var(--space-16);
    padding-bottom: var(--space-16);
    background: linear-gradient(135deg, 
      rgb(var(--color-primary-lighter)) 0%, 
      rgb(var(--color-secondary-lighter)) 50%, 
      rgb(var(--color-accent-lighter)) 100%);
    position: relative;
    overflow: hidden;
  }

  .hero-section::before {
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

  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }

  .page-content {
    flex: 1;
  }

  /* Estilos específicos para diferentes tipos de páginas */
  .page-content :global(.section) {
    padding: var(--space-16) 0;
  }

  .page-content :global(.section-large) {
    padding: var(--space-24) 0;
  }

  .page-content :global(.section-small) {
    padding: var(--space-8) 0;
  }

  /* Estilos para secciones con fondos específicos */
  .page-content :global(.section-white) {
    background: rgb(var(--color-white));
  }

  .page-content :global(.section-light) {
    background: linear-gradient(135deg, 
      rgb(var(--color-secondary-lighter)) 0%, 
      rgb(var(--color-white)) 50%, 
      rgb(var(--color-primary-lighter)) 100%);
  }

  .page-content :global(.section-gradient) {
    background: linear-gradient(135deg, 
      rgb(var(--color-primary-lighter)) 0%, 
      rgb(var(--color-secondary-lighter)) 50%, 
      rgb(var(--color-accent-lighter)) 100%);
  }

  @media (max-width: 768px) {
    .hero-section {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }

    .hero-content {
      min-height: 200px;
    }
  }
</style>
