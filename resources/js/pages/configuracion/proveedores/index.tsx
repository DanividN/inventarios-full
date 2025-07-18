import ActionMenu from "@/components/ui/ActionMenu";
import TableComponent from "@/components/ui/TableComponent";
import AppLayout from "@/layouts/app-layout";
import { router, usePage } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Proveedores() {
    const { proveedores, successMessage, errorMessage } = usePage<{
        proveedores: any[]
        successMessage?: string
        errorMessage?: string
    }>().props;

    useEffect(() => {
        if (successMessage) toast.success(successMessage)
        if (errorMessage) toast.error(errorMessage)
    }, [successMessage, errorMessage])

    const columns = useMemo(
        () => [
            {
                accessorKey: "fechaRegistro",
                label: "Fecha de Registro",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "nombre",
                label: "Nombre de proveedor / Representante legal",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "tipo",
                label: "Tipo de persona",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "rfc",
                label: "RFC",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "entidadFederativa",
                label: "Entidad federativa",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "status",
                label: "Estatus",
                cell: (info: any) => {
                    const status = info.getValue();
                    const row = info.row.original;

                    const toggleStatus = async () => {
                        const result = await Swal.fire({
                            title: status === "Activo" ? "¿Desactivar proveedor?" : "¿Activar proveedor?",
                            text: `Estás a punto de ${status === "Activo" ? "desactivar" : "activar"} este proveedor.`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Sí, continuar",
                            cancelButtonText: "Cancelar",
                        });

                        if (result.isConfirmed) {
                            router.put(
                                `/configuracion/proveedores/${row.id}/toggle-estatus`,
                                {},
                                {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        toast.success("Estatus del proveedor actualizado correctamente.");
                                    },
                                    onError: () => {
                                        toast.error("Error al cambiar el estatus del proveedor");
                                    },
                                }
                            );
                        }
                    };

                    return (
                        <button
                            onClick={toggleStatus}
                            className={`px-2 py-1 rounded text-sm ${status === "Activo"
                                ? "text-green-600 bg-green-100 hover:bg-green-200"
                                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {status}
                        </button>
                    );
                },
                filterType: "select",
                filterValues: ["Activo", "Inactivo"],
            }
            ,
            {
                accessorKey: "id",
                label: "Acciones",
                cell: (info: any) => (
                    <ActionMenu
                        to={`/configuracion/proveedores/edit/${info.getValue()}`}
                        text="Ver"
                    />
                ),
                disableFilter: true
            },
        ],
        []);

    const data = proveedores.map((proveedor) => ({
        id: proveedor.id,
        fechaRegistro: new Date(proveedor.created_at).toLocaleDateString(),
        nombre: proveedor.tipo === "fisica" ? proveedor.nombre + " " + proveedor.apellido_paterno + " " + proveedor.apellido_materno : proveedor.razon_social,
        tipo: proveedor.tipo === "fisica" ? "Fisica" : "Moral",
        rfc: proveedor.rfc,
        entidadFederativa: proveedor.municipio?.estado?.nombre,
        status: proveedor.estatus === "activo" ? "Activo" : "Inactivo",
    }))

    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonCreate={true}
                iconButtonCreate={<PlusIcon />}
                titleButtonCreate="Agregar proveedor"
                toButtonCreate="/configuracion/proveedores/crear"
            />
        </>
    )
}
