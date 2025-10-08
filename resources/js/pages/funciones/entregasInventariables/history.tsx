import DocInventariableFirmado from '@/components/entregaInventariable/DocInventariableFirmado';
import TableComponent from '@/components/ui/TableComponent';
import { usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function HistoryEntregasInventariables() {
    const { entregas } = usePage<{
        entregas: any[];
    }>().props;

    const [uploadedFiles, setUploadedFiles] = useState({});

    const handleFileUpload = (folio, file) => {
        setUploadedFiles((prev) => ({
            ...prev,
            [folio]: file,
        }));
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'folio',
                label: 'Folio de entrega',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'fecha',
                label: 'Fecha de entrega',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'area',
                label: 'Área solicitante',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'entregado',
                label: 'Entregado por',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'documento',
                label: 'Documento de impresión',
                cell: (info) => (
                    <a
                        href={info.getValue()}
                        className="inline-flex items-center gap-2 rounded-md border border-blue-500 bg-white px-2 py-1 text-blue-500 hover:bg-blue-200 hover:text-blue-700"
                        download={true}
                        rel="noreferrer"
                    >
                        Descargar
                    </a>
                ),
                disableFilter: true,
            },
            {
                accessorKey: 'documentoFirmado',
                label: 'Documento con firma',
                cell: ({ row }: any) => <DocInventariableFirmado row={row} />,
                disableFilter: true,
            },
        ],
        [],
    );

    const data = entregas.map((entrega) => ({
        id: entrega.id,
        folio: entrega.folio,
        fecha: new Date(entrega.created_at).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }),
        area: entrega.area.name,
        entregado: entrega.entregado_por,
        documento: entrega.documento_entrega,
        documentoFirmado: entrega.documento_firmado,
    }));

    return <TableComponent columns={columns} data={data} />;
}
