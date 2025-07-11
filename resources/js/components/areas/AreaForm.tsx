import React, { useEffect, useState } from "react"
import { Controller, Control, UseFormRegister, FieldErrors, useFormContext } from "react-hook-form"
import Select from "react-select"

import { AreaFormValues } from "@/types/AreaFormValues"
import SelectField from "../ui/SelectField"
import InputField from "../ui/InputField"
import ModalOrg from "./ModalOrg"

type AreasFormProps = {
    control: Control<AreaFormValues>
    register: UseFormRegister<AreaFormValues>
    errors: FieldErrors<AreaFormValues>
    defaultValues: AreaFormValues
    isEditing: boolean
    areas: Area[]
    estados: Estado[]
    setValue: UseFormSetValue<AreaFormValues>
}

type OrgData = {
    name: string
    children?: OrgData[]
}

const AreasForm: React.FC<AreasFormProps> = ({
    control,
    register,
    errors,
    defaultValues,
    isEditing,
    areas,
    estados,
    setValue
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [orgData, setOrgData] = useState<OrgData>({ name: "Director General" })

    const options = areas.map(area => ({
        value: area.id,
        label: area.name,
        orgData: area.orgData || { name: "Director General" }, // si lo tienes en DB
    }))

    const optionsEstados = estados.map(estado => ({
        value: estado.id,
        label: estado.nombre,
    }))

    // traer los municipios cuando el select de estados cambie
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

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <div className="relative">
                    <Controller
                        name="area_padre_id"
                        control={control}
                        defaultValue={defaultValues.area_padre_id}
                        render={({ field }) => (
                            <Select
                                id="area_padre_id"
                                options={options}
                                onChange={selectedOption => {
                                    field.onChange(selectedOption ? selectedOption.value : "")
                                    setOrgData(selectedOption?.orgData || { name: "Director General" })
                                }}
                                value={options.find(option => option.value === field.value)}
                                className="peer block w-full bg-transparent sm:text-sm focus:ring-0 disabled:opacity-50 mt-1.5"
                                classNamePrefix="react-select"
                                styles={{
                                    control: (styles, { isDisabled, isFocused }) => ({
                                        ...styles,
                                        backgroundColor: "transparent",
                                        borderTop: "transparent",
                                        borderLeft: "transparent",
                                        borderRight: "transparent",
                                        borderBottom: isFocused
                                            ? "2px solid #6b7280"
                                            : "2px solid #e5e7eb",
                                        padding: "0.3rem",
                                        borderRadius: "0",
                                        boxShadow: "none",
                                        pointerEvents: isDisabled ? "none" : "auto",
                                    }),
                                }}
                                isDisabled={isEditing}
                                placeholder="Selecciona un área"
                                isClearable
                            />
                        )}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}
                    />
                    <label
                        htmlFor="area_padre_id"
                        className="absolute top-0 start-0 py-1 px-0 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0]
              peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500
              peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Área de la que depende*
                    </label>
                    {errors.area_padre_id && (
                        <p className="text-red-500 text-xs mt-1">{errors.area_padre_id.message}</p>
                    )}
                </div>

                <div className="flex items-end">
                    <button
                        onClick={open}
                        className="bg-green-dark text-white px-4 py-2 rounded-lg hover:bg-green-dark/80 transition duration-200"
                        type="button"
                    >
                        Ver organigrama
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <InputField
                    id="name"
                    label="Nombre del área*"
                    placeholder="Ejemplo: Dirección de Recursos Humanos"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                    disabled={isEditing}
                />
                <InputField
                    id="nomenclatura"
                    label="Nomenclatura*"
                    placeholder="Ejemplo: DRH"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                    disabled={isEditing}
                />
            </div>

            {/* Entidad, municipio y código postal */}
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
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

                <InputField
                    id="codigo_postal"
                    label="Código postal*"
                    type="number"
                    placeholder="Ejemplo: 12345"
                    register={register}
                    errors={errors}
                    maxLength={5}
                    rules={{
                        required: "Este campo es requerido",
                        pattern: {
                            value: /^[0-9]{5}$/,
                            message: "Debe tener 5 dígitos",
                        },
                    }}
                    disabled={isEditing}
                />
            </div>

            {/* Domicilio */}
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-5">
                <InputField
                    id="colonia"
                    label="Colonia*"
                    placeholder="Ejemplo: Centro"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                    disabled={isEditing}
                />
                <InputField
                    id="calle"
                    label="Calle*"
                    placeholder="Ejemplo: Av. Principal"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                    disabled={isEditing}
                    additionalClasses="col-span-2"
                />
                <div className="flex items-end gap-2">
                    <InputField
                        id="numero_exterior"
                        label="No. exterior*"
                        placeholder="Ejemplo: 123"
                        register={register}
                        errors={errors}
                        rules={{ required: "Este campo es requerido" }}
                        disabled={isEditing}

                    />
                    <InputField
                        id="numero_interior"
                        label="No. Interior"
                        placeholder="Ejemplo: 456"
                        register={register}
                        errors={errors}
                        disabled={isEditing}
                    />
                </div>
                <InputField
                    id="telefono"
                    label="Teléfono*"
                    type="number"
                    placeholder="Ejemplo: 1234567890"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Este campo es requerido",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Debe tener 10 dígitos",
                        },
                    }}
                    disabled={isEditing}
                />
            </div>

            <ModalOrg isOpen={isOpen} close={close} orgData={orgData} />
        </>
    )
}

export default AreasForm
