<script lang="ts">
  export let title: string;
  export let description: string = '';
  export let icon: any = null;
  export let variant: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' = 'primary';
  export let hover: boolean = true;
</script>

<div class="info-card {variant} {hover ? 'hover' : ''}">
  {#if icon}
    <div class="icon-wrapper">
      <svelte:component this={icon} size={32} />
    </div>
  {/if}
  
  <h3 class="title">{title}</h3>
  
  {#if description}
    <p class="description">{description}</p>
  {/if}
  
  <slot />
</div>

<style>
  .info-card {
    background: linear-gradient(135deg, 
      rgba(var(--color-primary), 0.1) 0%, 
      rgba(var(--color-secondary), 0.1) 100%);
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    text-align: center;
    border: 1px solid rgba(var(--color-primary), 0.2);
    transition: all var(--transition);
  }

  .info-card.hover:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }

  .info-card.secondary {
    background: linear-gradient(135deg, 
      rgba(var(--color-secondary), 0.1) 0%, 
      rgba(var(--color-accent), 0.1) 100%);
    border-color: rgba(var(--color-secondary), 0.2);
  }

  .info-card.accent {
    background: linear-gradient(135deg, 
      rgba(var(--color-accent), 0.1) 0%, 
      rgba(var(--color-primary), 0.1) 100%);
    border-color: rgba(var(--color-accent), 0.2);
  }

  .info-card.success {
    background: linear-gradient(135deg, 
      rgba(var(--color-success), 0.1) 0%, 
      rgba(var(--color-secondary), 0.1) 100%);
    border-color: rgba(var(--color-success), 0.2);
  }

  .info-card.warning {
    background: linear-gradient(135deg, 
      rgba(var(--color-warning), 0.1) 0%, 
      rgba(var(--color-accent), 0.1) 100%);
    border-color: rgba(var(--color-warning), 0.2);
  }

  .info-card.error {
    background: linear-gradient(135deg, 
      rgba(var(--color-error), 0.1) 0%, 
      rgba(var(--color-warning), 0.1) 100%);
    border-color: rgba(var(--color-error), 0.2);
  }

  .icon-wrapper {
    margin-bottom: var(--space-4);
    color: rgb(var(--color-primary));
  }

  .info-card.secondary .icon-wrapper {
    color: rgb(var(--color-secondary));
  }

  .info-card.accent .icon-wrapper {
    color: rgb(var(--color-accent));
  }

  .info-card.success .icon-wrapper {
    color: rgb(var(--color-success));
  }

  .info-card.warning .icon-wrapper {
    color: rgb(var(--color-warning));
  }

  .info-card.error .icon-wrapper {
    color: rgb(var(--color-error));
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--color-primary));
    margin: var(--space-4) 0;
  }

  .info-card.secondary .title {
    color: rgb(var(--color-secondary));
  }

  .info-card.accent .title {
    color: rgb(var(--color-accent));
  }

  .info-card.success .title {
    color: rgb(var(--color-success));
  }

  .info-card.warning .title {
    color: rgb(var(--color-warning));
  }

  .info-card.error .title {
    color: rgb(var(--color-error));
  }

  .description {
    color: rgb(var(--color-gray-600));
    font-size: 0.875rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .info-card {
      padding: var(--space-4);
    }

    .title {
      font-size: 1.125rem;
    }
  }
</style>
