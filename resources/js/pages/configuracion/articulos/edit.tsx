import ArticulosEditForm from "@/components/articulos/ArticulosEditForm";
import { Clasificaciones } from "@/types/Clasificaciones"
import { usePage } from "@inertiajs/react";

type Props = PageProps & {
    clasificaciones: Clasificaciones[]
}
export default function ArticulosEdit({ clasificaciones }: Props) {
    const { articulos } = usePage<{
        articulos: any
    }>().props;

    const data = {
        articulo: articulos
    }
    return (
        <>
            <ArticulosEditForm
                data={data}
                clasificaciones={clasificaciones}
            />
        </>
    )
}

