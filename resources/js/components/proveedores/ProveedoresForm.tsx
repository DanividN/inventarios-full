import { useEffect, useState } from "react";
import SelectField from "../ui/SelectField";
import InputField from "../ui/InputField";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProveedoresFormValues } from "@/types/ProveedoresFormValues";
import { Estados } from "@/types/Estados";

type ProveedoresFormProps = {
    control: Control<ProveedoresFormValues>
    register: UseFormRegister<ProveedoresFormValues>
    errors: FieldErrors<ProveedoresFormValues>
    defaultValues: ProveedoresFormValues
    isEditing: boolean
    estados: Estados[]
    setValue: UseFormSetValue<ProveedoresFormValues>
    watch: UseFormSetValue<ProveedoresFormValues>
}



const ProveedoresForm: React.FC<ProveedoresFormProps> = ({
    control,
    register,
    errors,
    defaultValues,
    isEditing,
    estados,
    watch
}) => {
    const optionsEstados = estados.map(estado => ({
        value: estado.id,
        label: estado.nombre,
    }))

    const [municipios, setMunicipios] = useState([])

    const handleEstadoChange = async (selectedOption: any) => {
        try {
            const response = await fetch(`/municipios/${selectedOption.value}`)
            const data = await response.json()
            const municipiosOptions = data.map((mun: any) => ({
                value: mun.id,
                label: mun.nombre,
            }))
            setMunicipios(municipiosOptions)
            setValue("municipio_id", "")
        } catch (error) {
            console.error("Error al obtener los municipios:", error)
        }
    }

    useEffect(() => {
        const fetchMunicipios = async () => {
            if (defaultValues.id_entidad_federativa) {
                try {
                    const response = await fetch(`/municipios/${defaultValues.id_entidad_federativa}`)
                    const data = await response.json()
                    const municipiosOptions = data.map((mun: any) => ({
                        value: mun.id,
                        label: mun.nombre,
                    }))
                    setMunicipios(municipiosOptions)
                } catch (error) {
                    console.error("Error al obtener los municipios:", error)
                }
            }
        }

        fetchMunicipios()
    }, [defaultValues.id_entidad_federativa])

    const tipo = watch('tipo')
    return (
        <>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <SelectField
                    id="tipo"
                    label="Tipo de persona"
                    options={[
                        { value: "fisica", label: "Física" },
                        { value: "moral", label: "Moral" },
                    ]}
                    value={defaultValues.tipo}
                    defaultValues={defaultValues}
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    errors={errors}
                    disabled={isEditing}
                />
            </div>
            {tipo === "moral" ? (
                <>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                        <InputField
                            id="nombre"
                            label="Nombre del representante legal"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />

                        <InputField
                            id="apellido_paterno"
                            label="Apellido Paterno del representante legal"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />

                        <InputField
                            id="apellido_materno"
                            label="Apellido Materno del representante legal"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                        <InputField
                            id="razon_social"
                            label="Razón social"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />

                        <InputField
                            id="nombre_comercial"
                            label="Nombre comercial"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                        <InputField
                            id="nombre"
                            label="Nombre"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />

                        <InputField
                            id="apellido_paterno"
                            label="Apellido paterno"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />

                        <InputField
                            id="apellido_materno"
                            label="Apellido materno"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                    </div>
                </>
            )}
            {/* Common fields */}
            <>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-4">
                    <InputField
                        id="rfc"
                        label="RFC"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />

                    <InputField
                        id="calle"
                        label="Calle"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />

                    <InputField
                        id="numero_exterior"
                        label="Número exterior"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />

                    <InputField
                        id="numero_interior"
                        label="Número interno"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                    <InputField
                        id="colonia"
                        label="Colonia"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />

                  <SelectField
                    id="id_entidad_federativa"
                    label="Entidad federativa*"
                    options={optionsEstados} // ← opciones en formato { value, label }
                    value={optionsEstados.find(option => option.value === defaultValues.id_entidad_federativa)}
                    control={control}
                    defaultValues={defaultValues}
                    rules={{ required: "Este campo es requerido" }}
                    errors={errors}
                    disabled={isEditing}
                    onChange={handleEstadoChange}
                />
                <SelectField
                    id="municipio_id"
                    label="Municipio*"
                    options={municipios} // ← opciones en formato { value, label }
                    value={municipios.find(option => option.value === defaultValues.municipio_id)}
                    control={control}
                    defaultValues={defaultValues}
                    rules={{ required: "Este campo es requerido" }}
                    errors={errors}
                    disabled={isEditing}
                />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                    <InputField
                        id="codigo_postal"
                        label="Código postal"
                        type="number"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />

                    <InputField
                        id="telefono"
                        label="Teléfono"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />

                    <InputField
                        id="pagina_web"
                        label="Página web"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                    <InputField
                        id="descripcion"
                        label="Descripción"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />
                </div>
            </>
        </>
    )

}

export default ProveedoresForm
