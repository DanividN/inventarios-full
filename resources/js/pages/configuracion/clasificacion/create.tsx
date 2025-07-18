import ClasificacionForm from "@/components/clasificacion/ClasificacionForm";
import CancelButton from "@/components/ui/CancelButton";
import CardComponent from "@/components/ui/CardComponent";
import SaveButton from "@/components/ui/SaveButton";
import { ClasificacionFormValues } from "@/types/ClasificacionFormValues";
import { router } from "@inertiajs/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function ClasificacionCreate() {
    const defaultValues: ClasificacionFormValues = {
        partida: '',
        clasificacion: '',
        descripcion: ''
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ClasificacionFormValues>({ defaultValues })

    const onSubmit: SubmitHandler<ClasificacionFormValues> = (data) => {
        router.post('/configuracion/clasificacion', data, {
            onSuccess: () => {
                toast.success("Clasificación creada correctamente.");
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
        <>
            <CardComponent title="Agregar clasificación">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ClasificacionForm
                        register={register}
                        errors={errors}
                        setError={setError}
                        defaultValues={defaultValues}
                        isEditing={false}
                    />

                    <div className="flex justify-center md:justify-end mt-6">
                        <CancelButton link="/configuracion/clasificacion" />
                        <SaveButton />
                    </div>
                </form>
            </CardComponent>
        </>
    )
}
