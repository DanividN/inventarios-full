import { Area } from "@/types/areas"
import { Clasificaciones } from "@/types/Clasificaciones"
import { Proveedores } from "@/types/Proveedores"
import { InventariablesFormValues } from "@/types/InventariablesFormValues"
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { XCircleIcon } from "lucide-react"
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import { CurrencyInputField } from "../ui/CurrencyInputField"
import FileInput from "../ui/FileInput"

type InventariablesFormProps = {
    control: Control<InventariablesFormValues>
    register: UseFormRegister<InventariablesFormValues>
    errors: FieldErrors<InventariablesFormValues>
    defaultValues: InventariablesFormValues
    isEditing?: boolean
    clasificaciones: Clasificaciones[]
    areas: Area[]
    proveedores: Proveedores[]
    setValue: UseFormSetValue<InventariablesFormValues>
    watch: UseFormSetValue<InventariablesFormValues>
}

export default function InventariablesForm({
    control,
    register,
    errors,
    defaultValues,
    isEditing,
    clasificaciones,
    areas,
    proveedores,
    setValue,
    watch }: InventariablesFormProps) {

    const tipo = watch("tipo");

    const optionsClasificaciones = clasificaciones.map((clasificacion) => ({
        value: clasificacion.id,
        label: clasificacion.clave + " - " + clasificacion.clasificacion
    }))

    const optionsAreas = areas.map((area) => ({
        value: area.id,
        label: area.name
    }))

    const optionsProveedores = proveedores.map((proveedor) => ({
        value: proveedor.id,
        label: proveedor.tipo === "fisica" ? proveedor.nombre + " " + proveedor.apellido_paterno + " " + proveedor.apellido_materno : proveedor.razon_social
    }))

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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Columnas 1-4: Campos del formulario */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                        <SelectField
                            id="tipo"
                            label="Tipo*"
                            options={[
                                { value: "1", label: "Asignado" },
                                { value: "2", label: "Almacén" },
                            ]}
                            value={defaultValues.tipo}
                            control={control}
                            defaultValues={defaultValues}
                            rules={{ required: "Este campo es requerido" }}
                            errors={errors}
                            disabled={isEditing}
                        />
                        <SelectField
                            id="clasificacion_id"
                            label="Clasificacion del bien*"
                            options={optionsClasificaciones}
                            value={defaultValues}
                            control={control}
                            defaultValues={defaultValues}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo es requerido"
                            }}
                            errors={errors}
                            disabled={isEditing}
                        />
                        <SelectField
                            id="alta"
                            label="Tipo de alta*"
                            options={[
                                { value: "1", label: "Compra" },
                                { value: "2", label: "Donación" },
                                { value: "3", label: "Transferencia" },
                                { value: "4", label: "Comodato" },
                            ]}
                            value={defaultValues.tipoAlta}
                            control={control}
                            defaultValues={defaultValues}
                            rules={{ required: "Este campo es requerido" }}
                            errors={errors}
                            disabled={isEditing}
                        />
                        <InputField
                            id="grupo_activo"
                            label="Grupo del activo*"
                            type="text"
                            placeholder="Ejemplo: Patrimonial"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={true}
                            value={defaultValues.grupo}
                        />
                    </div>

                    <div className={`grid grid-cols-1 mt-4 gap-4 ${tipo === "1" ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
                        {tipo === "1" ? (
                            <SelectField
                                id="area_id"
                                label="Área*"
                                options={optionsAreas}
                                control={control}
                                defaultValues={defaultValues}
                                errors={errors}
                                rules={{
                                    validate: (value) => value !== 0 || "Este campo es requerido"
                                }}
                                disabled={isEditing}
                            />
                        ) : null}

                        <InputField
                            id="fecha_ingreso"
                            label="Fecha*"
                            type="date"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                        <InputField
                            id="numero_inventario"
                            label="Nº Inventario*"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                        <SelectField
                            id="depreciacion"
                            label="Concepto de depreciación*"
                            options={[
                                { value: "1", label: "Mobiliario" },
                                { value: "2", label: "Equipo de transporte" },
                                { value: "3", label: "Maquinaria" },
                            ]}
                            value={defaultValues.depreciacion}
                            control={control}
                            defaultValues={defaultValues}
                            rules={{ required: "Este campo es requerido" }}
                            errors={errors}
                            disabled={isEditing}
                        />
                    </div>

                    <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-3">
                        <InputField
                            id="nombre"
                            label="Nombre*"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                        <InputField
                            id="marca"
                            label="Marca*"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                        <InputField
                            id="modelo"
                            label="Modelo*"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <InputField
                            id="serie"
                            label="Serie*"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                        <InputField
                            id="numero_motor"
                            label="Nº Motor"
                            register={register}
                            errors={errors}
                            disabled={isEditing}
                            required={false}
                        />
                        <InputField
                            id="numero_factura"
                            label="Nº Factura"
                            register={register}
                            errors={errors}
                            disabled={isEditing}
                            required={false}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <SelectField
                            id="proveedor_id"
                            label="Proveedor*"
                            options={optionsProveedores}
                            control={control}
                            defaultValues={defaultValues}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo es requerido"
                            }}
                            errors={errors}
                            disabled={isEditing}
                        />
                        <SelectField
                            id="estado"
                            label="Estado de uso"
                            options={[
                                { value: "1", label: "Nuevo" },
                                { value: "2", label: "Usado" },
                                { value: "3", label: "Reacondicionado" },
                            ]}
                            value={defaultValues.estado}
                            control={control}
                            defaultValues={defaultValues}
                            rules={{ required: "Este campo es requerido" }}
                            errors={errors}
                            disabled={isEditing}
                        />
                        <InputField
                            id="costo_unitario"
                            label="Costo Unitario*"
                            placeholder="Ejemplo: 100"
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                            currency={true}
                            currencyCode="USD"
                            locale="en-US"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                        <InputField
                            id="numero_economico"
                            label="Nº Económico"
                            register={register}
                            errors={errors}
                            disabled={isEditing}
                            required={false}
                        />
                        <InputField
                            id="placas"
                            label="Placas"
                            register={register}
                            errors={errors}
                            disabled={isEditing}
                            required={false}
                        />
                        <InputField
                            id="tipo_poliza"
                            label="Tipo de poliza"
                            register={register}
                            errors={errors}
                            disabled={isEditing}
                            required={false}
                        />
                        <InputField
                            id="numero_poliza"
                            label="Nº de poliza"
                            register={register}
                            errors={errors}
                            disabled={isEditing}
                            required={false}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <InputField
                            id="descripcion"
                            label="Descripción"
                            placeholder="Ejemplo: Juan Perez S.A."
                            register={register}
                            errors={errors}
                            rules={{ required: "Este campo es requerido" }}
                            disabled={isEditing}
                        />
                    </div>

                </div>

                <div className="lg:col-span-1">
                    <div className="space-y-4 top-6">
                        <FileInput
                            id="imagenes"
                            label="Imagenes"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            rules={{
                                validate: (files) =>
                                    files && files.length > 0 || "Debes seleccionar al menos un archivo"
                            }}
                            disabled={isEditing}
                        />
                        {/* Mostrar las imagenes que se cargaron previamente y las que apenas se van a guardar */}
                         {isEditing && defaultValues.imagenes && (
                            JSON.parse(defaultValues.imagenes).map((path, index) => (
                                <img
                                    key={index}
                                    src={`/funciones/inventarios/inventariables/${path.split('/').pop()}`}
                                    alt={`INE ${index}`}
                                    className="cursor-pointer max-w-[200px] mb-2 rounded shadow"
                                    onClick={() => openImageViewer(`/funciones/inventarios/inventariables/${path.split('/').pop()}`)}
                                />

                            ))
                        )}
                    </div>

                </div>
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

