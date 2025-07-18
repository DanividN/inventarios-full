import ProveedoresForm from "@/components/proveedores/ProveedoresForm";
import CancelButton from "@/components/ui/CancelButton";
import CardComponent from "@/components/ui/CardComponent";
import SaveButton from "@/components/ui/SaveButton";
import AppLayout from "@/layouts/app-layout";
import { Estados } from "@/types/Estados";
import { ProveedoresFormValues } from "@/types/ProveedoresFormValues";
import { router } from "@inertiajs/react";
import { SubmitHandler, useForm } from "react-hook-form";


type Props = PageProps & {
    estados: Estados[]
}

export default function ProveedoresCreate({ estados }: Props) {
    const defaultValues: ProveedoresFormValues = {
        tipo: 'fisica',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        razon_social: '',
        nombre_comercial: '',
        rfc: '',
        calle: '',
        numero_exterior: '',
        numero_interior: '',
        colonia: '',
        municipio_id: '',
        correo: '',
        codigo_postal: '',
        telefono: '',
        pagina_web: '',
        descripcion: '',
        estatus: true
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
        watch
    } = useForm<ProveedoresFormValues>({ defaultValues })

    const onSubmit: SubmitHandler<ProveedoresFormValues> = (data) => {
        router.post('/configuracion/proveedores', data, {
            onSuccess: () => {
                console.log('proveedor creado')
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
    const activo = watch({
        control,
        name: "activo",
        defaultValue: defaultValues.estatus
    });

    return (
        <>

            <CardComponent title="Agregar proveedores">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ProveedoresForm
                        control={control}
                        register={register}
                        errors={errors}
                        defaultValues={defaultValues}
                        isEditing={false}
                        estados={estados}
                        activo={activo}
                        watch={watch}
                    />
                    <div className="flex justify-center md:justify-end mt-6">
                        <CancelButton link="/configuracion/proveedores" />
                        <SaveButton />
                    </div>
                </form>
            </CardComponent>

        </>
    )
}
