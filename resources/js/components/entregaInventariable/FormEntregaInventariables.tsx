import { Area } from "@/types/Areas";
import { Clasificaciones } from "@/types/Clasificaciones";
import { EntregasInventariableFormValue } from "@/types/EntregasInventariableFormValue";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import SelectField from "../ui/SelectField";
import InputField from "../ui/InputField";

type Props = {
    control: Control<EntregasInventariableFormValue>;
    register: UseFormRegister<EntregasInventariableFormValue>;
    errors: FieldErrors<EntregasInventariableFormValue>;
    defaultValues: EntregasInventariableFormValue;
    isEditing: boolean;
    clasificaciones: Clasificaciones[];
    areas: Area[];
    setValue: UseFormSetValue<EntregasInventariableFormValue>;
    handleAddArticle: () => void;
    articulos: { value: string, label: string }[];
    handleClasificacionChange: (option: any) => void;
};

export default function FormEntregaInventariables({
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
    handleClasificacionChange
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
                    defaultValue={defaultValues.enlace}
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
                    defaultValue={defaultValues.entregado_por}
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
                    additionalClasses="col-span-2"
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
                    additionalClasses="col-span-2"
                    errors={errors}
                    disabled={isEditing}
                />
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleAddArticle}
                        className="border border-green-dark rounded-md text-green-dark hover:bg-green-dark hover:text-white px-6 py-2 mt-4"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </>
    );
}
