import { ArticulosFormValues } from "@/types/ArticulosFormValues"
import Clasificacion from "../clasificacion"
import { toast } from "react-toastify"
import { router } from "@inertiajs/react"
import { SubmitHandler, useForm } from "react-hook-form"
import CardComponent from "@/components/ui/CardComponent"
import ClasificacionForm from "@/components/clasificacion/ClasificacionForm"
import CancelButton from "@/components/ui/CancelButton"
import SaveButton from "@/components/ui/SaveButton"
import ArticulosForm from "@/components/articulos/ArticulosForm"
import { Clasificaciones } from "@/types/Clasificaciones"

type Props = PageProps & {
    clasificaciones: Clasificaciones[]
}

export default function Articulos({ clasificaciones }: Props) {
    const defaultValues: ArticulosFormValues= {
        clasificacion_id: '',
        articulo: '',
        unidad_medida: '',
        tipo: '',
        stock_minimo: '',
        numero_parte: '',
        descripcion: ''
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        control,
    } = useForm<ArticulosFormValues>({ defaultValues })

    const onSubmit: SubmitHandler<ArticulosFormValues> = (data) => {
        router.post('/configuracion/articulos', data, {
            onSuccess: () => {
                toast.success("Articulo creado correctamente.");
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
            <CardComponent title="Agregar artículo">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ArticulosForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        control={control}
                        defaultValues={defaultValues}
                        setError={setError}
                        isEditing={false}
                        clasificaciones={clasificaciones}
                    />
                    <div className="flex justify-center md:justify-end mt-6">
                        <CancelButton link="/configuracion/areas" />
                        <SaveButton />
                    </div>
                </form>
            </CardComponent>
        </>
    )
}
