import ActionMenu from "@/components/ui/ActionMenu";
import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { useMemo } from "react";

export default function Articulos() {

    const { articulos } = usePage<{
        articulos: any[]
    }>().props;

    const columns = useMemo(
    () => [
      { accessorKey: "fechaAlta", label: "Fecha de alta", cell: (info) => info.getValue(), filterFn: "includesStringSensitive" },
      { accessorKey: "numParte", label: "Número de parte", cell: (info) => info.getValue(), filterFn: "includesStringSensitive" },
      { accessorKey: "tipoBien", label: "Tipo de bien", cell: (info) => info.getValue(), filterType: "select" },
      { accessorKey: "nombre", label: "Nombre", cell: (info) => info.getValue(), filterFn: "includesStringSensitive" },
      { accessorKey: "clasificacion", label: "Clasificación del bien", cell: (info) => info.getValue(), filterFn: "includesStringSensitive" },
      { accessorKey: "unidad", label: "Unidad de medida", cell: (info) => info.getValue(), filterType: "select" },
      { accessorKey: "stock", label: "Stock minimo", cell: (info) => info.getValue(), filterFn: "includesStringSensitive" },
      {
        accessorKey: "acciones",
        label: "Acciones",
        cell: (info) => (
          <ActionMenu to={`/configuracion/articulos/edit/${info.row.original.id}`} text="Ver" />
        ),
        disableFilter: true
      },
    ], []
  )

  const data = articulos.map((articulo) => ({
    id: articulo.id,
    fechaAlta: new Date(articulo.created_at).toLocaleDateString(),
    numParte: articulo.numero_parte,
    tipoBien: articulo.tipo,
    nombre: articulo.articulo,
    clasificacion: articulo.clasificacion.clave + " - " + articulo.clasificacion.clasificacion,
    unidad: articulo.unidad_medida,
    stock: articulo.stock_minimo
  }))
    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonCreate={true}
                iconButtonCreate={<PlusIcon />}
                titleButtonCreate="Nuevo Articulo"
                toButtonCreate="/configuracion/articulos/crear"
            />
        </>
    )
}
