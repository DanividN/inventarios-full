import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

export default function entregasConsumoIndex() {

    const { consumos } = usePage<{
        consumos: any[]
    }>().props;

    const columns = useMemo(
        () => [
            {
                accessorKey: "noArticulo",
                label: "Nº de artículo",
                filterFn: "equalsString",
            },
            {
                accessorKey: "nombreArticulo",
                label: "Nombre del artículo",
                cell: (info) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "descripcion",
                label: "Descripción",
                cell: (info) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "clasificacion",
                label: "Clasificación",
                cell: (info) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "cantidad",
                label: "Cantidad",
                cell: (info) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "unidad",
                label: "Unidad de medida",
                cell: (info) => info.getValue(),
                filterFn: "includesStringSensitive",
            }], []
    );
    const data = consumos.map((consumo) => ({
        id: consumo.id,
        noArticulo: consumo.articulo.numero_parte,
        nombreArticulo: consumo.articulo.articulo,
        descripcion: consumo.articulo.descripcion,
        clasificacion: consumo.clasificacion.clave + " - " + consumo.clasificacion.clasificacion,
        cantidad: consumo.cantidad,
        unidad: consumo.unidad_medida,
    }));

    return (
        <TableComponent
            columns={columns}
            data={data}
            showButtonCreate={true}
            iconButtonCreate="+"
            titleButtonCreate="Entrega de consumibles"
            toButtonCreate="/funciones/entregas/consumo/crear"
            showButtonHistorial={true}
            titleButtonHistorial="Historial de entregas"
            toButtonHistorial="/funciones/entregas/consumo/historial"
        />
    );
}
