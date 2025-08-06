import FormEntregaInventariables from "@/components/entregaInventariable/FormEntregaInventariables";
import TableEntregas from "@/components/entregaInventariable/TableEntregas";
import CancelButton from "@/components/ui/CancelButton";
import CardComponent from "@/components/ui/CardComponent";
import SaveButton from "@/components/ui/SaveButton";
import { Area } from "@/types/Areas";
import { Clasificaciones } from "@/types/Clasificaciones";
import { EntregasInventariableFormValue } from "@/types/EntregasInventariableFormValue";
import { router, usePage } from "@inertiajs/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = PageProps & {
    areas: Area[];
    clasificaciones: Clasificaciones[];
};

export default function EntregasInventariablesCreate({ areas, clasificaciones }: Props) {
    const { props } = usePage();
    const user = props.auth?.user || { name: "Usuario", role: "Invitado" };

    const defaultValues: EntregasInventariableFormValue = {
        area_id: '',
        enlace: '',
        articulo_id: '',
        entregado_por: user.name,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
    } = useForm<EntregasInventariableFormValue>({
        defaultValues
    });

    const [articles, setArticles] = useState<any[]>([]);

    const handleAddArticle = () => {
        const selectedArticuloId = watch("articulo_id");

        if (!selectedArticuloId) return;

        if (articles.find(article => article.id === selectedArticuloId)) return;

        const selectedOption = allArticulos.find(a => a.value === selectedArticuloId);
        if (!selectedOption) return;

        const articulo = selectedOption.data;
        console.log(articulo);
        setArticles(prev => [...prev, {
            id: articulo.id,
            inventoryNumber: articulo.numero_inventario,
            expenseItem: articulo.clasificacion.clave + " - " + articulo.clasificacion.clasificacion,
            itemName: articulo.nombre,
            brand: articulo.marca,
            model: articulo.modelo,
            unitCost: articulo.costo_unitario,
        }]);

        setValue("articulo_id", "");
    };


    const handleRemoveArticle = (id: string) => {
        setArticles(prev => prev.filter(article => article.id !== id));
    };

    const [allArticulos, setAllArticulos] = useState<any[]>([]);

    const handleClasificacionChange = async (selectedOption: any) => {
        try {
            setValue("articulo_id", "");
            setAllArticulos([]);

            const response = await fetch(`/articulos/${selectedOption.value}`);
            const data = await response.json();

            const options = data.map((articulo: any) => ({
                value: articulo.id,
                label: articulo.numero_inventario + " - " + articulo.nombre,
                data: articulo,
            }));

            setAllArticulos(options);
        } catch (error) {
            console.error("Error fetching articulos:", error);
        }
    };

    const onSubmit: SubmitHandler<EntregasInventariableFormValue> = (data) => {
        if (articles.length === 0) {
            toast.error("Debe agregar al menos un artículo a la entrega");
            return;
        }

        const payload = {
            ...data,
            articulos_entregados: articles // <-- Agregamos los artículos aquí
        };

        router.post('/funciones/entregas/inventariables', payload, {
            onSuccess: () => {
                toast.success("Entrega creada con éxito");
            },
            onError: (serverErrors) => {
                const errorMessages = Object.values(serverErrors).flat();
                errorMessages.forEach(error => toast.error(error));
            }
        });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardComponent title="Entrega de bienes">
                <FormEntregaInventariables
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValues={defaultValues}
                    isEditing={false}
                    areas={areas}
                    clasificaciones={clasificaciones}
                    setValue={setValue}
                    handleAddArticle={handleAddArticle}
                    articulos={allArticulos}
                    handleClasificacionChange={handleClasificacionChange}
                />
            </CardComponent>

            <CardComponent title="Artículos">
                <TableEntregas
                    articles={articles}
                    register={register}
                    handleRemoveArticle={handleRemoveArticle}
                />
                <div className="flex justify-end gap-3 pt-4">
                    <CancelButton link='/funciones/entregas/inventariables' />
                    <SaveButton />
                </div>
            </CardComponent>
        </form>
    );
}
