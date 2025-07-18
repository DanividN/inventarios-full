import { ClasificacionFormValues } from "@/types/ClasificacionFormValues";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CardComponent from "../ui/CardComponent";
import ClasificacionForm from "./ClasificacionForm";
import CancelButton from "../ui/CancelButton";
import SaveButton from "../ui/SaveButton";
import EditButton from "../ui/EditButton";
import { toast } from "react-toastify";

export default function ClasificacionEditForm({ data }: any) {
    const [isEditing, setIsEditing] = useState(false);

    const defaultValues = {
        id: data.clasificacion.id,
        clave: data.clasificacion.clave,
        clasificacion: data.clasificacion.clasificacion,
        descripcion: data.clasificacion.descripcion
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm<ClasificacionFormValues>({ defaultValues: defaultValues })

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
    }

    const onSubmit: SubmitHandler<ClasificacionFormValues> = (data) => {
        router.put(`/configuracion/clasificacion/${data.id}`, data, {
            onSuccess: () => {
                toast.success("Clasificación actualizada correctamente.");
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof ClasificacionFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })
    }

    return (
        <CardComponent title="Editar Clasificación">
            <form onSubmit={handleSubmit(onSubmit)}>
                <ClasificacionForm
                    register={register}
                    errors={errors}
                    defaultValues={defaultValues}
                    isEditing={!isEditing}
                    setValue={setValue}
                />
                <div className='flex justify-center md:justify-end mt-6'>
                    <CancelButton link='/configuracion/clasificacion' />
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
    )
}
