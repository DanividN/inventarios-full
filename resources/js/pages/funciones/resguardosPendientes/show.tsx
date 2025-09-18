import CardComponent from "@/components/ui/CardComponent";
import TableComponent from "@/components/ui/TableComponent";
import { usePage } from "@inertiajs/react";



export default function ResguardosPendientesShow() {
    const { resguardo } = usePage<{
        resguardo: any
    }>().props;

    console.log(resguardo);
    return (
        <>
            <CardComponent title={`${resguardo.bienes_inventariable.numero_inventario} - ${resguardo.bienes_inventariable?.nombre}`}>
                <div className="grid grid-cols-4 grid-rows-3 gap-6">
                    <div>
                        <span>Clasificación del bien:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.clasificacion.clave} - {resguardo.bienes_inventariable.clasificacion.clasificacion}</strong></span>
                    </div>
                    <div>
                        <span>Nombre:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.nombre}</strong></span>
                    </div>
                    <div>
                        <span>Número de póliza:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.numero_poliza ?? 'No aplica'}</strong></span>
                    </div>

                    <div>
                        <span>Costo unitario:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.costo_unitario ?? 'No aplica'}</strong></span>
                    </div>

                    <div>
                        <span>Grupo del activo:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.grupo_activo}</strong></span>
                    </div>

                    <div>
                        <span>Modelo:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.modelo}</strong></span>
                    </div>
                    <div>
                        <span>Número económico:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.numero_economico ?? 'No aplica'}</strong></span>
                    </div>
                    <div>
                        <span>Tipo de póliza:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.tipo_poliza ?? 'No aplica'}</strong></span>
                    </div>
                    <div>
                        <span>Área que solicita:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.area.name}</strong></span>
                    </div>
                    <div>
                        <span>Serie:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.serie}</strong></span>
                    </div>
                    <div>
                        <span>Estado de uso:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.estado}</strong></span>
                    </div>
                    <div>
                        <span>Proveedor:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.proveedor.nombre }  {resguardo.bienes_inventariable.proveedor.apellido_paterno} {resguardo.bienes_inventariable.proveedor.apellido_materno}</strong></span>
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-rows-1 gap-6">
                    <div>
                        <span>Descripción:</span><br />
                        <span><strong>{resguardo.bienes_inventariable.descripcion}</strong></span>
                    </div>
                </div>
            </CardComponent>

            <div className="bg-white w-auto p-4 rounded-2xl shadow mt-4 mb-4">
                {JSON.parse(resguardo.bienes_inventariable.imagenes).map((path, index) => (
                    <img
                        src={`/funciones/inventarios/inventariables/${path.split('/').pop()}`}
                        alt={`${resguardo.bienes_inventariable.nombre}`}
                        className="w-25 h-auto"
                    />
                ))}
            </div>


            <CardComponent title="Movimientos">
                {/* <TableComponent
                    // data={resguardo.movimientos}

                /> */}
            </CardComponent>
        </>
    );

}
