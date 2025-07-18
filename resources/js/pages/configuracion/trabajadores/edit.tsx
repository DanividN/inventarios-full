import TrabajadoresEditForm from "@/components/trabajadores/TrabajadoresEditForm";
import AppLayout from "@/layouts/app-layout";
import { usePage } from "@inertiajs/react";

type Area = {
    id: string;
    nombre_area: string;
}

type Props = PageProps & {
    areas: Area[]
}
export default function TrabajadoresEdit({ areas }: Props) {
    const { trabajador } = usePage<{
        trabajador: any;
    }>().props;

    const data = {
        trabajador: trabajador
    }

    return (
        <>
            <TrabajadoresEditForm data={data} areas={areas} />
        </>
    )
}
