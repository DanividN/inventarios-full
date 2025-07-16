import { TrabajadoresFormValues } from "@/types/TrabajadoresFormValues"
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import SelectField from "../ui/SelectField"
import InputField from "../ui/InputField"
import FileInput from "../ui/FileInput"
import { useState } from "react"

type TrabajadoresFormProps = {
    control: Control<TrabajadoresFormValues>
    register: UseFormRegister<TrabajadoresFormValues>
    errors: FieldErrors<TrabajadoresFormValues>
    defaultValues: TrabajadoresFormValues
    isEditing: boolean
    areas: Area[]
    setValue: UseFormSetValue<TrabajadoresFormValues>
}

const TrabajadoresForm: React.FC<TrabajadoresFormProps> = ({
    control,
    register,
    errors,
    defaultValues,
    isEditing,
    areas,
    setValue
}) => {

    const optionsAreas = areas.map(area => ({
        value: area.id,
        label: area.name,
    }))

    // ImageViewer
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const openImageViewer = (src: string) => {
        setSelectedImage(src);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <SelectField
                    id="area_id"
                    label="Área"
                    options={optionsAreas}
                    control={control}
                    defaultValues={defaultValues}
                    rules={{ required: "El campo es obligatorio" }}
                    errors={errors}
                    disabled={isEditing}
                />
                <InputField
                    id="cargo"
                    label="Cargo"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />
                <InputField
                    id="numero_empleado"
                    label="No. Empleado"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <InputField
                    id="nombre"
                    label="Nombre(s)"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />

                <InputField
                    id="apellido_paterno"
                    label="Apellido Paterno"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />
                <InputField
                    id="apellido_materno"
                    label="Apellido Materno"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <InputField
                    id="fecha_ingreso"
                    label="Fecha Ingreso"
                    type="date"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />
                <InputField
                    id="telefono"
                    label="Teléfono"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />
                <InputField
                    id="folio_ine"
                    label="Folio INE"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "El campo es obligatorio" }}
                    defaultValues={defaultValues}
                    disabled={isEditing}
                />
                <FileInput
                    id="foto_ine"
                    label="INE (Anverso e inverso)"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    rules={{
                        validate: (files) =>
                            files && files.length > 0 || "Debes seleccionar al menos un archivo"
                    }}
                    disabled={isEditing}
                />
                {isEditing && defaultValues.foto_ine && (
                    JSON.parse(defaultValues.foto_ine).map((path, index) => (
                        <img
                            key={index}
                            src={`/configuracion/trabajadores/ine_fotos/${path.split('/').pop()}`}
                            alt={`INE ${index}`}
                            className="cursor-pointer max-w-[200px] mb-2 rounded shadow"
                            onClick={() => openImageViewer(`/configuracion/trabajadores/ine_fotos/${path.split('/').pop()}`)}
                        />

                    ))
                )}

            </div>
            {showModal && selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <img
                        src={selectedImage}
                        alt="Vista previa"
                        className="max-h-[90%] max-w-[90%] rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en la imagen
                    />
                </div>
            )}

        </>
    )
}

export default TrabajadoresForm
