import AreasEditForm from "@/components/areas/AreasEditForm";
import AppLayout from "@/layouts/app-layout";
import { usePage } from "@inertiajs/react";
type Area = {
  id: string
  nombre_area: string
  orgData?: { name: string } // opcional si lo quieres para el modal
}

type Estado = {
  id: string
  nombre: string
}

type Props = PageProps & {
  areas: Area[]
  estados: Estado[]
}

export default function AreasEdit({ areas, estados }: Props) {

    const { area } = usePage<{
        area: any;
    }>().props;

    const data = {
        area: area
    }

    return (
        <>
            <AreasEditForm data={data}  areas={areas} estados={estados}/>
        </>
    )
}
