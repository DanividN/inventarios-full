import InventariablesForm from "@/components/inventariables/InventariablesForm"
import CancelButton from "@/components/ui/CancelButton"
import CardComponent from "@/components/ui/CardComponent"
import SaveButton from "@/components/ui/SaveButton"
import { Area } from "@/types/areas"
import { Clasificaciones } from "@/types/Clasificaciones"
import { InventariablesFormValues } from "@/types/InventariablesFormValues"
import { Proveedor } from "@/types/Proveedores"
import { router } from "@inertiajs/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

type Props = PageProps & {
    areas: Area[]
    clasificaciones: Clasificaciones[]
    proveedores: Proveedor[]
}

export default function BienesInventariablesCreate({ areas, clasificaciones, proveedores }: Props) {
    const defaultValues: InventariablesFormValues = {
        tipo: '',
        clasificacion_id:  0,
        alta: '',
        grupo_activo: 'Patrimonial',
        area_id: null,
        fecha_ingreso: '',
        numero_inventario: '',
        depreciacion: '',
        nombre: '',
        marca: '',
        modelo: '',
        serie: '',
        numero_motor: '',
        numero_factura: '',
        proveedor_id: 0,
        estado: '',
        costo_unitario: '',
        numero_economico: '',
        placas: '',
        tipo_poliza: '',
        numero_poliza: '',
        descripcion: '',
        imagenes: '',
        estatus: 'activo'
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
        watch,
        setValue,
    } = useForm<InventariablesFormValues>({ defaultValues })

    const onSubmit: SubmitHandler<InventariablesFormValues> = (data) => {
        router.post('/funciones/inventarios/inventariables', data, {
            onSuccess: () => {
                toast.success("Bienes Inventariables creado correctamente.");
            },
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([key, message]) => {
                    setError(key as keyof InventariablesFormValues, {
                        type: 'server',
                        message: message as string
                    })
                })
            }
        })
    }


    return (
        <>
            <CardComponent title="Agregar proveedores">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InventariablesForm
                        control={control}
                        register={register}
                        errors={errors}
                        defaultValues={defaultValues}
                        isEditing={false}
                        watch={watch}
                        clasificaciones={clasificaciones}
                        areas={areas}
                        proveedores={proveedores}
                        setValue={setValue}
                    />
                    <div className="flex justify-center md:justify-end mt-6">
                        <CancelButton link="/funciones/bienesInventariables" />
                        <SaveButton />
                    </div>
                </form>
            </CardComponent>
        </>
    )
}
