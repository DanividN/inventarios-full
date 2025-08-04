import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { use, useMemo } from "react";

export default function BienesConsumoHistory() {
    const { consumos } = usePage<{
        consumos: any[];
    }>().props;

    const columns = useMemo(
        () => [
            {
            accessorKey: "fecha",
            label: "Fecha de registro",
            cell: (info: any) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "proveedor",
            label: "Proveedor",
            cell: (info: any) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "RFC",
            label: "RFC",
            cell: (info: any) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "recibe",
            label: "Recibe",
            cell: (info: any) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "cantidad",
            label: "Cantidad",
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: "unidadMedida",
            label: "Unidad de medida",
            cell: (info: any) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "costoUnitario",
            label: "Costo unitario",
            cell: (info: any) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "costoTotal",
            label: "Costo total",
            cell: (info: any) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        ],[]
    );

    const data = consumos.map((consumo) => ({
        id: consumo.id,
        fecha: new Date(consumo.created_at).toLocaleDateString(),
        proveedor: consumo.proveedor.tipo === 'fisica' ? consumo.proveedor.nombre + ' ' + consumo.proveedor.apellido_paterno + ' ' + consumo.proveedor.apellido_materno : consumo.proveedor.razon_social,
        RFC: consumo.proveedor.rfc,
        recibe: consumo.users ? consumo.users.name : 'No especificado'
        ,
        cantidad: consumo.cantidad,
        unidadMedida: consumo.unidad_medida,
        costoUnitario: consumo.costo_unitario,
        costoTotal: consumo.costo_total,
    }));

    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
            />
        </>
    )
}
