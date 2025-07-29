import ActionMenu from "@/components/ui/ActionMenu";
import Modal from "@/components/ui/Modal";
import TableComponent from "@/components/ui/TableComponent";
import { router, usePage } from "@inertiajs/react";
import { DeleteIcon, PlusIcon, QrCodeIcon, Trash2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";




export default function BienesInventariables() {
    const { bienes } = usePage<{
        bienes: any;
    }>().props;

    const [isModalEtiquetasOpen, setIsModalEtiquetasOpen] = useState(false);
    const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "numInventario",
                label: "Nº Inventario",
                filterFn: "equalsString",
            },
            {
                accessorKey: "fechaRegistro",
                label: "Fecha de registro",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "tipo",
                label: "Tipo",
                cell: (info: any) => info.getValue(),
                filterType: "select",
            },
            {
                accessorKey: "area",
                label: "Área",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "nombreBien",
                label: "Nombre del bien",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "marca",
                label: "Marca",
                cell: (info: any) => info.getValue(),
                filterType: "select",
            },
            {
                accessorKey: "modelo",
                label: "Modelo",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "etiqueta",
                label: "Etiqueta",
                cell: (info: any) => (
                    <button
                        className="bg-none border border-gray-400 text-gray-500 px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-700 inline-flex items-center gap-2"
                        onClick={() => agregarEtiqueta(info.row.original)}
                    >
                        <QrCodeIcon className="h-4" /> Enviar QR
                    </button>
                ),
                disableFilter: true,
            },
            {
                accessorKey: "acciones",
                label: "Acciones",
                cell: (info: any) => {
                    const row = info.row.original;
                    const bajaArticulo = async () => {
                        const result = await Swal.fire({
                            title: "¿Deseas dar de baja el artículo?",
                            text: `Estás a punto de dar de baja el artículo.`,
                            icon: "error",
                            showCancelButton: true,
                            confirmButtonText: "Sí, continuar",
                            cancelButtonText: "Cancelar",
                        });

                        if (result.isConfirmed) {
                            router.put(
                                `/funciones/inventarios/inventariables/baja/${row.id}`,
                                {},
                                {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        toast.success("El artículo ha sido dado de baja.");
                                    },
                                    onError: () => {
                                        toast.error("Error al dar de baja el artículo.");
                                    },
                                }
                            );
                        }
                    };

                    return (
                        <div className={`${row.estatus === "inactivo" ? "" : ""} inline-flex gap-2`}>
                            <ActionMenu to={`/funciones/inventarios/inventariables/edit/${row.id}`} text="Ver" />

                            {/* no se muestra si el articulo esta dado de baja */}
                            {row.estatus === "activo" && (
                                <button
                                    className="text-red-500 bg-transparent border border-red-500 p-2 rounded-md hover:bg-red-200 hover:text-red"
                                    onClick={bajaArticulo}
                                >
                                    Baja
                                </button>
                            )}

                        </div>
                    )
                },
                disableFilter: true
            },
        ],
        []
    );

    const data = bienes.map((bien) => ({
        id: bien.id,
        numInventario: bien.numero_inventario,
        nombreArticulo: bien.nombre,
        fechaRegistro: new Date(bien.fecha_ingreso).toLocaleDateString(),
        tipo: bien.tipo === "asignado" ? "Asignado" : "Almacen",
        area: bien.area ? bien.area.name : "Almacen",
        nombreBien: bien.clasificacion.clasificacion,
        marca: bien.marca,
        modelo: bien.modelo,
        etiqueta: bien.etiqueta,
        estatus: bien.estatus
    }))

    const agregarEtiqueta = (item) => {
        setEtiquetasSeleccionadas((prev) => {
            const yaExiste = prev.some(
                (et) => et.numInventario === item.numInventario
            );

            if (yaExiste) {
                toast.info("Etiqueta ya agregada en cola de impresión");
                return prev; // no cambiamos el estado
            } else {
                toast.success("Etiqueta agregada a la cola de impresión");
                return [...prev, item]; // agregamos la nueva
            }
        });
    };

    const agregarTodasEtiquetas = () => {
        setEtiquetasSeleccionadas((prev) => {
            const nuevas = data.filter(
                (item) => !prev.some((et) => et.numInventario === item.numInventario)
            );
            return [...prev, ...nuevas];
        });
        openModal();
    };

    const openModal = () => setIsModalEtiquetasOpen(true);
    const closeModal = () => setIsModalEtiquetasOpen(false);

    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonCreate={true}
                iconButtonCreate={<PlusIcon />}
                titleButtonCreate="Registro del bien"
                toButtonCreate="/funciones/inventarios/inventariables/crear"
                showButtonSecondary={true}
                titleButtonSecondary="Cola de impresión"
                openModal={openModal}
                buttonThird={true}
                showButtonEtiquetas={true}
                titleButtonEtiquetas="Añadir todos"
                onClickButtonEtiquetas={agregarTodasEtiquetas}
            />
            {isModalEtiquetasOpen && (
                <Modal onClose={closeModal} title="Cola de impresión">
                    <div className="flex flex-col gap-4">
                        <div className="overflow-x-auto">
                            {etiquetasSeleccionadas.length > 0 ? (
                                <table className="min-w-full border text-sm">
                                    <thead className="bg-gray-100">
                                        <tr className="bg-gray-100 text-left">
                                            <th className="p-2 border">Nº Inventario</th>
                                            <th className="p-2 border">Clasificación del bien</th>
                                            <th className="p-2 border">Nombre del bien</th>
                                            <th className="p-2 border">Marca</th>
                                            <th className="p-2 border">Modelo</th>
                                            <th className="p-2 border text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border first:border-t-2 first:border-t-gray-300">
                                        {etiquetasSeleccionadas.map((item, idx) => (
                                            <tr key={idx} className="h-14 w-full align-middle  first:border-t-white odd:bg-white even:bg-[#edfbf6]">
                                                <td className="p-2 border">{item.numInventario}</td>
                                                <td className="p-2 border">{item.nombreBien}</td>
                                                <td className="p-2 border">{item.nombreArticulo}</td>
                                                <td className="p-2 border">{item.marca}</td>
                                                <td className="p-2 border">{item.modelo}</td>
                                                <td className="p-2 border text-center">
                                                    <button
                                                        className="text-red-500 hover:underline inline-flex items-center gap-1"
                                                        onClick={() =>
                                                            setEtiquetasSeleccionadas((prev) =>
                                                                prev.filter(
                                                                    (et) =>
                                                                        et.numInventario !== item.numInventario
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <Trash2Icon /> Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No hay etiquetas seleccionadas.
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                                onClick={() => setEtiquetasSeleccionadas([])}
                            >
                                Limpiar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                                onClick={() => {
                                    console.log("Etiquetas a imprimir:", etiquetasSeleccionadas);
                                    alert("Simulación de impresión de etiquetas");
                                }}
                            >
                                Imprimir
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
