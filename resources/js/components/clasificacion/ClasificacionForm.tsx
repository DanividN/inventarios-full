import { ClasificacionFormValues } from "@/types/ClasificacionFormValues"
import InputField from "../ui/InputField"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type ClasificacionFormProps = {
    register: UseFormRegister<ClasificacionFormValues>
    errors: FieldErrors<ClasificacionFormValues>
    defaultValues: ClasificacionFormValues
    isEditing?: boolean
}

const ClasificacionForm: React.FC<ClasificacionFormProps> = ({
    register,
    errors,
    defaultValues,
    isEditing
}) => {
    return (
        <>
            <div className="grid grid-cols-1 md:gap-6 mt-4 sm:grid-cols-2">
                <InputField
                    id="clave"
                    label="Partida especifica*"
                    placeholder="Ejemplo: Partida 1"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Este campo es requerido",
                        pattern: {
                            value: /^[0-9]{4}$/,
                            message: "La partida debe tener 4 numeros"
                        }

                    }}
                    disabled={isEditing}
                />
                <InputField
                    id="clasificacion"
                    label="Clasificación del bien*"
                    placeholder="Ejemplo: Clasificación 1"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                    disabled={isEditing}
                />
            </div>
            <div className="grid grid-cols-1 md:gap-6 mt-4 sm:grid-cols-1">
                <InputField
                    id="descripcion"
                    label="Descripción*"
                    placeholder="Ejemplo: Descripción del bien"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                    disabled={isEditing}
                />
            </div>
        </>
    )
}

export default ClasificacionForm
