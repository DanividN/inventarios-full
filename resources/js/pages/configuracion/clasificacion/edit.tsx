import ClasificacionEditForm from "@/components/clasificacion/ClasificacionEditForm";
import { usePage } from "@inertiajs/react"

export default function ClasificacionEdit() {
    const { clasificacion } = usePage<{
        clasificacion: any;
    }>().props;

    const data = {
        clasificacion: clasificacion
    }
    return (
         <>
            <ClasificacionEditForm data={data}/>
        </>
    )
}
