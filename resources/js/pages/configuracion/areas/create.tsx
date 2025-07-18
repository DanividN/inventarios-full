import { useForm, SubmitHandler } from 'react-hook-form'
import { router } from '@inertiajs/react'
import CardComponent from '@/components/ui/CardComponent'
import CancelButton from '@/components/ui/CancelButton'
import SaveButton from '@/components/ui/SaveButton'
import AreasForm from '@/components/areas/AreaForm'
import AppLayout from '@/layouts/app-layout'
import { toast } from 'react-toastify'


type AreaFormValues = {
    id_area: string
    nombre_area: string
    nomeclatura: string
    id_entidad_federativa: string
    id_municipio: string
    codigo_postal: string
    colonia: string
    calle: string
    numero: string
    telefono: string
}

type Area = {
  id: string
  nombre_area: string
  orgData?: { name: string } // opcional si lo quieres para el modal
}

type Estado = {
  id: string
  nombre: string
}

type Props = PageProps & {
  areas: Area[]
  estados: Estado[]
}

const AreasCreate = ({ areas, estados }: Props) => {
    const defaultValues: AreaFormValues = {
        id_area: '',
        nombre_area: '',
        nomeclatura: '',
        id_entidad_federativa: '',
        id_municipio: '',
        codigo_postal: '',
        colonia: '',
        calle: '',
        numero: '',
        telefono: ''
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm<AreaFormValues>({ defaultValues })

    const onSubmit: SubmitHandler<AreaFormValues> = (data) => {
    router.post('/configuracion/areas', data, {
        onSuccess: () => {
            toast.success("Área creada correctamente.");
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

            <CardComponent title="Agregar nueva área">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AreasForm
                        control={control}
                        register={register}
                        errors={errors}
                        defaultValues={defaultValues}
                        isEditing={false}
                        areas={areas}
                        estados={estados}
                    />

                    <div className="flex justify-center md:justify-end mt-6">
                        <CancelButton link="/configuracion/areas" />
                        <SaveButton />
                    </div>
                </form>
            </CardComponent>

    )
}

export default AreasCreate
