import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

export default function HistoryEntregasInventariables() {

    const { entregas } = usePage<{
        entregas: any[]
    }>().props;

    const [uploadedFiles, setUploadedFiles] = useState({})

    const handleFileUpload = (folio, file) => {
        setUploadedFiles((prev) => ({
            ...prev,
            [folio]: file,
        }))
    }

    const columns = useMemo(() => [
        {
            accessorKey: "folio",
            label: "Folio de entrega",
            filterFn: "equalsString",
        },
        {
            accessorKey: "fecha",
            label: "Fecha de entrega",
            filterFn: "equalsString",
        },
        {
            accessorKey: "area",
            label: "Área solicitante",
            filterFn: "equalsString",
        },
        {
            accessorKey: "entregado",
            label: "Entregado por",
            filterFn: "equalsString",
        },
        {
            accessorKey: "documento",
            label: "Documento de impresión",
            cell: (info) => (
                <a href={info.getValue()} className="bg-withe border border-blue-500 text-blue-500 px-2 py-1 rounded-md hover:bg-blue-200 hover:text-blue-700 inline-flex items-center gap-2" target="_blank" rel="noreferrer">
                    Descargar
                </a>
            ),
            disableFilter: true,
        },
        {
            accessorKey: "documentoFirmado",
            label: "Documento firmado",
            cell: (info) => {
                const folio = info.row.original.folio
                const hasFile = uploadedFiles[folio]

                return (
                    <div className="">
                        <input
                            type="file"
                            className="hidden"
                            id={`file-${folio}`}
                            onChange={(e) => handleFileUpload(folio, e.target.files?.[0] || null)}
                            accept=".pdf,.doc,.docx"
                        />

                        {hasFile ? (
                            <div className="">
                                <span className="bg-green-100 border border-green-500 text-green-700 px-3 py-1 rounded-md font-medium">
                                    Completo
                                </span>
                            </div>
                        ) : (
                            <label
                                htmlFor={`file-${folio}`}
                                className="bg-red-100 border border-red-500 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 cursor-pointer font-medium"
                            >
                                Pendiente
                            </label>
                        )}
                    </div>
                )
            },
            disableFilter: true,
        },
    ], []);

    const data = entregas.map((entrega) => ({
        folio: entrega.folio,
        fecha: new Date(entrega.created_at).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }),
        area: entrega.area.name,
        entregado: entrega.entregado_por,
        documento: '',
        documentoFirmado: '',
    }));

    return (
        <TableComponent
            columns={columns}
            data={data}
        />
    )
}
