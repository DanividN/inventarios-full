import ActionMenu from "@/components/ui/ActionMenu";
import TableComponent from "@/components/ui/TableComponent";
import AppLayout from "@/layouts/app-layout";
import { usePage } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { useMemo } from "react";

export default function Clasificacion() {

    const { clasificacion } = usePage<{
        clasificacion: any[]
    }>().props;

    const columns = useMemo(
        () => [
            { accessorKey: "clave", label: "Clave", cell: (info: any) => info.getValue(), filterFn: "equalsString" },
            { accessorKey: "clasificacion", label: "Nombre", cell: (info: any) => info.getValue(), filterFn: "includesStringSensitive" },
            { accessorKey: "descripcion", label: "Descripción", cell: (info: any) => info.getValue(), filterFn: "includesStringSensitive" },
            {
                accessorKey: "id",
                label: "Acciones",
                cell: (info: any) => (
                    <ActionMenu to={`/configuracion/clasificacion/edit/${info.row.original.id}`} text="Ver" />
                ),
                disableFilter: true
            },
        ], []
    );

    const data = clasificacion.map((clasificacion) => ({
        id: clasificacion.id,
        clave: clasificacion.clave,
        clasificacion: clasificacion.clasificacion,
        descripcion: clasificacion.descripcion
    }));

    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonCreate={true}
                iconButtonCreate={<PlusIcon />}
                titleButtonCreate="Agregar Clasificación"
                toButtonCreate="/configuracion/clasificacion/crear"
            />
        </>
    )
}
