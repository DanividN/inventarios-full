import { ArticulosFormValues } from "@/types/ArticulosFormValues"
import { Clasificaciones } from "@/types/Clasificaciones"
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import { Select } from "@headlessui/react"

type ArticulosFormProps = {
    control: Control<ArticulosFormValues>
    register: UseFormRegister<ArticulosFormValues>
    errors: FieldErrors<ArticulosFormValues>
    defaultValues: ArticulosFormValues
    isEditing?: boolean
    clasificaciones: Clasificaciones[]
    setValue: UseFormSetValue<ArticulosFormValues>
}
const ArticulosForm: React.FC<ArticulosFormProps> = ({
    control,
    register,
    errors,
    defaultValues,
    isEditing,
    clasificaciones,
    setValue
}) => {
    const optionsClasificaciones = clasificaciones.map((clasificacion) => ({
        value: clasificacion.id,
        label: clasificacion.clave + " - " + clasificacion.clasificacion
    }))
    return (
        <>
            <div className="grid grid-cols-1 md:gap-6 mt-4 sm:grid-cols-3">
                <SelectField
                    id="clasificacion_id"
                    label="Clasificación del bien*"
                    options={optionsClasificaciones}
                    control={control}
                    defaultValues={defaultValues}
                    errors={errors}
                    disabled={isEditing}
                />
                <InputField
                    id="articulo"
                    label="Nombre del artículo*"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Este campo es requerido"
                    }}
                    disabled={isEditing}
                />
                <SelectField
                    id="unidad_medida"
                    label="Unidad*"
                    options={[
                        { value: "Unidad", label: "Unidad" },
                        { value: "Pieza", label: "Pieza" },
                        { value: "Kilogramo", label: "Kilogramo" },
                        { value: "Litro", label: "Litro" },
                    ]}
                    control={control}
                    defaultValues={defaultValues.unidad_medida}
                    errors={errors}
                    disabled={isEditing}
                />
            </div>
            <div className="grid grid-cols-1 md:gap-6 mt-4 sm:grid-cols-3">
                <SelectField
                    id="tipo"
                    label="Tipo de bien*"
                    options={[
                        { value: "inventariable", label: "Inventariable" },
                        { value: "consumo", label: "Consumo" },
                    ]}
                    control={control}
                    defaultValues={defaultValues.tipo}
                    errors={errors}
                    disabled={isEditing}
                />
                <InputField
                    id="stock_minimo"
                    label="Stock mínimo*"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Este campo es requerido"
                    }}
                    disabled={isEditing}
                />
                <InputField
                    id="numero_parte"
                    label="Número de parte*"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Este campo es requerido"
                    }}
                    disabled={isEditing}
                />
            </div>
            <div className="grid grid-cols-1 md:gap-6 mt-4 sm:grid-cols-1">
                <InputField
                    id="descripcion"
                    label="Descripción*"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Este campo es requerido"
                    }}
                    disabled={isEditing}
                />
            </div>
        </>
    )
}

export default ArticulosForm
