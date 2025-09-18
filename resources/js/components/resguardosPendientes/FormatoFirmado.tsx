import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function FormatoFirmado({ row }: { row: any }) {
    const [status, setStatus] = useState(row.original.formatoFirmado ? 'Completado' : 'Pendiente');
    const [fileUrl, setFileUrl] = useState(row.original.formatoFirmado ?? null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', row.original.id);

        router.post('/formato-firmado/carga', formData, {
            forceFormData: true,
            onSuccess: (page) => {
                // ⚡ aquí asumo que devuelves la ruta del archivo en la DB
                const newFile = page.props.flash?.file ?? null;
                setFileUrl(newFile);
                setStatus('Completado');
            },
        });
    };

    if (status === 'Pendiente') {
        return (
            <label className="cursor-pointer rounded-md border border-gray-400 px-2 py-1">
                Pendiente
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
        );
    }
    return (
        <a
            href={`/storage/${fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-green-200 px-2 py-1 text-green-800 hover:bg-green-300"
        >
            Completado
        </a>
    );
}
