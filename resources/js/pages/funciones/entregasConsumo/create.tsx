import FormEntregaConsumo from "@/components/entregaConsumo/FormEntregaConsumo"
import TableEntregasConsumo from "@/components/entregaConsumo/TableEntregasConsumo"
import TableEntregas from "@/components/entregaInventariable/TableEntregas"
import CancelButton from "@/components/ui/CancelButton"
import CardComponent from "@/components/ui/CardComponent"
import SaveButton from "@/components/ui/SaveButton"
import { Area } from "@/types/Areas"
import { Clasificaciones } from "@/types/Clasificaciones"
import { EntregasConsumoFormValue } from "@/types/EntregasConsumoFormValue"
import { router, usePage } from "@inertiajs/react"
import { set } from "date-fns"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

type Props = PageProps & {
    areas: Area[]
    clasificaciones: Clasificaciones[]
}

export default function EntregasConsumoCreate({ areas, clasificaciones }: Props) {
    const { props } = usePage();

    const user = props.auth?.user || { name: "Usuario", role: "Invitado" };

    const defaultValues: EntregasConsumoFormValue = {
        area_id: '',
        enlace: '',
        articulo_id: '',
        cantidad: 0,
        unidadMedida: '',
        entregado_por: user.name,
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
    } = useForm<EntregasConsumoFormValue>({
        defaultValues,
    });

    const [articles, setArticles] = useState<any[]>([]);

    const handleAddArticle = () => {
        const selectedArticuloId = watch("articulo_id");
        const cantidad_articulo = watch("cantidad");

        // no puede agregar articulos sin cantidad
        if (cantidad_articulo <= 0) {
            toast.error("No puede agregar artículos sin cantidad");
            return;
        }

        if (!selectedArticuloId) return;

        if (articles.find(article => article.id === selectedArticuloId)) return;

        const selectedOption = allArticulos.find(a => a.value === selectedArticuloId);
        if (!selectedOption) return;

        const articuloAdd = selectedOption.data;


        if (cantidad_articulo > Number(articuloAdd.cantidad)) {
            toast.error("No hay suficiente stock disponible para este artículo: Disponible: " + articuloAdd.cantidad + ", Solicitado: " + cantidad_articulo );
            return;
        }
        setArticles(prev => [...prev, {
            id: articuloAdd.articulo.id,
            numeroInventario: articuloAdd.articulo.numero_parte,
            clasificacion: articuloAdd.clasificacion.clave + " - " + articuloAdd.clasificacion.clasificacion,
            cantidad_asignada: cantidad_articulo,
            unidadMedida: articuloAdd.unidad_medida,
            articulo: articuloAdd.articulo.articulo,
        }]);

        setValue("articulo_id", "");
        setValue("cantidad", 0);
        setValue("unidadMedida", "");
    };

    const handleRemoveArticle = (id: string) => {
        setArticles(prev => prev.filter(article => article.id !== id));
    };

    const [allArticulos, setAllArticulos] = useState<any[]>([]);

    const handleClasificacionChange = async (selectedOption: any) => {
        try {
            setValue("articulo_id", "");
            setAllArticulos([]);

            const response = await fetch(`/articulosConsumible/${selectedOption.value}`);
            const data = await response.json();
            console.log(data);
            const options = data.map((consumo: any) => ({
                value: consumo.articulo.id,
                label: consumo.articulo.articulo,
                data: consumo,
            }));

            setAllArticulos(options);
        } catch (error) {
            console.error("Error fetching articulos:", error);
        }
    };

    const handleArticuloChange = (selectedOption: any) => {

        const articulo = allArticulos.find(a => a.value === selectedOption.value);
        if (articulo) {
            setValue("unidadMedida", articulo.data.unidad_medida || "");
        } else {
            setValue("unidadMedida", "");
        }
    };

    const onSubmit: SubmitHandler<EntregasConsumoFormValue> = (data) => {
        if (articles.length === 0) {
            toast.error("Debe agregar al menos un artículo a la entrega");
            return;
        }

        const payload = {
            ...data,
            articulos_entregados: articles // <-- Agregamos los artículos aquí
        };

        router.post('/funciones/entregas/consumo', payload, {
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
            <CardComponent title="Entrega de consumibles">
                <FormEntregaConsumo
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
                    handleArticuloChange={handleArticuloChange}
                />
            </CardComponent>
            <CardComponent title="Artículos">
                <TableEntregasConsumo
                    articles={articles}
                    register={register}
                    handleRemoveArticle={handleRemoveArticle}
                />
                <div className="flex justify-end gap-3 pt-4">
                    <CancelButton link='/funciones/entregas/consumo' />
                    <SaveButton />
                </div>
            </CardComponent>
        </form>
    )
}
