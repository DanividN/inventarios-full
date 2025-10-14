import ActionMenu from "@/components/ui/ActionMenu";
import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

export default function resguardatariosIndex() {
    const {resguardatarios} = usePage().props;

    const columns = useMemo(() => [
        {
           accessorKey: 'numEmpleado',
           label: 'Num. Empleado',
           filterFn: 'equalsString',
        },
        {
            accessorKey: 'nombre',
            label: 'Resguardatario',
            filterFn: 'equalsString',
         },
         {
            accessorKey: 'NumResguardo',
            label: 'Num. de Resguardos',
            disableFilters: true,
        },
        {
            accessorKey: 'id',
            label: 'Acciones',
            disableFilters: true,
            cell: (info:any) =>{
                const {NumResguardo, id} = info.row.original;
                // Si tiene 0 resguardos, no muestra el botón
                if(NumResguardo == 0) return null;

                return <ActionMenu to={`/funciones/resguardos/asignados/show/${id}`} text="Ver" />;
            }
        }
        ], []);
    console.log(resguardatarios);
    const data = resguardatarios.map((resguardos) => ({
        id: resguardos.id,
        numEmpleado: resguardos.numero_empleado,
        nombre: resguardos.nombre + ' ' + resguardos.apellido_paterno + ' ' + resguardos.apellido_materno,
        NumResguardo: resguardos.total_resguardos,
    }));
    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                title={'Resguardatarios'}
            />
        </>
    )
}

