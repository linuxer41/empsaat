<script lang="ts">
  import PageLayout from '$lib/components/PageLayout.svelte';
  import HeroCard from '$lib/components/HeroCard.svelte';
  import InfoCard from '$lib/components/InfoCard.svelte';
  import { Calculator, Droplets, Home, Building, Factory, School, CheckCircle, AlertCircle } from 'lucide-svelte';

  let selectedPlan = 'residencial';

  const tarifas = {
    residencial: {
      titulo: 'Tarifa Residencial',
      icon: Home,
      descripcion: 'Para viviendas particulares',
      consumo: [
        { rango: '0 - 10 m³', precio: 'Bs. 2.50', descripcion: 'Consumo básico' },
        { rango: '11 - 20 m³', precio: 'Bs. 3.20', descripcion: 'Consumo medio' },
        { rango: '21 - 30 m³', precio: 'Bs. 4.00', descripcion: 'Consumo alto' },
        { rango: '31+ m³', precio: 'Bs. 5.00', descripcion: 'Consumo excesivo' }
      ],
      cargos: [
        'Cargo fijo mensual: Bs. 15.00',
        'Conexión nueva: Bs. 800.00',
        'Medidor: Bs. 300.00',
        'Instalación: Bs. 500.00'
      ]
    },
    comercial: {
      titulo: 'Tarifa Comercial',
      icon: Building,
      descripcion: 'Para negocios y comercios',
      consumo: [
        { rango: '0 - 20 m³', precio: 'Bs. 4.00', descripcion: 'Consumo básico' },
        { rango: '21 - 50 m³', precio: 'Bs. 5.50', descripcion: 'Consumo medio' },
        { rango: '51 - 100 m³', precio: 'Bs. 7.00', descripcion: 'Consumo alto' },
        { rango: '101+ m³', precio: 'Bs. 8.50', descripcion: 'Consumo excesivo' }
      ],
      cargos: [
        'Cargo fijo mensual: Bs. 25.00',
        'Conexión nueva: Bs. 1,200.00',
        'Medidor: Bs. 500.00',
        'Instalación: Bs. 800.00'
      ]
    },
    industrial: {
      titulo: 'Tarifa Industrial',
      icon: Factory,
      descripcion: 'Para industrias y grandes consumos',
      consumo: [
        { rango: '0 - 100 m³', precio: 'Bs. 6.00', descripcion: 'Consumo básico' },
        { rango: '101 - 500 m³', precio: 'Bs. 8.00', descripcion: 'Consumo medio' },
        { rango: '501 - 1000 m³', precio: 'Bs. 10.00', descripcion: 'Consumo alto' },
        { rango: '1001+ m³', precio: 'Bs. 12.00', descripcion: 'Consumo excesivo' }
      ],
      cargos: [
        'Cargo fijo mensual: Bs. 50.00',
        'Conexión nueva: Bs. 2,500.00',
        'Medidor industrial: Bs. 1,200.00',
        'Instalación: Bs. 1,500.00'
      ]
    },
    institucional: {
      titulo: 'Tarifa Institucional',
      icon: School,
      descripcion: 'Para escuelas, hospitales y entidades públicas',
      consumo: [
        { rango: '0 - 50 m³', precio: 'Bs. 3.50', descripcion: 'Consumo básico' },
        { rango: '51 - 150 m³', precio: 'Bs. 4.50', descripcion: 'Consumo medio' },
        { rango: '151 - 300 m³', precio: 'Bs. 5.50', descripcion: 'Consumo alto' },
        { rango: '301+ m³', precio: 'Bs. 6.50', descripcion: 'Consumo excesivo' }
      ],
      cargos: [
        'Cargo fijo mensual: Bs. 20.00',
        'Conexión nueva: Bs. 1,000.00',
        'Medidor: Bs. 400.00',
        'Instalación: Bs. 600.00'
      ]
    }
  };
</script>

<PageLayout 
  title="Tarifas de Agua Potable"
  description="Consulta nuestras tarifas transparentes y competitivas para el servicio de agua potable en Tupiza."
  breadcrumbs={[{ label: 'Tarifas' }]}
>
  <svelte:fragment slot="hero">
    <HeroCard 
      title="Calculadora de Consumo"
      description="Calcula tu factura mensual"
      icon={Calculator}
    >
      <button class="btn btn-secondary">
        <Droplets size={20} />
        Calcular
      </button>
    </HeroCard>
  </svelte:fragment>

  <!-- Plan Selection -->
  <section class="section section-white">
    <div class="container">
      <h2 class="title-medium text-center text-gradient">Selecciona tu Tipo de Tarifa</h2>
      <div class="flex-center gap-4 flex-wrap">
        {#each Object.entries(tarifas) as [key, plan]}
          <button 
            class="btn {selectedPlan === key ? 'btn-primary' : 'btn-secondary'}"
            on:click={() => selectedPlan = key}
          >
            <svelte:component this={plan.icon} size={24} />
            {plan.titulo}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- Tariff Details -->
  <section class="section section-light">
    <div class="container">
      <div class="grid grid-2">
        <div class="tariff-info">
          <div class="text-center mb-8">
            <svelte:component this={tarifas[selectedPlan].icon} size={48} class="text-primary mb-4" />
            <h2 class="title-medium text-gradient">{tarifas[selectedPlan].titulo}</h2>
            <p class="text-large">{tarifas[selectedPlan].descripcion}</p>
          </div>

          <div class="card mb-8">
            <h3 class="title-small text-gradient">Tarifas por Consumo</h3>
            <div class="table">
              <div class="table-header">
                <span>Rango de Consumo</span>
                <span>Precio por m³</span>
                <span>Descripción</span>
              </div>
              {#each tarifas[selectedPlan].consumo as row}
                <div class="table-row">
                  <span class="range">{row.rango}</span>
                  <span class="price">{row.precio}</span>
                  <span class="description">{row.descripcion}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="card">
            <h3 class="title-small text-gradient">Cargos Adicionales</h3>
            <ul class="charges-list">
              {#each tarifas[selectedPlan].cargos as cargo}
                <li>
                  <CheckCircle size={16} />
                  {cargo}
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <div class="tariff-sidebar">
          <InfoCard 
            title="Información Importante"
            variant="primary"
          >
            <ul class="info-list">
              <li>Las tarifas se facturan mensualmente</li>
              <li>El consumo se mide en metros cúbicos (m³)</li>
              <li>Pagos vencen el día 15 de cada mes</li>
              <li>Recargos por mora: 5% mensual</li>
            </ul>
          </InfoCard>

          <InfoCard 
            title="Formas de Pago"
            variant="secondary"
          >
            <div class="payment-methods">
              <div class="payment-method">
                <span class="method-icon">🏦</span>
                <span>Bancos</span>
              </div>
              <div class="payment-method">
                <span class="method-icon">🏪</span>
                <span>Oficina</span>
              </div>
              <div class="payment-method">
                <span class="method-icon">📱</span>
                <span>Móvil</span>
              </div>
              <div class="payment-method">
                <span class="method-icon">💳</span>
                <span>Tarjeta</span>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="¿Tienes Dudas?"
            description="Nuestro equipo está disponible para resolver tus consultas sobre tarifas."
            variant="accent"
          >
            <a href="/contacto" class="btn btn-primary">
              <AlertCircle size={16} />
              Contactar
            </a>
          </InfoCard>
        </div>
      </div>
    </div>
  </section>

  <!-- Examples Section -->
  <section class="section section-white">
    <div class="container">
      <h2 class="title-medium text-center text-gradient">Ejemplos de Facturación</h2>
      <div class="grid grid-3">
        <div class="card">
          <h4 class="title-small text-gradient">Familia Pequeña</h4>
          <div class="example-details">
            <p><strong>Consumo:</strong> 15 m³</p>
            <p><strong>Cargo fijo:</strong> Bs. 15.00</p>
            <p><strong>Consumo:</strong> Bs. 48.00</p>
            <p class="total"><strong>Total:</strong> Bs. 63.00</p>
          </div>
        </div>
        <div class="card">
          <h4 class="title-small text-gradient">Familia Grande</h4>
          <div class="example-details">
            <p><strong>Consumo:</strong> 35 m³</p>
            <p><strong>Cargo fijo:</strong> Bs. 15.00</p>
            <p><strong>Consumo:</strong> Bs. 140.00</p>
            <p class="total"><strong>Total:</strong> Bs. 155.00</p>
          </div>
        </div>
        <div class="card">
          <h4 class="title-small text-gradient">Negocio Pequeño</h4>
          <div class="example-details">
            <p><strong>Consumo:</strong> 80 m³</p>
            <p><strong>Cargo fijo:</strong> Bs. 25.00</p>
            <p><strong>Consumo:</strong> Bs. 560.00</p>
            <p class="total"><strong>Total:</strong> Bs. 585.00</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</PageLayout>

<style>
  /* Estilos específicos para la página de tarifas */
  .mb-4 {
    margin-bottom: var(--space-4);
  }

  .mb-8 {
    margin-bottom: var(--space-8);
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .text-primary {
    color: rgb(var(--color-primary));
  }

  .table {
    border: 1px solid rgba(var(--color-gray-200), 0.5);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .table-header {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary)) 100%);
    color: rgb(var(--color-white));
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: var(--space-4);
    font-weight: 600;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: var(--space-4);
    border-bottom: 1px solid rgba(var(--color-gray-200), 0.3);
    transition: background-color var(--transition);
  }

  .table-row:hover {
    background: rgba(var(--color-primary), 0.05);
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .price {
    font-weight: 700;
    color: rgb(var(--color-primary));
  }

  .charges-list {
    list-style: none;
    padding: 0;
  }

  .charges-list li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) 0;
    color: rgb(var(--color-gray-600));
  }

  .charges-list li svg {
    color: rgb(var(--color-success));
    flex-shrink: 0;
  }

  .info-list {
    list-style: none;
    padding: 0;
  }

  .info-list li {
    padding: var(--space-1) 0;
    color: rgb(var(--color-gray-600));
    font-size: 0.875rem;
  }

  .info-list li::before {
    content: '•';
    color: rgb(var(--color-primary));
    font-weight: bold;
    margin-right: var(--space-2);
  }

  .payment-methods {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }

  .payment-method {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2);
    background: rgba(var(--color-primary), 0.1);
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
    color: rgb(var(--color-gray-700));
  }

  .method-icon {
    font-size: 1.25rem;
  }

  .example-details p {
    padding: var(--space-1) 0;
    color: rgb(var(--color-gray-600));
  }

  .example-details .total {
    font-size: 1.125rem;
    font-weight: 700;
    color: rgb(var(--color-primary));
    border-top: 1px solid rgba(var(--color-gray-300), 0.5);
    padding-top: var(--space-2);
    margin-top: var(--space-2);
  }

  @media (max-width: 768px) {
    .table-header,
    .table-row {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .payment-methods {
      grid-template-columns: 1fr;
    }
  }
</style>
