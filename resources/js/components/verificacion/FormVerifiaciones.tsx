import { Resguardatario } from '@/types/Resguardatario';
import { VerificacionFormValue } from '@/types/VerificacionFormValue';
import { Verificador } from '@/types/Verificador';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import TableComponent from '../ui/TableComponent';
import { useEffect, useMemo, useState } from 'react';

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
    verificador,
    resguardatarios,
    setValue,
}: FormVerifiacionesProps) {
    console.log(verificador);
    const optionsVerificador = verificador.map((ver) => ({
        value: ver.id,
        label: ver.nombre + ' ' + ver.apellido_paterno + ' ' + ver.apellido_materno,
    }));

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

     const data = resguardatarios.map((resguardatario) => ({
        id: resguardatario.id,
        nombre: resguardatario.nombre + ' ' + resguardatario.apellido_paterno + ' ' + resguardatario.apellido_materno,
        numero_empleado: resguardatario.numero_empleado,
        total_resguardos: resguardatario.total_resguardos,
    }));


    const columns = useMemo(
        () => [
            {
                accessorKey: 'select',
                header: () => (
                    <input
                        type="checkbox"
                        checked={selectedIds.length === data.length}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedIds(data.map((d) => d.id));
                            } else {
                                setSelectedIds([]);
                            }
                        }}
                    />
                ),
                cell: ({row}) => (
                    <input
                        type="checkbox"
                        checked={selectedIds.includes(row.original.id)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedIds((prev) => [...prev, row.original.id]);
                            } else {
                                setSelectedIds((prev) => prev.filter((id) => id !== row.original.id));
                            }
                        }}
                    />
                ),
                disableFilter: true,
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
        [data, selectedIds],
    );

    useEffect(() => {
        setValue('resguardatarios_id', selectedIds);
    }, [selectedIds, setValue]);


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
