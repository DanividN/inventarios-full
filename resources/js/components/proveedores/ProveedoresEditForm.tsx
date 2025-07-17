import { SubmitHandler, useForm } from "react-hook-form";
import CancelButton from "../ui/CancelButton";
import CardComponent from "../ui/CardComponent";
import EditButton from "../ui/EditButton";
import SaveButton from "../ui/SaveButton";
import ProveedoresForm from "./ProveedoresForm";
import { ProveedoresFormValues } from "@/types/ProveedoresFormValues";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function ProveedoresEditForm({ data, estados }: any) {
    const [isEditing, setIsEditing] = useState(false);

    const defaultValues={
        id: data.proveedor.id,
        tipo: data.proveedor.tipo,
        nombre: data.proveedor.nombre,
        apellido_paterno: data.proveedor.apellido_paterno,
        apellido_materno: data.proveedor.apellido_materno,
        razon_social: data.proveedor.razon_social,
        rfc: data.proveedor.rfc,
        nombre_comercial: data.proveedor.nombre_comercial,
        telefono: data.proveedor.telefono,
        calle: data.proveedor.calle,
        numero_exterior: data.proveedor.numero_exterior,
        numero_interior: data.proveedor.numero_interior,
        colonia: data.proveedor.colonia,
        codigo_postal: data.proveedor.codigo_postal,
        id_entidad_federativa: data.proveedor.municipio.estado.id,
        municipio_id: data.proveedor.municipio.id,
        pagina_web: data.proveedor.pagina_web,
        descripcion: data.proveedor.descripcion,
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        control,
        watch
    } = useForm<ProveedoresFormValues>({ defaultValues: defaultValues })

    const onSubmit: SubmitHandler<ProveedoresFormValues> = (data) => {
        router.put(`/configuracion/proveedores/${data.id}`, data, {
            onSuccess: () => {
                toast.success("Proveedor actualizado correctamente.");
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof ProveedoresFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
    }
    return (
        <>
           <CardComponent title="Editar proveedor">
            <form onSubmit={handleSubmit(onSubmit)}>
                <ProveedoresForm
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValues={defaultValues}
                    isEditing={!isEditing}
                    estados={estados}
                    setValue={setValue}
                    watch={watch}
                />
                <div className='flex justify-center md:justify-end mt-6'>
                        <CancelButton link='/configuracion/proveedores' />
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
        </>
    )
}
