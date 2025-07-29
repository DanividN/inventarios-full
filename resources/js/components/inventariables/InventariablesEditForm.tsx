import { InventariablesFormValues } from "@/types/InventariablesFormValues";
import { router } from "@inertiajs/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CardComponent from "../ui/CardComponent";
import InventariablesForm from "./InventariablesForm";
import CancelButton from "../ui/CancelButton";
import SaveButton from "../ui/SaveButton";
import EditButton from "../ui/EditButton";
import { useMemo, useState } from "react";
import TableHistorial from "../ui/TableHistorial";

export default function InventariablesEditForm({ data, areas, proveedores, clasificaciones }: any) {
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
        imagenes: data.bien.imagenes
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        control,
        watch
    } = useForm<InventariablesFormValues>({ defaultValues: defaultValues});

    const onSubmit: SubmitHandler<InventariablesFormValues> = (data) => {
        router.post(`/funciones/inventarios/inventariables/${data.id}`, data, {
            onSuccess: () => {
                toast.success("Bienes Inventariables creado correctamente.");
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof InventariablesFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

    // const columns = useMemo(() => [
    //      {
    //         accessorKey: "fechaResguardo",
    //         label: "Fecha de resguardo",
    //         cell: (info: any) => info.getValue(),
    //         disableFilter: true,
    //     },
    //     {
    //         accessorKey: "fechaBaja",
    //         label: "Fecha de baja",
    //         cell: (info: any) => info.getValue(),
    //         disableFilter: true
    //     },
    //     {
    //         accessorKey: "nombreResguardatario",
    //         label: "Nombre del resguardatario",
    //         cell: (info: any) => info.getValue(),
    //         disableFilter: true
    //     },
    //     {
    //         accessorKey: "descripcion",
    //         label: "Descripción",
    //         cell: (info: any) => info.getValue(),
    //         disableFilter: true
    //     },
    //     {
    //         accessorKey: "estado",
    //         label: "Estado de uso",
    //         cell: (info: any) => info.getValue(),
    //         disableFilter: true
    //     },
    //     {
    //         accessorKey: "acciones",
    //         label: "Acciones",
    //         cell: (info: any) => (
    //             <button className="text-blue-500 bg-transparent border border-blue-500 p-2 rounded-md hover:bg-blue-500 hover:text-white">
    //                 descargar
    //             </button>
    //         ),
    //         disableFilter: true,
    //     },
    // ])


    // const datos = [
    //     {
    //         fechaResguardo: data.bien.fecha_resguardo,
    //         fechaBaja: data.bien.fecha_baja,
    //         nombreResguardatario: data.bien.resguardatario,
    //         descripcion: data.bien.descripcion,
    //         estado: data.bien.estado
    //     }
    // ]

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
                    <div className='flex justify-center md:justify-end mt-6'>
                        <CancelButton link='/funciones/inventarios/inventariables' />
                        {
                            isEditing ? (
                                <SaveButton />
                            ) : (
                                <EditButton onClick={toggleEditMode} />
                            )
                        }
                    </div>
                </form>
            </CardComponent>
            {/* <TableHistorial
                titleTable="Movimientos"
                columns={columns}
                datos={datos}
            /> */}
        </>

    )
}
