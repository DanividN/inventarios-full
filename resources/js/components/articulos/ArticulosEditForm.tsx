import { ArticulosFormValues } from "@/types/ArticulosFormValues";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CardComponent from "../ui/CardComponent";
import ArticulosForm from "./ArticulosForm";
import CancelButton from "../ui/CancelButton";
import SaveButton from "../ui/SaveButton";
import EditButton from "../ui/EditButton";

export default function ArticulosEditForm({ data, clasificaciones }: any) {
    const [isEditing, setIsEditing] = useState(false);

    const defaultValues = {
        id: data.articulo.id,
        clasificacion_id: data.articulo.clasificacion_id,
        articulo: data.articulo.articulo,
        unidad_medida: data.articulo.unidad_medida,
        tipo: data.articulo.tipo,
        stock_minimo: data.articulo.stock_minimo,
        numero_parte: data.articulo.numero_parte,
        descripcion: data.articulo.descripcion
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        control,
    } = useForm<ArticulosFormValues>({ defaultValues : defaultValues })

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
    }

    const onSubmit: SubmitHandler<ArticulosFormValues> = (data) => {
        router.put(`/configuracion/articulos/${data.id}`, data, {
            onSuccess: () => {
                toast.success("Articulo actualizado correctamente.");
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof ArticulosFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })
    }

    return (
        <>
            <CardComponent title="Editar Articulo">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ArticulosForm
                        control={control}
                        register={register}
                        errors={errors}
                        defaultValues={defaultValues}
                        isEditing={!isEditing}
                        clasificaciones={clasificaciones}
                        setValue={setValue}
                    />
                    <div className='flex justify-center md:justify-end mt-6'>
                        <CancelButton link='/configuracion/articulos' />
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
