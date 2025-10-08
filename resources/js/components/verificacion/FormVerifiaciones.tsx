import { Resguardatario } from '@/types/Resguardatario';
import { VerificacionFormValue } from '@/types/VerificacionFormValue';
import { Verificador } from '@/types/Verificador';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import TableComponent from '../ui/TableComponent';
import { useMemo, useState } from 'react';

type FormVerifiacionesProps = {
    control: Control<VerificacionFormValue>;
    register: UseFormRegister<VerificacionFormValue>;
    errors: Partial<VerificacionFormValue>;
    defaultValues: VerificacionFormValue;
    isEditing?: boolean;
    verificador: Verificador[];
    resguardatarios: Resguardatario[];
    setValue: UseFormSetValue<VerificacionFormValue>;
};

export default function FormVerificaciones({
    control,
    register,
    errors,
    defaultValues,
    isEditing = false,
    clasificaciones,
    verificador,
    resguardatarios,
    setValue,
}: FormVerifiacionesProps) {
    console.log(verificador);
    const optionsVerificador = verificador.map((ver) => ({
        value: ver.id,
        label: ver.nombre + ' ' + ver.apellido_paterno + ' ' + ver.apellido_materno,
    }));

    const columns = useMemo(
        () => [
            {
                accessorKey: 'select',
                label: '',
                disableFilter: true,
                cell: ({ row }: any) => (
                    <input type="checkbox" checked={selectedIds.includes(row.original.id)} onChange={() => handleSelect(row.original.id)} />
                ),
            },
            {
                accessorKey: 'nombre',
                label: 'Nombre',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'numero_empleado',
                label: 'Número de Empleado',
                filterFn: 'equalsString',
            },
            {
                accessorKey: 'total_resguardos',
                label: 'Número de Resguardos',
                filterFn: 'equalsString',
            },
        ],
        [],
    );

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelect = (id: number) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    const data = resguardatarios.map((resguardatario) => ({
        id: resguardatario.id,
        nombre: resguardatario.nombre + ' ' + resguardatario.apellido_paterno + ' ' + resguardatario.apellido_materno,
        numero_empleado: resguardatario.numero_empleado,
        total_resguardos: resguardatario.total_resguardos,
    }));

    return (
        <>
            <div className="mt-4 grid grid-cols-1 gap-4 gap-6 sm:grid-cols-2">
                <SelectField
                    id="verificador_id"
                    label="Verificador*"
                    options={optionsVerificador}
                    value={defaultValues}
                    control={control}
                    defaultValues={defaultValues}
                    rules={{
                        validate: (value) => value !== 0 || 'Este campo es requerido',
                    }}
                    errors={errors}
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 gap-6 sm:grid-cols-2">
                <InputField
                    id="fecha_agendada"
                    label="Fecha de la verificación*"
                    name="fecha_agendada"
                    type="date"
                    register={register}
                    errors={errors}
                    rules={{ required: 'Este campo es requerido' }}
                />
                <InputField
                    id="hora_agendada"
                    label="Hora de la verificación*"
                    name="hora_agendada"
                    type="time"
                    register={register}
                    errors={errors}
                    rules={{ required: 'Este campo es requerido' }}
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 gap-6 sm:grid-cols-2">
                <InputField
                    id="direccion"
                    label="Dirección*"
                    name="direccion"
                    register={register}
                    errors={errors}
                    rules={{ required: 'Este campo es requerido' }}
                />
                <InputField
                    id="periodo"
                    label="Periodo*"
                    name="periodo"
                    register={register}
                    errors={errors}
                    rules={{ required: 'Este campo es requerido' }}
                />
            </div>
            <div>
                <TableComponent
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    );
}
