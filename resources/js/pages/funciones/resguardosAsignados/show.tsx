import ActionMenu from "@/components/ui/ActionMenu";
import CardComponent from "@/components/ui/CardComponent";
import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { dateFormat } from "highcharts";
import { useMemo } from "react";

export default function show() {
    const {resguardos} = usePage().props;
    const columns = useMemo(() => [
        {
            accessorKey: 'fecha',
            label: 'Fecha de resguardo',
            filterFn: 'equalsString',
        },
        {
            accessorKey: 'NumInventario',
            label: 'Número de Inventario',
            filterFn: 'equalsString',
        },
        {
            accessorKey: 'CREG',
            label: 'creg',
            filterFn: 'equalsString',
        },
        {
            accessorKey: 'nombreBien',
            label: 'Nombre del Bien',
            filterFn: 'equalsString',
        },
        {
            accessorKey: 'estadoUso',
            label: 'Estado de Uso',
            filterFn: 'equalsString',
        },
        {
            accessorKey: 'Marca',
            label: 'Marca',
            filterFn: 'equalsString',
        },
        {
            accessorKey: 'Modelo',
            label: 'Modelo',
            filterFn: 'equalsString',
        },
        {
            accessorKey: 'documentoFirma',
            label: 'Documento con Firma',
            disableFilter: true,
        },
        {
            accessorKey: 'estatus',
            label: 'Estatus',
            disableFilter: true,
        },
        {
            accessorKey: 'formato_incidencia',
            label: 'Formato de Incidencia',
            disableFilter: true,
        }
        ], []);
    console.log(resguardos);
    const data = resguardos.map((resguardo) => ({
        id: resguardo.id,
        fecha: new Date(resguardo.created_at).toLocaleDateString(),
        NumInventario: resguardo.bienes_inventariable.numero_inventario,
        CREG: resguardo.creg,
        nombreBien: resguardo.bienes_inventariable.nombre,
        estadoUso: resguardo.bienes_inventariable.estado,
        Marca: resguardo.bienes_inventariable.marca,
        Modelo: resguardo.bienes_inventariable.modelo,
        // documentoFirma: resguardo.resguardo_firma,
        estatus: resguardo.estatus,
        formato_incidencia: resguardo.formato_resguardo,
    }));
    return (
        <>
            <CardComponent title={`${resguardos[0].trabajador.nombre} ${resguardos[0].trabajador.apellido_paterno} ${resguardos[0].trabajador.apellido_materno}`}>
                <div className="grid grid-cols-4 grid-rows-1 gap-6">
                    <div>
                        <span>Área:</span><br />
                        <span><strong>{resguardos[0].trabajador.area.name}</strong></span>
                    </div>
                    <div>
                        <span>Cargo:</span><br />
                        <span><strong>{resguardos[0].trabajador.cargo}</strong></span>
                    </div>
                    <div>
                        <span>Número de empleado:</span><br />
                        <span><strong>{resguardos[0].trabajador.numero_empleado}</strong></span>
                    </div>

                    <div>
                        <span>Folio de INE:</span><br />
                        <span><strong>{resguardos[0].trabajador.folio_ine}</strong></span>
                    </div>
                </div>
            </CardComponent>
            <TableComponent
                data={data}
                columns={columns}
            />
        </>
    );
}
