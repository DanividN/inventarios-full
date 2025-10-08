<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Entrega de Bienes - {{ $entrega->folio }}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        .header, .footer { text-align: center; }
        .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .table th, .table td { border: 1px solid #000; padding: 6px; text-align: center; }
        .section { margin-top: 20px; }
        .signatures td { padding: 15px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Entrega de Bienes</h2>
        <p><strong>Folio:</strong> {{ $entrega->folio }}</p>
        <p><strong>Dependencia:</strong> Dirección de Proyectos y Costos</p>
        <p><strong>Fecha:</strong> {{ now()->format('d/m/Y') }} <strong>Hora:</strong> {{ now()->format('h:i a') }}</p>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Partida de gasto</th>
                <th>Número de inventario</th>
                <th>Estado de uso</th>
                <th>Descripción</th>
                <th>Costo unitario</th>
            </tr>
        </thead>
        <tbody>
            @foreach($bienes as $bien)
                <tr>
                    <td>{{ $bien->partida_gasto ?? '-' }}</td>
                    <td>{{ $bien->numero_inventario ?? '-' }}</td>
                    <td>{{ $bien->estado_uso ?? '-' }}</td>
                    <td>{{ $bien->descripcion ?? '-' }}</td>
                    <td>{{ $bien->costo_unitario ?? 0 }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="section">
        <strong>Comentarios:</strong>
        <p>{{ $entrega->descripcion ?? 'Ninguno' }}</p>
    </div>

    <table class="table signatures">
        <tr>
            <td>
                <strong>Enlace Administrativo</strong><br>
                Nombre: {{ $entrega->enlace }}<br><br>
                Firma: ______________________
            </td>
            <td>
                <strong>Trabajador</strong><br>
                Nombre: {{ $entrega->entregado_por }}<br><br>
                Firma: ______________________
            </td>
            <td>
                <strong>Almacén</strong><br>
                Firma: ______________________
            </td>
        </tr>
    </table>
</body>
</html>
