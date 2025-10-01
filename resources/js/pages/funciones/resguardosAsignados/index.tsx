import ActionMenu from "@/components/ui/ActionMenu";
import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

export default function Index() {

    const { resguardosAsignados } = usePage().props;

    const columns = useMemo(
        () => [
            {
                accessorKey: 'area',
                label: 'Área',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'numResguardatarios',
                label: 'Número de resguardatarios',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'numResguardos',
                label: 'Número de resguardos',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'id',
                label: 'Acciones',
                cell: (info: any) => <ActionMenu to={`/funciones/resguardos/asignados/resguardatarios/${info.row.original.id}`} text={'Ver'} />,
                disableFilter: true,
            },
        ],
        [],
    );
    console.log(resguardosAsignados);
    const data = resguardosAsignados.map((resguardoAsignado) => ({
        id: resguardoAsignado.id,
        area: resguardoAsignado.name,
        numResguardatarios: resguardoAsignado.trabajadores_con_resguardo,
        numResguardos: resguardoAsignado.total_resguardos_firmados_area,
    }));
    return (
        <>
           <TableComponent
            columns={columns}
            data={data}
           />
        </>
    );
}
