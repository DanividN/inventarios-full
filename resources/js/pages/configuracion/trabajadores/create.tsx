import TrabajadoresForm from "@/components/trabajadores/TrabajadoresForm";
import CancelButton from "@/components/ui/CancelButton";
import CardComponent from "@/components/ui/CardComponent";
import SaveButton from "@/components/ui/SaveButton";
import AppLayout from "@/layouts/app-layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "@inertiajs/react";

type TrabajadoreFormValues = {
    area_id: string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    numero_empleado: string,
    fecha_ingreso: string
    telefono: string
    folio_ine: string
    foto_ine: FileList
}

type Area = {
    id: string,
    name: string
}

type Props = PageProps & {
  areas: Area[]
}
export default function TrabajadoresCreate({ areas }: Props) {
    const defaultValues: TrabajadoreFormValues = {
        area_id: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        numero_empleado: '',
        fecha_ingreso: '',
        telefono: '',
        folio_ine: '',
        foto_ine: ''
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        control,
    } = useForm<TrabajadoreFormValues>({ defaultValues })

    const onSubmit: SubmitHandler<TrabajadoreFormValues> = (data) => {
        router.post('/configuracion/trabajadores', data, {
            onSuccess: () => {
                console.log('trabajador creado')
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof TrabajadoreFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })
    }

    return (
        <>
            <AppLayout >
                <CardComponent title="Agregar trabajador">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <TrabajadoresForm
                            control={control}
                            register={register}
                            errors={errors}
                            defaultValues={defaultValues}
                            isEditing={false}
                            areas={areas}
                            setValue={setValue}
                        />
                        <div className="flex justify-center md:justify-end mt-6">
                            <CancelButton link="/configuracion/trabajadores" />
                            <SaveButton />
                        </div>
                    </form>
                </CardComponent>
            </AppLayout>
        </>
    )
}
