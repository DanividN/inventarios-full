import FormatoFirmado from '@/components/resguardosPendientes/FormatoFirmado';
import FormCreg from '@/components/resguardosPendientes/FormCreg';
import ActionMenu from '@/components/ui/ActionMenu';
import CancelButton from '@/components/ui/CancelButton';
import Modal from '@/components/ui/Modal';
import SaveButton from '@/components/ui/SaveButton';
import TableComponent from '@/components/ui/TableComponent';
import { ResguardosPendientesFormValues } from '@/types/ResguardosPendientesFormValues';
import { router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ResguardosPendientes() {
    const [isModalEtiquetasOpen, setIsModalEtiquetasOpen] = useState(false);

    const openModal = () => setIsModalEtiquetasOpen(true);
    const closeModal = () => setIsModalEtiquetasOpen(false);

    const { pendientes, areas } = usePage().props;

    const columns = useMemo(
        () => [
            {
                accessorKey: 'noInventario',
                label: 'Nº de inventario',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'area',
                label: 'Área solicitante',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'Asignado',
                label: 'Asignado',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'nombreBien',
                label: 'Nombre del bien',
                filterFn: 'includesStringSensitive',
            },
            {
                accessorKey: 'estadoUso',
                label: 'Estado de uso',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'movimiento',
                label: 'Movimiento',
                cell: (info: any) => info.getValue(),
                filterType: 'select',
            },
            {
                accessorKey: 'formatoResguardo',
                label: 'Formato de resguardo',
                cell: (info: any) => <button className="rounded-md border border-blue-400 px-2 py-1 text-blue-500">Descargar</button>,
                disableFilter: true,
            },
            {
                accessorKey: 'formatoFirmado',
                label: 'Formato firma',
                cell: ({ row }: any) => <FormatoFirmado row={row} />,
                disableFilter: true,
            },
            {
                accessorKey: 'acciones',
                label: 'Datos del bien',
                cell: (info: any) => <ActionMenu to={`/funciones/resguardos/pendientes/show/${info.row.original.id}`} text={'Ver'} />,
                disableFilter: true,
            },
        ],
        [],
    );
    console.log(pendientes);
    const data = pendientes.map((pendiente) => ({
        id: pendiente.id,
        noInventario: pendiente.bienes_inventariable.numero_inventario,
        area: pendiente.bienes_inventariable.area.name,
        Asignado: pendiente.trabajador.nombre + ' ' + pendiente.trabajador.apellido_paterno + ' ' + pendiente.trabajador.apellido_materno,
        nombreBien: pendiente.bienes_inventariable.nombre,
        estadoUso: pendiente.bienes_inventariable.estado.toUpperCase(),
        movimiento: pendiente.movimiento,
        formatoResguardo: pendiente.formato_resguardo,
        formatoFirmado: pendiente.resguardo_firma,
    }));

    const defaultValues: ResguardosPendientesFormValues = {
        trabajador_id: 0,
        area_id: 0,
        creg: '',
        bienes_inventariables_id: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        reset,
    } = useForm<ResguardosPendientesFormValues>({ defaultValues: defaultValues });

    // traer trabajador por area
    const [trabajadores, setTrabajadores] = useState<any[]>([]);
    const [articulos, setArticulos] = useState<any[]>([]);

    const handleAreaChange = async (selectedOption: any) => {
        try {
            const responseTrabajadores = await fetch(`/trabajadoresArea/${selectedOption.value}`);
            const responseArticulos = await fetch(`/articulosArea/${selectedOption.value}`);

            const dataTrabajadores = await responseTrabajadores.json();
            const dataArticulos = await responseArticulos.json();

            const trabajadoresOptions = dataTrabajadores.map((trabajador: any) => ({
                value: trabajador.id,
                label: trabajador.nombre + ' ' + trabajador.apellido_paterno + ' ' + trabajador.apellido_materno,
            }));

            const articulosOptions = dataArticulos.map((articulo: any) => ({
                value: articulo.id,
                label: articulo.numero_inventario + ' - ' + articulo.nombre,
            }));

            setTrabajadores(trabajadoresOptions);
            setArticulos(articulosOptions);
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
        }
    };

    const onSubmit: SubmitHandler<ResguardosPendientesFormValues> = (data) => {
        router.post('/funciones/resguardos/pendientes', data, {
            onSuccess: () => {
                toast.success('Resguardo pendiente creado correctamente.');
                reset();
                closeModal();
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof ResguardosPendientesFormValues, {
                        type: 'server',
                        message: message as string,
                    });
                });
            },
        });
    };

    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonSecondary={true}
                titleButtonSecondary="+ Agregar CREG"
                openModal={openModal}
                primaryButtonText={true}
            />
            {isModalEtiquetasOpen && (
                <Modal onClose={closeModal} title="Agregar CREG">
                    <div className="flex flex-col gap-4">
                        <div className="overflow-x-auto">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormCreg
                                    register={register}
                                    errors={errors}
                                    defaultValues={defaultValues}
                                    isEditing={false}
                                    control={control}
                                    setValue={setValue}
                                    areas={areas}
                                    handleAreaChange={handleAreaChange}
                                    trabajadores={trabajadores}
                                    articulos={articulos}
                                />
                                <div className="mt-6 flex justify-center md:justify-end">
                                    <CancelButton link="/funciones/inventarios/inventariables" />
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
