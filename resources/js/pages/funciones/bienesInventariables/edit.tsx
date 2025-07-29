import { Area } from "@/types/Areas"
import { Clasificaciones } from "@/types/Clasificaciones"
import { Proveedores } from "@/types/Proveedores"
import InventariablesEditForm from "@/components/inventariables/InventariablesEditForm"
import { usePage } from "@inertiajs/react"

type Props = PageProps & {
    areas: Area[]
    proveedores: Proveedores[]
    clasificaciones: Clasificaciones[]
}
export default function BienesInventariablesEdit({ areas, proveedores, clasificaciones }: Props) {
    const { bienes } = usePage<{
        bienes: any;
    }>().props;

    const data = {
        bien: bienes
    }
    return (
        <>
            <InventariablesEditForm data={data} areas={areas} proveedores={proveedores} clasificaciones={clasificaciones}/>
        </>
    )
}
