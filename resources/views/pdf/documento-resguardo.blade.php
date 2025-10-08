<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tarjeta de Resguardo {{ $resguardo->numero_creg ?? '' }}</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            color: #000;
            margin: 30px;
        }
        .bordered {
            border: 1px solid #000;
            border-collapse: collapse;
        }
        .bordered td, .bordered th {
            border: 1px solid #000;
            padding: 4px;
            vertical-align: top;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .header-table {
            width: 100%;
            margin-bottom: 5px;
        }
        .header-table td {
            font-size: 10px;
        }
        .section-title {
            font-weight: bold;
            background-color: #f1f1f1;
            text-align: center;
        }
        .firma {
            height: 60px;
            vertical-align: bottom;
            text-align: center;
        }
    </style>
</head>
<body>

    <table class="header-table">
        <tr>
            <td width="33%">
                <strong>Tarjeta de Resguardo</strong><br>
                Versión vigente no. 06<br>
                FOR-DOA-SRM-002<br>
                <strong>27 de Agosto de 2018</strong>
            </td>
            <td width="33%" class="center">
                <strong>Dirección de Administración</strong><br>
                Subdirección de Recursos Materiales
            </td>
            <td width="33%" class="center">
                <img src="{{ public_path('img/logo-metepec.png') }}" alt="Logo" width="80"><br>
                <strong>Metepec</strong><br>
                Gobierno que Decide Contigo
            </td>
        </tr>
    </table>

    <table class="bordered" width="100%">
        <tr>
            <td colspan="4" class="right"><strong>Fecha de Inventario:</strong> {{ $resguardo->fecha_inventario ?? now()->format('d/m/Y') }}</td>
        </tr>
        <tr>
            <td colspan="4"><strong>No. CREG:</strong> {{ $resguardo->numero_creg ?? 'S/N' }}</td>
        </tr>
        <tr>
            <td><strong>Presidencia Municipal</strong></td>
            <td><strong>Coordinación de Gobierno Digital y Electrónico</strong></td>
            <td><strong>Dependencia:</strong> {{ $resguardo->dependencia ?? '' }}</td>
            <td><strong>Departamento:</strong> {{ $resguardo->departamento ?? '' }}</td>
        </tr>
        <tr>
            <td><strong>Clasificación del Bien:</strong> {{ $resguardo->clasificacion_bien ?? '' }}</td>
            <td><strong>Número de Inventario:</strong> {{ $resguardo->numero_inventario ?? '' }}</td>
            <td><strong>Grupo de Activo:</strong> {{ $resguardo->grupo_activo ?? '' }}</td>
            <td><strong>Estado de Uso:</strong> {{ $resguardo->estado_uso ?? '' }}</td>
        </tr>
        <tr>
            <td><strong>Marca:</strong> {{ $resguardo->marca ?? '' }}</td>
            <td><strong>Modelo:</strong> {{ $resguardo->modelo ?? '' }}</td>
            <td><strong>No. de Serie:</strong> {{ $resguardo->numero_serie ?? '' }}</td>
            <td><strong>Color:</strong> {{ $resguardo->color ?? '' }}</td>
        </tr>
        <tr>
            <td><strong>No. de Motor:</strong> {{ $resguardo->numero_motor ?? 'S/N' }}</td>
            <td><strong>No. de Placas:</strong> {{ $resguardo->numero_placas ?? 'S/N' }}</td>
            <td><strong>No. Económico:</strong> {{ $resguardo->numero_economico ?? 'S/N' }}</td>
            <td><strong>Material:</strong> {{ $resguardo->material ?? 'N/A' }}</td>
        </tr>
        <tr>
            <td><strong>No. de Factura:</strong> {{ $resguardo->numero_factura ?? '' }}</td>
            <td><strong>Fecha de Ingreso:</strong> {{ $resguardo->fecha_ingreso ?? '' }}</td>
            <td><strong>Valor:</strong> ${{ number_format($resguardo->valor ?? 0, 2) }}</td>
            <td><strong>Tipo Póliza:</strong> {{ $resguardo->tipo_poliza ?? '' }}</td>
        </tr>
        <tr>
            <td colspan="2"><strong>No. de Póliza:</strong> {{ $resguardo->numero_poliza ?? '' }}</td>
            <td colspan="2"><strong>Proveedor:</strong> {{ $resguardo->proveedor ?? '' }}</td>
        </tr>
        <tr>
            <td colspan="4"><strong>Descripción:</strong><br>{{ $resguardo->descripcion ?? '' }}</td>
        </tr>
        <tr>
            <td colspan="4"><strong>Observaciones:</strong><br>{{ $resguardo->observaciones ?? '' }}</td>
        </tr>
    </table>

    <table class="bordered" width="100%" style="margin-top: 10px;">
        <tr class="section-title">
            <td>Fecha</td>
            <td>Nombre y Firma del Resguardatario</td>
            <td>Enlace Nombre y Firma</td>
            <td>Revisó Control Patrimonial</td>
        </tr>
        <tr>
            <td class="firma">{{ $resguardo->fecha_firma ?? now()->format('d/m/Y') }}</td>
            <td class="firma">
                {{ $resguardo->resguardatario ?? '' }}<br><br>_____________________
            </td>
            <td class="firma">
                {{ $resguardo->enlace ?? '' }}<br><br>_____________________
            </td>
            <td class="firma">
                {{ $resguardo->control_patrimonial ?? '' }}<br><br>_____________________
            </td>
        </tr>
    </table>

    <p style="margin-top: 10px; font-size: 9px; text-align: center;">
        “Morelos #28 Norte, Barrio de Santa Cruz Metepec, Edo. de México. Tel. 2355870”
    </p>

</body>
</html>
