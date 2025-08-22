<script lang="ts">
  export let title: string;
  export let description: string = '';
  export let icon: any = null;
  export let variant: 'primary' | 'secondary' | 'accent' | 'error' = 'primary';
  export let animate: boolean = true;
</script>

<div class="hero-card {variant} {animate ? 'animate-float' : ''}">
  {#if icon}
    <div class="icon-wrapper">
      <svelte:component this={icon} size={48} />
    </div>
  {/if}
  
  <h3 class="title">{title}</h3>
  
  {#if description}
    <p class="description">{description}</p>
  {/if}
  
  <slot />
</div>

<style>
  .hero-card {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    color: rgb(var(--color-white));
    padding: var(--space-8);
    border-radius: var(--radius-2xl);
    text-align: center;
    box-shadow: var(--shadow-xl);
    position: relative;
    overflow: hidden;
  }

  .hero-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  }

  .hero-card.secondary {
    background: linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-accent)) 100%);
  }

  .hero-card.accent {
    background: linear-gradient(135deg, rgb(var(--color-accent)) 0%, rgb(var(--color-primary)) 100%);
  }

  .hero-card.error {
    background: linear-gradient(135deg, rgb(var(--color-error)) 0%, rgb(var(--color-warning)) 100%);
  }

  .icon-wrapper {
    margin-bottom: var(--space-4);
    position: relative;
    z-index: 1;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: var(--space-4) 0;
    position: relative;
    z-index: 1;
  }

  .description {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--space-4);
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .hero-card {
      padding: var(--space-6);
    }

    .title {
      font-size: 1.25rem;
    }
  }
</style>
