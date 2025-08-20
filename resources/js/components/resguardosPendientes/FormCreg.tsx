import { ResguardosPendientesFormValues } from "@/types/ResguardosPendientesFormValues"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Area } from "@/types/Areas"

type FormResguardosPendientesProps = {
    control: Control<ResguardosPendientesFormValues>
    register: UseFormRegister<ResguardosPendientesFormValues>
    errors: FieldErrors<ResguardosPendientesFormValues>
    defaultValues: ResguardosPendientesFormValues
    isEditing?: boolean
    areas: Area[]
    handleAreaChange: (option: any) => void
    trabajadores: { value: string, label: string }[]
    articulos: { value: string, label: string }[]
}

const FormCreg = ({ register, errors, defaultValues, isEditing, control, areas, handleAreaChange, trabajadores, articulos }: FormResguardosPendientesProps) => {

    const optionsAreas = areas.map((area) => ({
        value: area.id,
        label: area.name
    }));


  return (
    <>
        <div className="grid grid-cols-1 md:gap-6 mt-4 sm:grid-cols-2">
            <SelectField
                id="area_id"
                label="Área*"
                options={optionsAreas}
                value={defaultValues.area}
                control={control}
                defaultValues={defaultValues}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
                disabled={isEditing}
                onChange={handleAreaChange}
            />
            <SelectField
                id="trabajador_id"
                label="Trabajador*"
                options={trabajadores}
                value={defaultValues.trabajador_id}
                control={control}
                defaultValues={defaultValues}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
                disabled={isEditing}
            />
        </div>
        <div className="grid grid-cols-1 md:gap-6 mt-4 sm:grid-cols-2">
            <SelectField
                id="articulo_id"
                label="Nº de inventario*"
                options={articulos}
                value={defaultValues.noInventario}
                control={control}
                defaultValues={defaultValues}
                rules={{ required: "Este campo es requerido" }}
                errors={errors}
                disabled={isEditing}
            />
            <InputField
                id="creg"
                label="Nº de CREG*"
                placeholder="Ejemplo: 12345"
                register={register}
                errors={errors}
                rules={{ required: "Este campo es requerido" }}
                disabled={isEditing}
            />
        </div>
    </>
  )
}

export default FormCreg
