import { MovimientosFormValue } from '@/types/MovimientosFormValue';
import { Resguardatario } from '@/types/Resguardatario';
import { useEffect, useMemo, useState } from 'react';
import { Control, FormState, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import SelectField from '../ui/SelectField';
import TableComponent from '../ui/TableComponent';
import { Area } from '@/types/Areas';
import TextAreaField from '../ui/TextArea';
import InputField from '../ui/InputField';

type FormMovimientosProps = {
    control: Control<MovimientosFormValue>;
    register: UseFormRegister<MovimientosFormValue>;
    errors: FormState<MovimientosFormValue>['errors'];
    setValue: UseFormSetValue<MovimientosFormValue>;
    defaultValues: MovimientosFormValue;
    resguardos: Resguardatario[];
    trabajadores: Trabajadores[];
    areas: Area[];
};

export default function FormMovimientos({ control, register, errors, setValue, defaultValues, resguardos, trabajadores, areas }: FormMovimientosProps) {
    const [movimiento, setMovimiento] = useState(defaultValues.movimiento || '');

    useEffect(() => {
        if (defaultValues.movimiento) {
            setMovimiento(defaultValues.movimiento);
        }
    }, [defaultValues.movimiento]);

    const handleChangeMovimiento = (selectedOption: any) => {
        setMovimiento(selectedOption);
        setValue('movimiento', selectedOption.value);

        // 🔹 Limpiar los otros campos cuando cambia el tipo de movimiento
        setValue('trabajador_id', '');
        setValue('area_id', '');
    };

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const data = resguardos.map((resguardo) => ({
        id: resguardo.id,
        NumInventario: resguardo.bienes_inventariable.numero_inventario,
        CREG: resguardo.creg,
        nombreBien: resguardo.bienes_inventariable.nombre,
        costoUnitario: resguardo.bienes_inventariable.costo_unitario,
    }));

    const columns = useMemo(
        () => [
            {
                accessorKey: 'select',
                header: () => (
                    <input
                        type="checkbox"
                        checked={selectedRows.length === data.length}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedRows(data.map((d) => d.id));
                            } else {
                                setSelectedRows([]);
                            }
                        }}
                    />
                ),
                cell: ({ row }: any) => (
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(row.original.id)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedRows((prev) => [...prev, row.original.id]);
                            } else {
                                setSelectedRows((prev) => prev.filter((id) => id !== row.original.id));
                            }
                        }}
                    />
                ),
                disableFilter: true,
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
                accessorKey: 'costoUnitario',
                label: 'Estado de Uso',
                filterFn: 'equalsString',
            },
        ],
        [data, selectedRows],
    );

    const optionsTrabajadores = trabajadores.map((trabajador) => ({
        value: trabajador.id,
        label: trabajador.nombre + ' ' + trabajador.apellido_paterno + ' ' + trabajador.apellido_materno,
    }));

    const optionsAreas = areas.map((area) => ({
        value: area.id,
        label: area.name,
    }));

    useEffect(() => {
        setValue('resguardos', selectedRows);
    }, [selectedRows, setValue]);

    return (
        <>
            <div className="mt-4 grid grid-cols-1 gap-4 gap-6 sm:grid-cols-2">
                <SelectField
                    id="movimiento"
                    label="Movimiento*"
                    options={[
                        { value: '1', label: 'Desasignar' },
                        { value: '2', label: 'Reasignar' },
                        { value: '3', label: 'Transferir' },
                    ]}
                    value={movimiento}
                    control={control}
                    rules={{
                        validate: (value) => !!value || 'Este campo es requerido',
                    }}
                    errors={errors}
                    onChange={handleChangeMovimiento}
                />
                {movimiento?.value === '2' && (
                    <SelectField
                        id="trabajador_id"
                        label="Trabajador*"
                        options={optionsTrabajadores}
                        value={defaultValues}
                        control={control}
                        defaultValues={defaultValues}
                        rules={{
                            validate: (value) => value !== 0 || 'Este campo es requerido',
                        }}
                        errors={errors}
                    />
                )}
                {movimiento?.value === '3' && (
                    <SelectField
                        id="area_id"
                        label="Área*"
                        options={optionsAreas}
                        value={defaultValues}
                        control={control}
                        defaultValues={defaultValues}
                        rules={{
                            validate: (value) => value !== 0 || 'Este campo es requerido',
                        }}
                        errors={errors}
                    />
                )}

            </div>
            <div className="mt-6 mb-6">{movimiento && <TableComponent data={data} columns={columns} />}</div>
            <div>
                 <TextAreaField
                    id="descripcion"
                    label="Descripción*"
                    control={control}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    defaultValues={defaultValues}
                />
            </div>
        </>
    );
}
