import FormBienConsumo from "@/components/consumo/FormBienConsumo";
import ActionMenu from "@/components/ui/ActionMenu";
import Modal from "@/components/ui/Modal";
import SaveButton from "@/components/ui/SaveButton";
import TableComponent from "@/components/ui/TableComponent";
import { ConsumoFormValue } from "@/types/ConsumoFormValue";
import { router, usePage } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";



export default function BienesConsumoIndex() {
    const { consumos, clasificaciones, proveedores } = usePage<{
        consumos: any[];
        clasificaciones: any[];
        proveedores: any[];
    }>().props;

    const defaultValues: ConsumoFormValue = {
        clasificacion_id: "",
        articulo_id: "",
        proveedor_id: "",
        recibe: "",
        cantidad: "",
        unidad_medida: "",
        costo_unitario: "",
        costo_total: "",
        descripcion: "",
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<ConsumoFormValue>({
        defaultValues : defaultValues
    })


    const columns = useMemo(
        () => [
            {
                accessorKey: "noArticulo",
                label: "Nº Artículo",
                filterFn: "equalsString",
            },
            {
                accessorKey: "nombreArticulo",
                label: "Nombre del artículo",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "clasificacion",
                label: "Clasificación del bien",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",
            },
            {
                accessorKey: "cantidad",
                label: "Cantidad",
                cell: (info: any) => (
                    // si la cantidad es un número es menor o igual a stock minimo de el artículo, mostrar en rojo
                    <span className={info.getValue() <= info.row.original.stockMinimo ? "text-red-500" : "text-green-500"}>
                        {info.getValue()}
                    </span>
                ),
                disableFilter: true,
            },
            {
                accessorKey: "unidadMedida",
                label: "Unidad de medida",
                cell: (info: any) => info.getValue(),
                filterFn: "includesStringSensitive",

            },
            {
                accessorKey: "articuloID",
                label: "Acciones",
                cell: (info: any) => (
                    <ActionMenu
                        to={`/funciones/inventarios/consumo/historial/${info.getValue()}`}
                        text={"Historial"}
                    />
                ),
                disableFilter: true,
            },
        ],
        []
    );

    const data = consumos.map((consumo) => ({
        id: consumo.id,
        stockMinimo: consumo.articulo.stock_minimo,
        noArticulo: consumo.articulo.numero_parte,
        articuloID: consumo.articulo.id,
        nombreArticulo: consumo.articulo.articulo,
        clasificacion: consumo.clasificacion.clasificacion,
        cantidad: consumo.cantidad,
        unidadMedida: consumo.unidad_medida,
    }));

    const [nuevoBien, setNuevoBien] = useState(false);
    const openModal = () => setNuevoBien(true);
    const closeModal = () => setNuevoBien(false);

    const onSumbit: SubmitHandler<ConsumoFormValue> = (data) => {
        router.post('/funciones/inventarios/consumo', data, {
            onSuccess: () => {
                closeModal();
                toast.success("Se ingresó un bien consumible al almacén correctamente.");
            },
            onError: (error) => {
                console.error("Error al guardar el bien de consumo:", error);
            }
        });
    }


    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                showButtonSecondary={true}
                titleButtonSecondary={<span className="flex items-center gap-2"><PlusIcon /> Agregar Artículo</ span>}
                primaryButtonText={true}
                openModal={openModal}
            />
            {nuevoBien && (
                <Modal onClose={closeModal} title="Agregar Artículo">
                    <div className="flex flex-col gap-4">
                        <div className="overflow-x-auto">
                            <form onSubmit={handleSubmit(onSumbit)}>
                                <FormBienConsumo
                                    register={register}
                                    errors={errors}
                                    defaultValues={defaultValues}
                                    isEditing={false}
                                    control={control}
                                    clasificaciones={clasificaciones}
                                    proveedores={proveedores}
                                    setValue={setValue}
                                />
                                <div className="flex justify-center md:justify-end mt-6 gap-4">
                                    {/* boton para cerrar modal */}
                                    <button
                                        className='bg-white text-gray-400 rounded-lg px-6 py-2 mr-4 border hover:bg-gray-200'
                                        onClick={closeModal}
                                    >
                                        Cancelar
                                    </button>
                                    <SaveButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
