import AppLayout from "@/layouts/app-layout";
import TableComponent from "@/components/ui/TableComponent";
import { useEffect, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import ActionMenu from "@/components/ui/ActionMenu";
import { toast } from "react-toastify";

export default function AreasIndex() {
    const { areas, successMessage, errorMessage } = usePage<{
        areas: any[];
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
                accessorKey: "no",
                label: "No",
                filterFn: "equalsString",
                disableFilter: true,
            },
            {
                accessorKey: "area",
                label: "Área",
                cell: (info: any) => info.getValue(),
                filterType: "select",
            },
            {
                accessorKey: "nomeclatura",
                label: "Nomenclatura",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "direccion",
                label: "Dirección",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "telefono",
                label: "Teléfono",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "id",
                label: "Acciones",
                cell: (info: any) => (
                    <ActionMenu
                        to={`/configuracion/areas/edit/${info.getValue()}`}
                        text="Ver"
                    />
                ),
                disableFilter: true,
            },
        ],
        []
    );

    const data = areas.map((area, index) => ({
        id: area.id,
        no: index + 1,
        area: area.name,
        nomeclatura: area.nomenclatura,
        direccion: area.colonia,
        telefono: area.telefono,
    }));

    return (
        <AppLayout>
            <TableComponent
                columns={columns}
                data={data}
                showButtonCreate={true}
                iconButtonCreate="+"
                titleButtonCreate="Agregar área"
                toButtonCreate="/configuracion/areas/crear"
            />
        </AppLayout>
    );
}
