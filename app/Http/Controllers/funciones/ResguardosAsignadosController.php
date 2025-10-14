<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Trabajadores;
use App\Models\funciones\BienesInventariable;
use App\Models\funciones\Movimientos;
use App\Models\funciones\ResguardosAsignados;
use App\Models\funciones\ResguardosPendientes;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Null_;

class ResguardosAsignadosController extends Controller
{
    public function index()
    {
        $resguardosAsignados = areas::withResguardoStats()->get();
        return Inertia::render('funciones/resguardosAsignados/index', [
            'resguardosAsignados' => $resguardosAsignados
        ]);
    }

    public function resguardatarios($id)
    {
        $resguardatarios = areas::detalleConResguardatarios($id);
        return Inertia::render('funciones/resguardosAsignados/resguardatarios', [
            'resguardatarios' => $resguardatarios
        ]);
    }

    public function show($id)
    {
        $resguardos = Trabajadores::ResguardosAsignados($id);
        // validacion por si la coleccion viene vacia

        $trabajadorActual = $resguardos[0]->trabajador_id;
        $areaTrabajador = Trabajadores::where('id', '=', $trabajadorActual)->first();
        $area_id = $areaTrabajador->area_id;
        $trabajadores = Trabajadores::with('area')->where('area_id', $area_id)->where('id', '!=', $trabajadorActual)->get();

        $areas = areas::where('id', '!=', $area_id)->get();
        return Inertia::render('funciones/resguardosAsignados/show', [
            'resguardos' => $resguardos,
            'trabajadores' => $trabajadores,
            'areas' => $areas
        ]);
    }

    public function movimientos(Request $request)
    {

        if ($request->movimiento == 1) {
            // BienesInventariable::whereIn('id', $request->resguardos)->update([
            ResguardosPendientes::whereIn('id', $request->resguardos)->update([
                'movimiento' => 'desasignado',
                'descripcion' => $request->descripcion,
                'estatus' => 'inactivo',
            ]);
            foreach ($request->resguardos as $resguardo) {
                $bienInventariable = ResguardosPendientes::find($resguardo);
                $bien_id = $bienInventariable->bienes_inventariable_id;

                BienesInventariable::where('id', $bien_id)->update([
                    'tipo' => 'almacen',
                    'area_id' => Null,
                ]);
            }
        } elseif ($request->movimiento == 2) {
            ResguardosPendientes::whereIn('id', $request->resguardos)->update([
                'descripcion' => $request->descripcion,
                'estatus' => 'inactivo',
            ]);
            // se clonara el resguardo anterior por cada bien y aparte se pondra en estatus en transferencia
            foreach ($request->resguardos as $resguardo_id) {
                $resguardoOriginal = ResguardosPendientes::find($resguardo_id);

                if ($resguardoOriginal) {
                    // Clonar
                    $nuevoResguardo = $resguardoOriginal->replicate();
                    $nuevoResguardo->trabajador_id = $request->trabajador_id;
                    $nuevoResguardo->movimiento = 'reasignacion';
                    $nuevoResguardo->estatus = 'activo';

                    // Limpiar campos que no deben copiarse
                    $nuevoResguardo->formato_resguardo = null;
                    $nuevoResguardo->resguardo_firma = null;
                    $nuevoResguardo->descripcion = null;

                    // Guardar el nuevo registro primero (para generar su CREG y ID)
                    $nuevoResguardo->save();

                    // 3️⃣ Generar PDF del nuevo resguardo
                    $pdf = Pdf::loadView('pdf.documento-resguardo', [
                        'resguardo' => $nuevoResguardo->load(
                            'trabajador',
                            'bienesInventariable.area',
                            'bienesInventariable.clasificacion',
                            'bienesInventariable.proveedor'
                        )
                    ]);

                    $pdfPath = 'resguardos_pendientes/' . 'New_Creg-' . $nuevoResguardo->creg . '.pdf';
                    Storage::disk('public')->put($pdfPath, $pdf->output());

                    // 4️⃣ Guardar la URL pública del PDF en el registro clonado
                    $publicUrl = asset('storage/' . $pdfPath);
                    $nuevoResguardo->formato_resguardo = $publicUrl;
                    $nuevoResguardo->save();
                }
            }
        } elseif ($request->movimiento == 3) {
            ResguardosPendientes::whereIn('id', $request->resguardos)->update([
                'descripcion' => $request->descripcion,
                'estatus' => 'inactivo',
            ]);

             foreach ($request->resguardos as $resguardo) {
                $bienInventariable = ResguardosPendientes::find($resguardo);
                $bien_id = $bienInventariable->bienes_inventariable_id;

                BienesInventariable::where('id', $bien_id)->update([
                    'tipo' => 'asignado',
                    'area_id' => $request->area_id,
                ]);
            }
        }

        return redirect()->route('resguardosAsignados.index');
    }
}
