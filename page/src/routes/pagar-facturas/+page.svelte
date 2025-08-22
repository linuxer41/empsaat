<script lang="ts">
  import { onMount } from 'svelte';
  import PageLayout from '$lib/components/PageLayout.svelte';
  import HeroCard from '$lib/components/HeroCard.svelte';
  import InfoCard from '$lib/components/InfoCard.svelte';
  import { CreditCard, ArrowRight, Loader2, Shield, Clock, CheckCircle } from 'lucide-svelte';

  let redirecting = true;
  let countdown = 3;

  onMount(() => {
    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        window.location.href = 'https://pagui.iathings.com/recaudaciones/empsaat';
      }
    }, 1000);

    return () => clearInterval(timer);
  });
</script>

<svelte:head>
  <title>Pagar Facturas - EMPSAAT</title>
  <meta name="description" content="Paga tus facturas de agua potable de EMPSAAT en línea de manera segura y rápida">
</svelte:head>

<PageLayout 
  title="Pagar Facturas"
  description="Realiza el pago de tus facturas de agua potable de manera segura y rápida en línea."
  breadcrumbs={[{ label: 'Pagar Facturas' }]}
  heroSection={true}
>
  <div slot="hero-content">
    <div class="redirect-info">
      <div class="redirect-card">
        <CreditCard size={48} />
        <h3>Redirigiendo al Sistema de Pagos</h3>
        <p>Serás redirigido automáticamente al sistema de pagos en línea en <strong>{countdown}</strong> segundos.</p>
        
        <div class="loading-animation">
          <Loader2 size={24} />
          <span>Preparando el sistema de pagos...</span>
        </div>

        <div class="redirect-actions">
          <a href="https://pagui.iathings.com/recaudaciones/empsaat" class="btn btn-primary">
            Ir Ahora
            <ArrowRight size={20} />
          </a>
          <button class="btn btn-secondary" on:click={() => window.history.back()}>
            Volver
          </button>
        </div>
      </div>
    </div>

    <div class="payment-features">
      <InfoCard 
        title="Múltiples Formas de Pago"
        description="Tarjetas de crédito, débito y transferencias bancarias"
        icon={CreditCard}
        variant="primary"
      />
      <InfoCard 
        title="Pago Seguro"
        description="Transacciones protegidas con encriptación SSL"
        icon={Shield}
        variant="success"
      />
      <InfoCard 
        title="Proceso Rápido"
        description="Pago instantáneo y confirmación inmediata"
        icon={Clock}
        variant="accent"
      />
    </div>
  </div>

  <section class="section section-white">
    <div class="container">
      <h2 class="title-large text-center mb-6">Información Importante</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard 
          title="¿Qué necesitas para pagar?"
          description=""
          icon={CheckCircle}
          variant="primary"
        >
          <ul class="info-list">
            <li>Número de medidor o cuenta</li>
            <li>Monto a pagar</li>
            <li>Método de pago preferido</li>
            <li>Datos de facturación</li>
          </ul>
        </InfoCard>
        
        <InfoCard 
          title="Horarios de Atención"
          description=""
          icon={Clock}
          variant="secondary"
        >
          <ul class="info-list">
            <li>Sistema en línea: 24/7</li>
            <li>Atención telefónica: Lunes a Viernes 8:00 - 18:00</li>
            <li>Oficina: Lunes a Viernes 8:00 - 16:00</li>
          </ul>
        </InfoCard>
        
        <InfoCard 
          title="Después del Pago"
          description=""
          icon={CheckCircle}
          variant="success"
        >
          <ul class="info-list">
            <li>Recibirás confirmación por email</li>
            <li>El pago se refleja en 24-48 horas</li>
            <li>Guarda el comprobante de pago</li>
            <li>Consulta tu saldo actualizado</li>
          </ul>
        </InfoCard>
      </div>
    </div>
  </section>
</PageLayout>

<style>
  .redirect-info {
    margin-bottom: var(--space-8);
  }

  .redirect-card {
    background: linear-gradient(135deg, 
      rgba(var(--color-white), 0.95) 0%, 
      rgba(var(--color-primary-lighter), 0.3) 100%);
    padding: var(--space-8);
    border-radius: var(--radius-2xl);
    text-align: center;
    box-shadow: var(--shadow-xl);
    border: 2px solid rgba(var(--color-primary), 0.2);
    backdrop-filter: blur(8px);
    animation: cardFloat 3s ease-in-out infinite;
    margin-bottom: var(--space-6);
  }

  @keyframes cardFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .redirect-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(var(--color-primary));
    margin: var(--space-4) 0;
  }

  .redirect-card p {
    color: rgb(var(--color-gray-600));
    margin-bottom: var(--space-6);
  }

  .loading-animation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    margin: var(--space-6) 0;
    color: rgb(var(--color-primary));
    font-weight: 600;
  }

  .loading-animation svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .redirect-actions {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
  }

  .payment-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-6);
  }

  .info-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-4);
  }

  .info-list li {
    padding: var(--space-1) 0;
    color: rgb(var(--color-gray-600));
    font-size: 0.875rem;
    position: relative;
    padding-left: var(--space-4);
  }

  .info-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: rgb(var(--color-success));
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .redirect-actions {
      flex-direction: column;
      align-items: center;
    }

    .payment-features {
      grid-template-columns: 1fr;
    }
  }
</style>
