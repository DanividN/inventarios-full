import { InventariablesFormValues } from '@/types/InventariablesFormValues';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CancelButton from '../ui/CancelButton';
import CardComponent from '../ui/CardComponent';
import EditButton from '../ui/EditButton';
import SaveButton from '../ui/SaveButton';
import TableComponent from '../ui/TableComponent';
import InventariablesForm from './InventariablesForm';

export default function InventariablesEditForm({ data, areas, proveedores, clasificaciones, historial_resguardos }: any) {
    const [isEditing, setIsEditing] = useState(false);

    const defaultValues = {
        id: data.bien.id,
        tipo: data.bien.tipo,
        clasificacion_id: data.bien.clasificacion_id,
        alta: data.bien.alta,
        grupo_activo: data.bien.grupo_activo,
        area_id: data.bien.area_id,
        fecha_ingreso: data.bien.fecha_ingreso,
        numero_inventario: data.bien.numero_inventario,
        depreciacion: data.bien.depreciacion,
        nombre: data.bien.nombre,
        marca: data.bien.marca,
        modelo: data.bien.modelo,
        serie: data.bien.serie,
        numero_motor: data.bien.numero_motor,
        numero_factura: data.bien.numero_factura,
        proveedor_id: data.bien.proveedor_id,
        estado: data.bien.estado,
        costo_unitario: data.bien.costo_unitario,
        numero_economico: data.bien.numero_economico,
        placas: data.bien.placas,
        tipo_poliza: data.bien.tipo_poliza,
        numero_poliza: data.bien.numero_poliza,
        descripcion: data.bien.descripcion,
        imagenes: data.bien.imagenes,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        control,
        watch,
    } = useForm<InventariablesFormValues>({ defaultValues: defaultValues });

    const onSubmit: SubmitHandler<InventariablesFormValues> = (data) => {
        router.post(`/funciones/inventarios/inventariables/${data.id}`, data, {
            onSuccess: () => {
                toast.success('Bienes Inventariables creado correctamente.');
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof InventariablesFormValues, {
                        type: 'server',
                        message: message as string,
                    });
                });
            },
        });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'fechaResguardo',
            label: 'Fecha de resguardo',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'fechaBaja',
            label: 'Fecha de baja',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'nombreResguardatario',
            label: 'Nombre del resguardatario',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'descripcion',
            label: 'Descripción',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
        {
            accessorKey: 'estado',
            label: 'Estado de uso',
            cell: (info: any) => info.getValue(),
            disableFilter: true,
        },
    ]);

    const datos = historial_resguardos.map((historial_resguardo) => {
        return {
            fechaResguardo: new Date(historial_resguardo.created_at).toLocaleDateString(),
            fechaBaja: new Date(historial_resguardo.updated_at).toLocaleDateString(),
            nombreResguardatario: historial_resguardo.trabajador.nombre + ' ' + historial_resguardo.trabajador.apellido_paterno + ' ' + historial_resguardo.trabajador.apellido_materno,
            descripcion: historial_resguardo.descripcion,
            estado: historial_resguardo.estatus,
        };
    });

    return (
        <>
            <CardComponent title="Editar Bienes Inventariables">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InventariablesForm
                        register={register}
                        errors={errors}
                        defaultValues={defaultValues}
                        isEditing={!isEditing}
                        clasificaciones={clasificaciones}
                        areas={areas}
                        proveedores={proveedores}
                        setValue={setValue}
                        control={control}
                        watch={watch}
                    />
                    <div className="mt-6 flex justify-center md:justify-end">
                        <CancelButton link="/funciones/inventarios/inventariables" />
                        {isEditing ? <SaveButton /> : <EditButton onClick={toggleEditMode} />}
                    </div>
                </form>
            </CardComponent>
            <TableComponent title="Movimientos" columns={columns} data={datos} />
        </>
    );
}
