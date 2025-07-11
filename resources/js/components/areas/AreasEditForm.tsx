import { useState } from "react";
import CardComponent from "../ui/CardComponent";
import AreasForm from "./AreaForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { AreaFormValues } from "@/types/AreaFormValues";
import SaveButton from "../ui/SaveButton";
import CancelButton from "../ui/CancelButton";
import EditButton from "../ui/EditButton";
import { router } from "@inertiajs/react";

export default function AreasEditForm({ data, areas, estados } : any) {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);


    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };


    const defaultsValues = {
        id: data.area.id,
        area_padre_id: data.area.area_padre_id,
        name: data.area.name,
        nomenclatura: data.area.nomenclatura,
        telefono: data.area.telefono,
        calle: data.area.calle,
        numero_exterior: data.area.numero_exterior,
        numero_interior: data.area.numero_interior,
        colonia: data.area.colonia,
        codigo_postal: data.area.codigo_postal,
        id_entidad_federativa: data.area.municipio.estado.id,
        municipio_id: data.area.municipio.id
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
        setValue
    } = useForm<AreaFormValues>({ defaultValues: defaultsValues })

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
    }

    const onSubmit: SubmitHandler<AreaFormValues> = (data) => {
        router.put(`/configuracion/areas/${data.id}`, data, {
            onSuccess: () => {
                // router.visit('/configuracion/areas')
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof AreaFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })

    }
    return (
        <>
            <CardComponent title="Editar Área">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AreasForm
                        control={control}
                        register={register}
                        errors={errors}
                        defaultValues={defaultsValues}
                        isEditing={!isEditing}
                        areas={areas}
                        estados={estados}
                        setValue={setValue}
                    />
                     <div className='flex justify-center md:justify-end mt-6'>
                        <CancelButton link='/configuracion/areas' />
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
