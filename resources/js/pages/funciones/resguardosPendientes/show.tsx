import CardComponent from '@/components/ui/CardComponent';
import TableComponent from '@/components/ui/TableComponent';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export default function ResguardosPendientesShow() {
    const { resguardo, historial_resguardos } = usePage<{
        resguardo: any;
        historial_resguardos: any;
    }>().props;

    const columns = useMemo(() => [
        {
            accessorKey: 'fechaResguardo',
            label: 'Fecha de resguardo',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'fechaBaja',
            label: 'Fecha de baja',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'nombreResguardatario',
            label: 'Nombre del resguardatario',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'descripcion',
            label: 'Descripción',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'estado',
            label: 'Estado de uso',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
    ]);

    const data = historial_resguardos.map((historial_resguardo) => {
        return {
            fechaResguardo: new Date(historial_resguardo.created_at).toLocaleDateString(),
            fechaBaja: new Date(historial_resguardo.updated_at).toLocaleDateString(),
            nombreResguardatario: historial_resguardo.trabajador.nombre + ' ' + historial_resguardo.trabajador.apellido_paterno + ' ' + historial_resguardo.trabajador.apellido_materno,
            descripcion: historial_resguardo.descripcion ?? '-',
            estado: historial_resguardo.estatus,
        };
    });

    return (
        <>
            <CardComponent title={`${resguardo.bienes_inventariable.numero_inventario} - ${resguardo.bienes_inventariable?.nombre}`}>
                <div className="grid grid-cols-4 grid-rows-3 gap-6">
                    <div>
                        <span>Clasificación del bien:</span>
                        <br />
                        <span>
                            <strong>
                                {resguardo.bienes_inventariable.clasificacion.clave} - {resguardo.bienes_inventariable.clasificacion.clasificacion}
                            </strong>
                        </span>
                    </div>
                    <div>
                        <span>Nombre:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.nombre}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Número de póliza:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.numero_poliza ?? 'No aplica'}</strong>
                        </span>
                    </div>

                    <div>
                        <span>Costo unitario:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.costo_unitario ?? 'No aplica'}</strong>
                        </span>
                    </div>

                    <div>
                        <span>Grupo del activo:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.grupo_activo}</strong>
                        </span>
                    </div>

                    <div>
                        <span>Modelo:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.modelo}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Número económico:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.numero_economico ?? 'No aplica'}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Tipo de póliza:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.tipo_poliza ?? 'No aplica'}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Área que solicita:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.area.name}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Serie:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.serie}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Estado de uso:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.estado}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Proveedor:</span>
                        <br />
                        <span>
                            <strong>
                                {resguardo.bienes_inventariable.proveedor.nombre} {resguardo.bienes_inventariable.proveedor.apellido_paterno}{' '}
                                {resguardo.bienes_inventariable.proveedor.apellido_materno}
                            </strong>
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-rows-1 gap-6">
                    <div>
                        <span>Descripción:</span>
                        <br />
                        <span>
                            <strong>{resguardo.bienes_inventariable.descripcion}</strong>
                        </span>
                    </div>
                </div>
            </CardComponent>

            <div className="mt-4 mb-4 w-auto rounded-2xl bg-white p-4 shadow">
                {JSON.parse(resguardo.bienes_inventariable.imagenes).map((path, index) => (
                    <img
                        src={`/funciones/inventarios/inventariables/${path.split('/').pop()}`}
                        alt={`${resguardo.bienes_inventariable.nombre}`}
                        className="h-auto w-25"
                    />
                ))}
            </div>

            <CardComponent title="Movimientos">
                <TableComponent data={data} columns={columns} />
            </CardComponent>
        </>
    );
}
