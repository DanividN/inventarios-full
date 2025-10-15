import ActionMenu from '@/components/ui/ActionMenu';
import Modal from '@/components/ui/Modal';
import SaveButton from '@/components/ui/SaveButton';
import TableComponent from '@/components/ui/TableComponent';
import FormVerificaciones from '@/components/verificacion/FormVerifiaciones';
import { VerificacionFormValue } from '@/types/VerificacionFormValue';
import { router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function resguardatarios() {
    const { verificaciones, resguardatarios, verificador } = usePage().props;

    const defaultValues: VerificacionFormValue = {
        area_id: resguardatarios[0].area_id,
        verificador_id: '2',
        fecha_agendada: '',
        hora_agendada: '',
        direccion: '',
        periodo: '',
        resguardatarios_id: '',
    };

    const { register, handleSubmit,
        formState: { errors }, setValue, watch, control } =
    useForm<VerificacionFormValue>({
        defaultValues: defaultValues,
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'numEmpleado',
                label: 'Num. Empleado',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'nombre',
                label: 'Resguardatario',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'NumResguardos',
                label: 'Número de Resguardos',
                disableFilter: true,
            },
            {
                accessorKey: 'NumeroVerificaciones',
                label: 'Número de Verificaciones',
                disableFilter: true,
            },
            {
                accessorKey: 'fechaAgendada',
                label: 'Fecha de Agenda',
            },
            {
                accessorKey: 'avance',
                label: 'Avance',
                disableFilter: true,
            },
            {
                accessorKey: 'id',
                label: 'Acciones',
                disableFilter: true,
                cell: (info: any) => <ActionMenu to={`/funciones/verificaciones/show/${info.row.original.id}`} text={'Ver'} />,
            },
        ],
        [],
    );
    console.log(verificaciones)
    const data = verificaciones.map((verificacion) => ({
        id: verificacion.id,
        numEmpleado: verificacion.resguardatarios.numero_empleado,
        nombre: verificacion.resguardatarios.nombre + ' ' + verificacion.resguardatarios.apellido_paterno + ' ' + verificacion.resguardatarios.apellido_materno,
        NumResguardos: verificacion.resguardatarios.resguardos_activos,
        NumVerificaciones: verificacion.resguardatarios.resguardos_pendientes.filter((resguardo) => resguardo.estatus === 'verificado').length,
        fechaAgendada: new Date(verificacion.fecha_agendada).toLocaleDateString(),
        avance: verificacion.resguardatarios.resguardos_pendientes.filter((resguardo) => resguardo.estatus === 'verificado').length / verificacion.resguardatarios.resguardos_pendientes.length,
    }));

    const [verificacion, setVerificacion] = useState(false);
    const openModal = () => setVerificacion(true);
    const closeModal = () => setVerificacion(false);

    const SubmitVerificacion: SubmitHandler<VerificacionFormValue> = (data) => {
        router.post('/funciones/verificaciones', data, {
            onSuccess: () => {
                closeModal();
                toast.success('Verificación agendada con éxito');
            },
            onError: (error) => {
                console.error("Error al crear la verificación", error);
            },
        });
    };

    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonSecondary={true}
                titleButtonSecondary="+ Agendar Verificación"
                openModal={openModal}
                primaryButtonText={true}
            />
            {verificacion && (
                <Modal onClose={closeModal} title="Agendar Verificación">
                    <div className='flex flex-col gap-4'>
                        <div className='overflow-x-auto'>
                            <form onSubmit={handleSubmit(SubmitVerificacion)}>
                                <FormVerificaciones
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    watch={watch}
                                    control={control}
                                    verificador={verificador}
                                    resguardatarios={resguardatarios}
                                />
                                <div className="flex justify-center md:justify-end mt-6 gap-4">
                                    {/* boton para cerrar modal */}
                                    <button
                                        className='bg-white text-gray-400 rounded-lg px-6 py-2 mr-4 border hover:bg-gray-200'
                                        onClick={closeModal}
                                    >
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
