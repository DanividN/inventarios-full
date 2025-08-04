
import { ConsumoFormValue } from "@/types/ConsumoFormValue";
import { Control, Field, FieldErrors, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { Clasificaciones } from "@/types/Clasificaciones";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { Proveedor } from "@/types/Proveedores";

type FormBienProps = {
    control: Control<ConsumoFormValue>;
    register: UseFormRegister<ConsumoFormValue>;
    errors: FieldErrors<ConsumoFormValue>;
    defaultValues: ConsumoFormValue;
    isEditing?: boolean;
    clasificaciones: Clasificaciones[];
    proveedores: Proveedor[];
    setValue: UseFormSetValue<ConsumoFormValue>;
}


export default function FormBienConsumo({
    control,
    register,
    errors,
    defaultValues,
    isEditing = false,
    clasificaciones,
    proveedores,
    setValue
}: FormBienProps) {

    const optionsClasificaciones = clasificaciones.map((clasificacion) => ({
        value: clasificacion.id,
        label: clasificacion.clave + " - " + clasificacion.clasificacion
    }));

    const optionsProveedores = proveedores.map((proveedor) => ({
        value: proveedor.id,
        label: proveedor.tipo === "fisica" ? proveedor.nombre + " " + proveedor.apellido_paterno + " " + proveedor.apellido_materno : proveedor.razon_social
    }));

    const [articulos, setArticulos] = useState([]);
    const [unidadMedida, setUnidadMedida] = useState([]);

    const handleClassificationChange = async (selectedOption: any) => {
        try {
            const response = await fetch(`/getArticulos/${selectedOption.value}`);
            const data = await response.json();
            const articulosOptions = data.map((articulo: any) => ({
                value: articulo.id,
                label: articulo.articulo
            }))
            setArticulos(articulosOptions);
            setValue("articulo_id", "");
        } catch (error) {
            console.error(error);
        }
    }

    const handleArticuloChange = async (selectedOption: any) => {
        try {
            const response = await fetch(`/getUnidad/${selectedOption.value}`);
            const data = await response.json();
            console.log(data);

            const unidadMedida = [{
                value: data.unidad_medida,
                label: data.unidad_medida
            }];

            setUnidadMedida(unidadMedida);
            setValue("unidad_medida", unidadMedida[0].value);
        } catch (error) {
            console.error(error);
        }
    };

    const cantidad = useWatch({ control, name: "cantidad" });
    const costoUnitario = useWatch({ control, name: "costo_unitario" });

    useEffect(() => {
        const cantidadNum = parseFloat(cantidad);
        const costoUnitarioNum = parseFloat(costoUnitario);

        if (!isNaN(cantidadNum) && !isNaN(costoUnitarioNum)) {
            const total = cantidadNum * costoUnitarioNum;
            const totalFormatted = new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN"
            }).format(total);

            setValue("costo_total", totalFormatted);
        } else {
            setValue("costo_total", "$0.00");
        }
    }, [cantidad, costoUnitario, setValue]);

    return (
        <>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 gap-4">
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
                    onChange={handleClassificationChange}
                />
                <SelectField
                    id="articulo_id"
                    label="Artículo*"
                    options={articulos}
                    value={optionsClasificaciones.find(option => option.value === defaultValues.articulo_id)}
                    control={control}
                    defaultValues={defaultValues}
                    rules={{
                        validate: (value) => value !== 0 || "Este campo es requerido"
                    }}
                    errors={errors}
                    disabled={isEditing}
                    onChange={handleArticuloChange}
                />
                <SelectField
                    id="proveedor_id"
                    label="Proveedor"
                    options={optionsProveedores}
                    value={defaultValues.proveedor}
                    control={control}
                    defaultValues={defaultValues}
                    rules={{
                        validate: (value) => value !== 0 || "Este campo es requerido"
                    }}
                    errors={errors}
                />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-4">
                <InputField
                    id="cantidad"
                    label="Cantidad*"
                    type="number"
                    placeholder="Ejemplo: 100"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                />
                <SelectField
                    id="unidad_medida"
                    label="Unidad de medida*"
                    options={unidadMedida}
                    value={defaultValues.unidad_medida}
                    control={control}
                    defaultValues={defaultValues}
                    errors={errors}
                    disabled={true}
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
                <InputField
                    id="costo_total"
                    label="Costo Total*"
                    type="text"
                    register={register}
                    errors={errors}
                    rules={{ required: "Este campo es requerido" }}
                    disabled={true}
                />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4">
                <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                    placeholder="Descripción"
                    {...register("descripcion")}
                />
            </div>
        </>
    );
}
