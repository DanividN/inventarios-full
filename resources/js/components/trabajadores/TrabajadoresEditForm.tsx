import { TrabajadoresFormValues } from "@/types/TrabajadoresFormValues";
import { router } from "@inertiajs/react";
import { on } from "events";
import { SubmitHandler, useForm } from "react-hook-form";
import CardComponent from "../ui/CardComponent";
import TrabajadoresForm from "./TrabajadoresForm";
import CancelButton from "../ui/CancelButton";
import SaveButton from "../ui/SaveButton";
import EditButton from "../ui/EditButton";
import { useState } from "react";

export default function TrabajadoresEditForm({ data, areas }: any) {
    const [isEditing, setIsEditing] = useState(false);

    const defaultValues={
        id: data.trabajador.id,
        area_id: data.trabajador.area_id,
        nombre: data.trabajador.nombre,
        apellido_paterno: data.trabajador.apellido_paterno,
        apellido_materno: data.trabajador.apellido_materno,
        cargo: data.trabajador.cargo,
        numero_empleado: data.trabajador.numero_empleado,
        fecha_ingreso: data.trabajador.fecha_ingreso,
        telefono: data.trabajador.telefono,
        folio_ine: data.trabajador.folio_ine,
        foto_ine: data.trabajador.foto_ine
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        control
    } = useForm<TrabajadoresFormValues>({ defaultValues: defaultValues })

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
    }

    const onSubmit: SubmitHandler<TrabajadoresFormValues> = (data) => {
        router.post(`/configuracion/trabajadores/${data.id}`, data, {
            onSuccess: () => {
                console.log("edicion realizada correctamente");
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof TrabajadoresFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })
    }


    return (
        <>
            <CardComponent title="Editar Trabajador">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <TrabajadoresForm
                        control={control}
                        errors={errors}
                        register={register}
                        defaultValues={defaultValues}
                        isEditing={!isEditing}
                        areas={areas}
                        setValue={setValue}
                    />
                   <div className='flex justify-center md:justify-end mt-6'>
                        <CancelButton link='/configuracion/trabajadores' />
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
