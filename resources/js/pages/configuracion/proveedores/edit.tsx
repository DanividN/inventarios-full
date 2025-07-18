import ProveedoresEditForm from "@/components/proveedores/ProveedoresEditForm";
import AppLayout from "@/layouts/app-layout";
import { Estados } from "@/types/Estados";
import { usePage } from "@inertiajs/react";

type Props = PageProps & {
  estados: Estados[]
}
export default function ProveedoresEdit({ estados }: Props) {
    const { proveedores } = usePage<{
        proveedores: any;
    }>().props;

    const data = {
        proveedor: proveedores
    }
    return (
        <>
            <ProveedoresEditForm data={data} estados={estados}/>
        </>
    )
}
