import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

export default function EntregasInventariables() {

    const { inventariables } = usePage<{
        inventariables: any[]
    }>().props;

    const columns = useMemo(() => [
            {
            accessorKey: "noInventario",
            label: "Nº Inventario",
            filterFn: "equalsString",
        },
        {
            accessorKey: "nombreArticulo",
            label: "Nombre del artículo",
            cell: (info) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "marca",
            label: "Marca",
            cell: (info) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "modelo",
            label: "Modelo",
            cell: (info) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "estado",
            label: "Estado de uso",
            cell: (info) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
        {
            accessorKey: "costoUnitario",
            label: "Costo unitario",
            cell: (info) => info.getValue(),
            filterFn: "includesStringSensitive",
        },
    ], []);

    const data = inventariables.map((inventariable) => ({
        noInventario: inventariable.numero_inventario,
        nombreArticulo: inventariable.nombre,
        marca: inventariable.marca,
        modelo: inventariable.modelo,
        estado: inventariable.estado,
        costoUnitario: inventariable.costo_unitario,
    }));

    return (
        <TableComponent
            columns={columns}
            data={data}
            showButtonCreate={true}
            iconButtonCreate="+"
            titleButtonCreate="Entrega de bienes"
            toButtonCreate="/funciones/entregas/inventariables/crear"
            showButtonHistorial={true}
            titleButtonHistorial="Historial de entregas"
            toButtonHistorial="/funciones/entregas/inventariables/historial"
        />
    )
}
