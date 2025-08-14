import { Clasificaciones } from "@/types/Clasificaciones"
import { EntregasConsumoFormValue } from "@/types/EntregasConsumoFormValue"
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import { Area } from "@/types/Areas"

type Props = {
    control: Control<EntregasConsumoFormValue>
    register: UseFormRegister<EntregasConsumoFormValue>
    errors: FieldErrors<EntregasConsumoFormValue>
    defaultValues: EntregasConsumoFormValue
    isEditing?: boolean
    clasificaciones: Clasificaciones[]
    areas: Area[]
    setValue: UseFormSetValue<EntregasConsumoFormValue>
    handleAddArticle: () => void
    articulos: { value: string, label: string }[]
    handleClasificacionChange: (option: any) => void
    handleArticuloChange: (option: any) => void
}

export default function FormEntregaConsumo({
    control,
    register,
    errors,
    defaultValues,
    isEditing,
    clasificaciones,
    areas,
    setValue,
    handleAddArticle,
    articulos,
    handleClasificacionChange,
    unidadMedida,
    handleArticuloChange
}: Props) {

    const areasOptions = areas.map(area => ({
        value: area.id,
        label: area.name,
    }));

    const clasificacionesOptions = clasificaciones.map(clasificacion => ({
        value: clasificacion.id,
        label: clasificacion.clave + " - " + clasificacion.clasificacion,
    }));

    return (
        <>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <SelectField
                    id="area_id"
                    label="Área"
                    options={areasOptions}
                    value={defaultValues}
                    control={control}
                    defaultValues={defaultValues}
                    rules={{ required: "Este campo es requerido" }}
                    errors={errors}
                    disabled={isEditing}
                />
                <InputField
                    id="enlace"
                    label="Enlace"
                    type="text"
                    placeholder="Ingrese el enlace"
                    register={register}
                    defaultValue={defaultValues}
                    rules={{ required: "Este campo es requerido" }}
                    errors={errors}
                    disabled={isEditing}
                />
                <InputField
                    id="entregado_por"
                    label="Entregado por"
                    type="text"
                    placeholder="Ingrese el nombre de quien entrega"
                    register={register}
                    defaultValue={defaultValues}
                    rules={{ required: "Este campo es requerido" }}
                    errors={errors}
                    disabled={true}
                />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-5">
               <SelectField
                    id="clasificacion"
                    label="Clasificación del bien*"
                    options={clasificacionesOptions}
                    value={defaultValues}
                    control={control}
                    defaultValues={defaultValues}

                    errors={errors}
                    disabled={isEditing}
                    onChange={handleClasificacionChange}
                />
                <SelectField
                    id="articulo_id"
                    label="Artículo*"
                    options={articulos}
                    value={defaultValues}
                    control={control}
                    defaultValues={defaultValues}
                    errors={errors}
                    disabled={isEditing}
                    onChange={handleArticuloChange}
                />
                <InputField
                    id="unidadMedida"
                    label="Unidad de medida*"
                    type="text"
                    placeholder="Ejemplo: Kg"
                    defaultValue={unidadMedida}
                    register={register}
                    errors={errors}
                    disabled={true}
                />
                <InputField
                    id="cantidad"
                    label="Cantidad*"
                    type="number"
                    placeholder="Ejemplo: 100"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                />
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleAddArticle}
                        className="bg-withe border border-green-dark rounded-md text-green-dark hover:bg-green-dark hover:text-white px-6 py-2 mr-4 mt-4"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </>
    )
}
