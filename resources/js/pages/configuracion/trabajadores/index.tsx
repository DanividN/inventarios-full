import ActionMenu from "@/components/ui/ActionMenu";
import TableComponent from "@/components/ui/TableComponent";
import AppLayout from "@/layouts/app-layout";
import { usePage } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

export default function TrabajadoresIndex() {
    const { trabajadores, successMessage, errorMessage } = usePage<{
        trabajadores: any[];
        successMessage?: string
        errorMessage?: string
    }>().props;

    useEffect(() => {
        if (successMessage) toast.success(successMessage)
        if (errorMessage) toast.error(errorMessage)
    }, [successMessage, errorMessage])

    const columns = useMemo(
        () => [
            {
                accessorKey: "fechaIngreso",
                label: "Fecha de Ingreso",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "noEmpleado",
                label: "No. Empleado",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "nombre",
                label: "Nombre",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "area",
                label: "Área",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "telefono",
                label: "Telefono",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "id",
                label: "Acciones",
                cell: (info: any) => (
                    <ActionMenu
                        to={`/configuracion/trabajadores/edit/${info.getValue()}`}
                        text="Ver"
                    />
                ),
                disableFilter: true
            }
        ]
    )

    const data = trabajadores.map((trabajador, index) => ({
        id: trabajador.id,
        no: index + 1,
        fechaIngreso: trabajador.fecha_ingreso,
        noEmpleado: trabajador.numero_empleado,
        nombre: trabajador.nombre,
        area: trabajador.area.name,
        telefono: trabajador.telefono,
    }))

    return (
            <TableComponent
                columns={columns}
                data={data}
                showButtonCreate={true}
                iconButtonCreate={<PlusIcon />}
                titleButtonCreate="Agregar Trabajador"
                toButtonCreate="/configuracion/trabajadores/crear"
            />
    )
}
