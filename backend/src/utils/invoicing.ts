enum TiposDeFactura {
    Servicios = "Servicios",
    CompraVenta = "CompraVenta"
}

interface ApiConfig {
    url: string;
    apiKey: string;
}

interface CampoAdicionalModel {
    clave: string;
    valor: string;
}

interface SolicitudModel {
    codigoModalidad: number;
    codigoEmision: number;
    codigoDocumentoSector: number;
    codigoSucursal: number;
    codigoAmbiente: number;
    codigoPuntoVenta: number;
    codigoActividad: number;
    nitEmisor: string;
    codigoTipoEvento: number;
    leyenda: string;
    numeroDocumento: string;
    codigoTipoDocumento: number;
    complementoDocumento: string;
    razonSocial: string;
    correoCliente?: string | null;
    fechaEmision?: string | null;
    numeroFactura?: number;
    formatoPdf?: string;
}

interface CabeceraModel {
    nitEmisor: number;
    razonSocialEmisor: string;
    municipio: string;
    telefono: string;
    numeroFactura?: number;
    cuf?: string;
    cufd?: string;
    codigoSucursal: number;
    direccion: string;
    codigoPuntoVenta: number;
    fechaEmision?: string | null;
    nombreRazonSocial: string;
    codigoTipoDocumentoIdentidad: number;
    numeroDocumento: string;
    complemento?: string | null;
    codigoCliente: string;
    codigoMetodoPago: number;
    numeroTarjeta?: number | null;
    montoTotal: number;
    montoTotalSujetoIva: number;
    codigoMoneda: number;
    tipoCambio: number;
    montoTotalMoneda: number;
    montoGiftCard: number;
    descuentoAdicional: number;
    codigoExcepcion: number;
    cafc?: string | null;
    leyenda: string;
    usuario: string;
    codigoDocumentoSector: number;
    camposAdicionales: CampoAdicionalModel[];
}

interface DetalleModel {
    actividadEconomica: number;
    codigoProductoSin: number;
    codigoProducto: string;
    descripcion: string;
    cantidad: number;
    unidadMedida: number;
    precioUnitario: number;
    montoDescuento: number;
    subTotal: number;
    camposAdicionales: CampoAdicionalModel[];
}

interface FacturaRequest {
    solicitud: SolicitudModel;
    cabecera: CabeceraModel;
    detalle: DetalleModel[];
    extraInfo: any[];
}

class FacturacionElectronica {
    private baseUrl: string;
    private apis: Map<TiposDeFactura, ApiConfig>;

    constructor(tipo: TiposDeFactura = TiposDeFactura.Servicios) {
        this.apis = new Map<TiposDeFactura, ApiConfig>();
        this.apis.set(TiposDeFactura.Servicios, {
            url: "http://code.iathings.com:3001",
            apiKey: "8b6d1b35ea7998191033237d588abd859e24af22895e2ec7574c8748a3be2cdcf5153f9bfca1d617167c6128ecd2880e7225fa0c7ada6461ca55fc52daec0fe4e1acee0d380323fccdb67b8a1cbf40c4d2718988e5bf5f7d95f98733af5152b84f0ceb500359fe385916bc775323a2d154ff0acc694e4ce36d8b696eea07c1498e5c642440022eef8a954eeee90dfd8d0c1d5d935cc5a768e640dd1fc764726fb5f7fca2c8ccb238d381fe03c8cb89a75f61e3fe32e7a984a7e8470b795a4df3637edcd913bdce45304a62ed8bd8485147ce0bd29dcbd8a82276568497146a02f6536288c3bb1f01c5c328ad92fff30568a1781634f8ed6052340d082d04dd81b20ed6ea77a4cecf1ab66d96b6a97107"
        });
        this.apis.set(TiposDeFactura.CompraVenta, {
            url: "https://factugest-api.iathings.com",
            apiKey: "332d6edaa8b474feac10a11303d33c514acf85a9a9439c19efa9677db82361f37cd54201f0255f820bcfc40e2c04cf95d85e7f76f3eb269ef863c2c729353a1897f98840e0bcb1c03cdf52e85d63f42e16b3ee1b1565e0e1948c1a87790add4b329262ae9b5c91c16b09dbeb659585dcb85e4cf7fa400c2abae943d5369fbd1dec2aa545f208dc109324808a40159f4682b85c67ec716f2dd3a31f8c21253ebf2b82529c5da9db11367a064fa6984f44986218a11e8926c635d33b44f8a43cd63a0cba3e2208cb2e1ee6ff4f10bff6adae8f581290bb2b59edd244f6e6f037656f6d3b39433c2c367599c9c4bd23aabac928ad830015e05662a59bbdc2c916754927587580119fc5492a0eebe19f3027"
        });

        const _apiConfig = this.apis.get(tipo);
        if (!_apiConfig) throw new Error("Tipo de factura no válido");
        this.baseUrl = _apiConfig.url;
    }

    obtenerTipoDocumento(documento: string): number {
        if (documento.length > 8) return 5;
        if (documento.length > 6) return 1;
        return 4;
    }

    async facturaServicios(
        periodo: Date,
        con_m3: number = 0,
        impTotal: number = 0,
        impAlcanta: number = 0,
        impRep: number = 0,
        impFactura: number = 0,
        impRecargo: number = 0,
        desc_ley1886: number = 0,
        razon: string = "",
        abonado: string = "",
        nit: string = "",
        zona: string = "",
        calle: string = "",
        numero: number = 0
    ): Promise<any> {
        const mes = periodo.toLocaleString('default', { month: 'long' });
        const gestion = periodo.getFullYear().toString();

        nit = nit === "0" ? abonado : nit;

        const descuento = desc_ley1886 > 0 ? desc_ley1886 : 0;

        const fechaHora = new Date();
        const formatoFechaHora = fechaHora.toISOString();

        const ajusteSejetoIvaTotal = parseFloat((impAlcanta + impRep + impRecargo).toFixed(2));

        const ajusteSejetoIvaDetalleJson: { [key: string]: string } = {};
        if (impAlcanta > 0) ajusteSejetoIvaDetalleJson["Alcantarillado"] = impAlcanta.toString();
        if (impRep > 0) ajusteSejetoIvaDetalleJson["Rep. Formulario"] = impRep.toString();
        if (impRecargo > 0) ajusteSejetoIvaDetalleJson["Recargo"] = impRecargo.toString();

        const camposAdicionales: CampoAdicionalModel[] = [
            { clave: "numeroMedidor", valor: "0" },
            { clave: "mes", valor: mes },
            { clave: "gestion", valor: gestion },
            { clave: "ciudad", valor: "Tupiza" },
            { clave: "zona", valor: zona },
            { clave: "domicilioCliente", valor: `${calle} ${numero}` }
        ];

        if (desc_ley1886 > 0) {
            camposAdicionales.push({ clave: "beneficiarioLey1886", valor: nit });
        }

        const solicitud: SolicitudModel = {
            codigoModalidad: 1,
            codigoEmision: 1,
            codigoDocumentoSector: 13,
            codigoSucursal: 0,
            codigoAmbiente: 1,
            codigoPuntoVenta: 0,
            codigoActividad: 360000,
            nitEmisor: "1023807025",
            codigoTipoEvento: 0,
            leyenda: "Leyenda",
            numeroDocumento: nit,
            codigoTipoDocumento: 1,
            complementoDocumento: "",
            razonSocial: razon,
            correoCliente: null,
            fechaEmision: null
        };

        const cabecera: CabeceraModel = {
            nitEmisor: 1023807025,
            razonSocialEmisor: "EMPSAAT",
            municipio: "TUPIZA",
            telefono: "(2) 6944636",
            codigoSucursal: 0,
            direccion: "Calle Bolivar S/N Zona central",
            codigoPuntoVenta: 0,
            nombreRazonSocial: razon,
            codigoTipoDocumentoIdentidad: this.obtenerTipoDocumento(nit),
            numeroDocumento: nit,
            complemento: null,
            codigoCliente: abonado,
            codigoMetodoPago: 1,
            numeroTarjeta: null,
            montoTotal: impFactura,
            montoTotalSujetoIva: impFactura,
            codigoMoneda: 1,
            tipoCambio: 1,
            montoTotalMoneda: impFactura,
            montoGiftCard: 0,
            descuentoAdicional: 0,
            codigoExcepcion: 1,
            cafc: null,
            leyenda: "hola",
            usuario: "Santiago",
            codigoDocumentoSector: 13,
            fechaEmision: null,
            camposAdicionales: camposAdicionales
        };

        const detalle: DetalleModel[] = [
            {
                actividadEconomica: 360000,
                codigoProductoSin: 86330,
                codigoProducto: "001",
                descripcion: "SUBTOTAL SERVICIO DE AGUA",
                cantidad: 1,
                unidadMedida: 58,
                precioUnitario: impTotal + descuento,
                montoDescuento: descuento,
                subTotal: impTotal,
                camposAdicionales: []
            }
        ];

        const facturaRequest: FacturaRequest = {
            solicitud,
            cabecera,
            detalle,
            extraInfo: []
        };

        const response = await fetch(`${this.baseUrl}/api/v1/invoice-utils/third-party-create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': this.apis.get(TiposDeFactura.Servicios)?.apiKey || ""
            },
            body: JSON.stringify(facturaRequest)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const result = await response.json();
        return result;
    }

    async facturaCompraVenta(
        facturaDetalle: { codigoProducto: string; descripcion: string; cantidad: number; precioUnitario: number; subTotal: number }[],
        impTotal: number = 0,
        razon: string = "",
        abonado: string = "",
        nit: string = "",
    ): Promise<any> {
        nit = nit === "0" ? abonado : nit;

        const fechaHora = new Date();
        const formatoFechaHora = fechaHora.toISOString();

        const solicitud: SolicitudModel = {
            codigoModalidad: 1,
            codigoEmision: 1,
            codigoDocumentoSector: 1,
            codigoSucursal: 0,
            codigoAmbiente: 1,
            codigoPuntoVenta: 0,
            codigoActividad: 360000,
            nitEmisor: "1023807025",
            codigoTipoEvento: 0,
            leyenda: "Leyenda",
            numeroDocumento: nit,
            codigoTipoDocumento: 1,
            complementoDocumento: "",
            razonSocial: razon,
            correoCliente: null,
            fechaEmision: formatoFechaHora
        };

        const cabecera: CabeceraModel = {
            nitEmisor: 1023807025,
            razonSocialEmisor: "EMPSAAT",
            municipio: "TUPIZA",
            telefono: "(2) 6944636",
            codigoSucursal: 0,
            direccion: "Calle Bolivar S/N Zona central",
            codigoPuntoVenta: 0,
            nombreRazonSocial: razon,
            codigoTipoDocumentoIdentidad: this.obtenerTipoDocumento(nit),
            numeroDocumento: nit,
            complemento: null,
            codigoCliente: abonado,
            codigoMetodoPago: 1,
            numeroTarjeta: null,
            montoTotal: impTotal,
            montoTotalSujetoIva: impTotal,
            codigoMoneda: 1,
            tipoCambio: 1,
            montoTotalMoneda: impTotal,
            montoGiftCard: 0,
            descuentoAdicional: 0,
            codigoExcepcion: 1,
            cafc: null,
            leyenda: "hola",
            usuario: "Santiago",
            codigoDocumentoSector: 1,
            fechaEmision: formatoFechaHora,
            camposAdicionales: []
        };

        const detalle: DetalleModel[] = facturaDetalle.map(item => ({
            actividadEconomica: 360000,
            codigoProductoSin: 86330,
            codigoProducto: item.codigoProducto,
            descripcion: item.descripcion,
            cantidad: item.cantidad,
            unidadMedida: 62,
            precioUnitario: item.precioUnitario,
            montoDescuento: 0,
            subTotal: item.subTotal,
            camposAdicionales: []
        }));

        const facturaRequest: FacturaRequest = {
            solicitud,
            cabecera,
            detalle,
            extraInfo: []
        };

        const response = await fetch(`${this.baseUrl}/api/v1/invoice-utils/third-party-create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': this.apis.get(TiposDeFactura.CompraVenta)?.apiKey || ""
            },
            body: JSON.stringify(facturaRequest)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const result = await response.json();
        return result;
    }

    async anularFactura(cuf: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}/api/v1/invoice-utils/anular`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': this.apis.get(TiposDeFactura.Servicios)?.apiKey || ""
            },
            body: JSON.stringify({
                cuf,
                codigoMotivo: 1
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const result = await response.json();
        return result;
    }

    async getPDF(cuf: string, abonado: number): Promise<string> {
        const response = await fetch(`${this.baseUrl}/api/v1/invoice-utils/pdf?cuf=${cuf}&formato=4`, {
            method: 'GET',
            headers: {
                'api_key': this.apis.get(TiposDeFactura.Servicios)?.apiKey || ""
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const blob = await response.blob();
        const filePath = `./facturas/factura_abonado_${abonado}.pdf`;
        const buffer = await blob.arrayBuffer();
        const fs = require('fs');
        fs.writeFileSync(filePath, Buffer.from(buffer));
        return filePath;
    }
}

const facturacionCompraVenta = new FacturacionElectronica(TiposDeFactura.CompraVenta);
const facturacionServicios = new FacturacionElectronica(TiposDeFactura.Servicios);

export { facturacionCompraVenta, facturacionServicios };