import FormMovimientos from '@/components/resguardoAsignados/FormMovimientos';
import CardComponent from '@/components/ui/CardComponent';
import Modal from '@/components/ui/Modal';
import SaveButton from '@/components/ui/SaveButton';
import TableComponent from '@/components/ui/TableComponent';
import { router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { MovimientosFormValue } from '@/types/MovimientosFormValue';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function show() {
    const { resguardos, trabajadores, areas } = usePage().props;
    const columns = useMemo(
        () => [
            {
                accessorKey: 'fecha',
                label: 'Fecha de resguardo',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'NumInventario',
                label: 'Número de Inventario',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'CREG',
                label: 'creg',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'nombreBien',
                label: 'Nombre del Bien',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'estadoUso',
                label: 'Estado de Uso',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'Marca',
                label: 'Marca',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'Modelo',
                label: 'Modelo',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'documentoFirma',
                label: 'Documento con Firma',
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
        ],
        [],
    );
    const data = resguardos.map((resguardo) => ({
        id: resguardo.id,
        fecha: new Date(resguardo.created_at).toLocaleDateString(),
        NumInventario: resguardo.bienes_inventariable.numero_inventario,
        CREG: resguardo.creg,
        nombreBien: resguardo.bienes_inventariable.nombre,
        estadoUso: resguardo.bienes_inventariable.estado,
        Marca: resguardo.bienes_inventariable.marca,
        Modelo: resguardo.bienes_inventariable.modelo,
        documentoFirma: resguardo.resguardo_firma,
    }));

    const [nuevaVerificacion, setNuevaVerificacion] = useState(false);
    const openModal = () => setNuevaVerificacion(true);
    const closeModal = () => setNuevaVerificacion(false);

    const defaultValues: MovimientosFormValue = {
       movimiento: '',
       area_id: '',
       trabajador_id: '',
       descripcion: '',
       resguardos: [],
    };

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues : defaultValues,
    });

    const onSubmit: SubmitHandler<MovimientosFormValue> = (data) => {
        router.post('/funciones/resguardos/asignados/movimientos', data, {
            onSuccess: () => {
                closeModal();
                toast.success('Movimiento registrado con éxito');
            },
            onError: () => {
                toast.error('Error al registrar movimiento');
            },
        });
    }

    return (
        <>
            <CardComponent
                title={`${resguardos[0].trabajador.nombre} ${resguardos[0].trabajador.apellido_paterno} ${resguardos[0].trabajador.apellido_materno}`}
                buttonModal="Movimientos"
                openModal={openModal}
            >
                <div className="grid grid-cols-4 grid-rows-1 gap-6">
                    <div>
                        <span>Área:</span>
                        <br />
                        <span>
                            <strong>{resguardos[0].trabajador.area.name}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Cargo:</span>
                        <br />
                        <span>
                            <strong>{resguardos[0].trabajador.cargo}</strong>
                        </span>
                    </div>
                    <div>
                        <span>Número de empleado:</span>
                        <br />
                        <span>
                            <strong>{resguardos[0].trabajador.numero_empleado}</strong>
                        </span>
                    </div>

                    <div>
                        <span>Folio de INE:</span>
                        <br />
                        <span>
                            <strong>{resguardos[0].trabajador.folio_ine}</strong>
                        </span>
                    </div>
                </div>
            </CardComponent>
            <TableComponent data={data} columns={columns} />
            {nuevaVerificacion && (
                <Modal onClose={closeModal} title="Movimientos">
                    <div className="flex flex-col gap-4">
                        <div className="overflow-x-auto h-auto">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormMovimientos
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    defaultValues={defaultValues}
                                    resguardos={resguardos}
                                    trabajadores={trabajadores}
                                    areas={areas}
                                />
                                <div className='flex justify-end'>
                                    <button className="mr-4 rounded-lg border bg-white px-6 py-2 text-gray-400 hover:bg-gray-200" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                    <SaveButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
