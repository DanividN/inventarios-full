
import { useEffect, useRef } from "react"
import Highcharts from "highcharts"
import { MenuIcon } from "lucide-react"
import AppLayout from "@/layouts/app-layout"

// Tipos para los datos de gráficas
interface ChartData {
    name: string
    y: number
    color?: string
}

// Datos para las gráficas
const resguardosData: ChartData[] = [
    { name: "DIRECCIÓN DE CULTURA", y: 18 },
    { name: "COORDINACIÓN DE PROTECCIÓN CIVIL", y: 16 },
    { name: "DIRECCIÓN DE EDUCACIÓN", y: 14 },
    { name: "SECRETARÍA DEL TRABAJO", y: 13 },
    { name: "DIRECCIÓN DE GOBERNACIÓN", y: 12 },
    { name: "DIRECCIÓN DE MEDIO AMBIENTE", y: 11 },
    { name: "DIRECCIÓN DE OBRAS PÚBLICAS", y: 8 },
    { name: "DIRECCIÓN DE DESARROLLO SOCIAL", y: 7 },
    { name: "DIRECCIÓN DE SERVICIOS PÚBLICOS", y: 6 },
    { name: "DIRECCIÓN DE DESARROLLO URBANO", y: 7 },
]

const inventarioPendienteData: ChartData[] = [
    { name: "PRESIDENCIA", y: 1 },
    { name: "DIRECCIÓN DE ADMINISTRACIÓN", y: 8 },
    { name: "DIRECCIÓN DE SERVICIOS PÚBLICOS", y: 22 },
    { name: "DIRECCIÓN DE OBRAS PÚBLICAS", y: 12 },
    { name: "DIRECCIÓN DE MEDIO AMBIENTE", y: 15 },
    { name: "DIRECCIÓN DE EDUCACIÓN", y: 8 },
    { name: "DIRECCIÓN DE CULTURA", y: 3 },
    { name: "DIRECCIÓN DE DESARROLLO ECONÓMICO", y: 35 },
    { name: "DIRECCIÓN DE DESARROLLO URBANO", y: 28 },
]

const activosFijosData: ChartData[] = [
    { name: "DIRECCIÓN DE CULTURA", y: 10 },
    { name: "COORDINACIÓN DE PROTECCIÓN CIVIL", y: 14 },
    { name: "DIRECCIÓN DE EDUCACIÓN", y: 18 },
    { name: "SECRETARÍA DEL TRABAJO", y: 6 },
    { name: "DIRECCIÓN DE GOBERNACIÓN", y: 10 },
    { name: "DIRECCIÓN DE MEDIO AMBIENTE", y: 9 },
    { name: "DIRECCIÓN DE OBRAS PÚBLICAS", y: 11 },
    { name: "DIRECCIÓN DE DESARROLLO SOCIAL", y: 8 },
    { name: "DIRECCIÓN DE SERVICIOS PÚBLICOS", y: 9 },
    { name: "DIRECCIÓN DE DESARROLLO URBANO", y: 6 },
]

const topInventarioData: ChartData[] = [
    { name: "COMPUTADORAS PORTÁTILES", y: 45, color: "#dc2626" },
    { name: "SILLAS EJECUTIVAS CON BRAZOS", y: 18, color: "#16a34a" },
    { name: "EQUIPO DE CÓMPUTO DE ESCRITORIO", y: 15, color: "#2563eb" },
    { name: "IMPRESORAS MULTIFUNCIONALES", y: 12, color: "#ca8a04" },
    { name: "ARCHIVEROS DE MADERA DE 4 GAVETAS", y: 10, color: "#7c3aed" },
    { name: "PROYECTOR DE IMÁGENES", y: 8, color: "#dc2626" },
    { name: "MONITOR DE 17 PULGADAS COLOR", y: 6, color: "#16a34a" },
    { name: "PANTALLA DE 55 PULGADAS", y: 5, color: "#2563eb" },
    { name: "LAPTOP DE 15 PULGADAS PARA LA SERIE Y 16 PULGADAS", y: 4, color: "#ca8a04" },
]

const incidenciasData: ChartData[] = [
    { name: "PRESIDENCIA", y: 4, color: "#dc2626" },
    { name: "DIRECCIÓN DE EDUCACIÓN", y: 3, color: "#ca8a04" },
    { name: "DIRECCIÓN DE ADMINISTRACIÓN", y: 5, color: "#2563eb" },
    { name: "DIRECCIÓN DE SERVICIOS PÚBLICOS", y: 1, color: "#16a34a" },
    { name: "DIRECCIÓN DE OBRAS PÚBLICAS", y: 10, color: "#7c3aed" },
    { name: "DIRECCIÓN DE MEDIO AMBIENTE", y: 4, color: "#dc2626" },
    { name: "DIRECCIÓN DE CULTURA", y: 0, color: "#ca8a04" },
    { name: "DIRECCIÓN DE DESARROLLO ECONÓMICO", y: 0, color: "#2563eb" },
    { name: "DIRECCIÓN DE DESARROLLO URBANO", y: 5, color: "#16a34a" },
]

const verificacionesData: ChartData[] = [
    { name: "DIRECCIÓN DE CULTURA", y: 86 },
    { name: "COORDINACIÓN DE PROTECCIÓN CIVIL", y: 96 },
    { name: "DIRECCIÓN DE EDUCACIÓN", y: 153 },
    { name: "SECRETARÍA DEL TRABAJO", y: 114 },
    { name: "DIRECCIÓN DE GOBERNACIÓN", y: 61 },
    { name: "DIRECCIÓN DE MEDIO AMBIENTE", y: 51 },
    { name: "DIRECCIÓN DE OBRAS PÚBLICAS", y: 73 },
    { name: "DIRECCIÓN DE DESARROLLO SOCIAL", y: 44 },
    { name: "DIRECCIÓN DE SERVICIOS PÚBLICOS", y: 94 },
    { name: "DIRECCIÓN DE DESARROLLO URBANO", y: 89 },
]

function VerticalBarChart({ data }: { data: ChartData[] }) {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chartRef.current) {
            Highcharts.chart(chartRef.current, {
                chart: { type: "column", height: 300, backgroundColor: "transparent" },
                title: { text: null },
                xAxis: {
                    categories: data.map((d) => d.name),
                    labels: { rotation: -45, style: { fontSize: "10px" } },
                },
                yAxis: {
                    title: { text: null },
                    labels: { formatter() { return this.value + "%" } },
                },
                legend: { enabled: false },
                plotOptions: {
                    column: {
                        colorByPoint: true,
                        dataLabels: { enabled: true, formatter() { return this.y + "%" } },
                    },
                },
                series: [{ name: "Porcentaje", data }],
                credits: { enabled: false },
            })
        }
    }, [data])

    return <div ref={chartRef} className="w-full h-full"></div>
}

function HorizontalBarChart({ data }: { data: ChartData[] }) {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chartRef.current) {
            Highcharts.chart(chartRef.current, {
                chart: { type: "bar", height: 300, backgroundColor: "transparent" },
                title: { text: null },
                xAxis: {
                    categories: data.map((d) => d.name),
                    labels: { style: { fontSize: "10px" } },
                },
                yAxis: { title: { text: null } },
                legend: { enabled: false },
                plotOptions: {
                    bar: {
                        colorByPoint: true,
                        dataLabels: { enabled: true },
                    },
                },
                series: [{ name: "Cantidad", data }],
                credits: { enabled: false },
            })
        }
    }, [data])

    return <div ref={chartRef} className="w-full h-full"></div>
}

function DonutChart({ data, total }: { data: ChartData[]; total: number }) {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chartRef.current) {
            Highcharts.chart(chartRef.current, {
                chart: { type: "pie", height: 300, backgroundColor: "transparent" },
                title: {
                    text: `Total ${total}`,
                    align: "center",
                    verticalAlign: "middle",
                    style: { fontSize: "24px", fontWeight: "bold" },
                },
                plotOptions: {
                    pie: { innerSize: "60%", dataLabels: { enabled: false }, showInLegend: false },
                },
                series: [{ name: "Cantidad", data }],
                credits: { enabled: false },
            })
        }
    }, [data, total])

    return <div ref={chartRef} className="w-full h-full"></div>
}

export default function Dashboard() {
    return (

            <div className="w-full mx-auto min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card title="INFORME DE RESGUARDOS POR ÁREA" subtitle="INVENTARIO ASIGNADO PENDIENTE DE RESGUARDO DETALLADO">
                        <VerticalBarChart data={resguardosData} />
                    </Card>

                    <Card title="INVENTARIO ASIGNADO PENDIENTE DE RESGUARDO" subtitle="INVENTARIO ASIGNADO PENDIENTE DE RESGUARDO DETALLADO">
                        <HorizontalBarChart data={inventarioPendienteData} />
                    </Card>

                    <Card title="INFORME DE ACTIVOS FIJOS GENERALES" subtitle="COSTO DE ACTIVOS FIJOS CON DEPRECIACIÓN DETALLADO POR ÁREA">
                        <VerticalBarChart data={activosFijosData} />
                    </Card>

                    <Card title="TOP 10 DE BIENES DE INVENTARIABLES DISPONIBLES EN INVENTARIO">
                        <DonutChart data={topInventarioData} total={133} />

                    </Card>

                    <Card title="INFORME DE INCIDENCIAS ATENDIDAS ÚLTIMO PERÍODO" subtitle="BIENES CON INCIDENCIAS 15 - INCIDENCIAS ATENDIDAS 32 - % INCIDENCIAS ATENDIDAS 56%">
                        <DonutChart data={incidenciasData} total={32} />

                    </Card>

                    <Card title="INFORME DE VERIFICACIONES ÚLTIMO PERÍODO" subtitle="NÚMERO DE RESGUARDOS 2,175 - RESGUARDOS VERIFICADOS 1,490">
                        <VerticalBarChart data={verificacionesData} />
                    </Card>
                </div>
            </div>

    )
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                </div>
                <MenuIcon className="h-5 w-5 text-gray-400" />
            </div>
            {children}
        </div>
    )
}


