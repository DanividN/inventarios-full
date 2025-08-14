import ActionMenu from "@/components/ui/ActionMenu";
import CancelButton from "@/components/ui/CancelButton";
import Modal from "@/components/ui/Modal";
import SaveButton from "@/components/ui/SaveButton";
import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

export default function ResguardosPendientes() {
    const [isModalEtiquetasOpen, setIsModalEtiquetasOpen] = useState(false);

    const openModal = () => setIsModalEtiquetasOpen(true);
    const closeModal = () => setIsModalEtiquetasOpen(false);

    const { pendientes } = usePage().props;

    const columns = useMemo(
        () => [
            {
                accessorKey: "noInventario",
                label: "Nº de inventario",
                filterFn: "equalsString",
            },
            {
                accessorKey: "area",
                label: "Área solicitante",
                filterFn: "equalsString",
            },
            {
                accessorKey: "Asignado",
                label: "Asignado",
                filterFn: "equalsString",
            },
            {
                accessorKey: "nombreBien",
                label: "Nombre del bien",
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "estadoUso",
                label: "Estado de uso",
                filterFn: "equalsString",
            },
            {
                accessorKey: "movimiento",
                label: "Movimiento",
                cell: (info: any) => info.getValue(), filterType: "select"
            },
            {
                accessorKey: "formatoResguardo",
                label: "Formato de resguardo",
                cell: (info: any) => (
                    <button className="px-2 py-1 border border-blue-400 text-blue-500 rounded-md">
                        Descargar
                    </button>
                ),
                disableFilter: true,
            },
            {
                accessorKey: "formatoFirmado",
                label: "Formato  firma",
                cell: (info: any) => (
                    <button className="px-2 py-1 border border-gray-400 rounded-md">
                        Pendiente
                    </button>
                ),
                disableFilter: true,
            },
            {
                accessorKey: "acciones",
                label: "Datos del bien",
                cell: (info: any) => (
                    <ActionMenu to={`/funciones/resguardos/pendientes/show/${info.row.original.noInventario}`} text={'Ver'} />
                ),
                disableFilter: true,
            },
        ],[]
    );

    const data = pendientes.map((pendiente) => ({
        noInventario: pendiente.noInventario,
        area: pendiente.area,
        Asignado: pendiente.Asignado,
        nombreBien: pendiente.nombreBien,
        estadoUso: pendiente.estadoUso,
        movimiento: pendiente.movimiento,
        formatoResguardo: pendiente.formatoResguardo,
        formatoFirmado: pendiente.formatoFirmado,
    }));

    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonSecondary={true}
                titleButtonSecondary="+ Agregar CREG"
                openModal={openModal}
                primaryButtonText={true}
            />
            {isModalEtiquetasOpen && (
                <Modal onClose={closeModal} title="Agregar CREG">
                    <div className="flex flex-col gap-4">
                        <div className="overflow-x-auto">
                            <form action="">
                                {/* <FormCreg
                                register={register}
                                errors={errors}
                                defaultValues={defaultValues}
                                isEditing={false}
                                control={control}
                            /> */}
                                <div className='flex justify-center md:justify-end mt-6'>
                                    <CancelButton link='/funciones/inventarios/inventariables' />
                                    <SaveButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
