import TableStats from "@/components/ui/TableStats"
import { useState } from "react"

  const resguardosGenerales = [
  { id: 1, area: "Dirección de Cultura", resguardatarios: 40, resguardos: 200, porcentaje: "13%" },
  { id: 2, area: "Coordinación de Protección Civil", resguardatarios: 40, resguardos: 200, porcentaje: "11%" },
  { id: 3, area: "Dirección de Educación", resguardatarios: 40, resguardos: 200, porcentaje: "8%" },
  { id: 4, area: "Secretaría del Trabajo", resguardatarios: 40, resguardos: 200, porcentaje: "8%" },
  { id: 5, area: "Dirección de Cultura", resguardatarios: 40, resguardos: 200, porcentaje: "6%" },
  { id: 6, area: "Dirección de Gobernación", resguardatarios: 40, resguardos: 200, porcentaje: "11%" },
  { id: 7, area: "Dirección de Medio Ambiente", resguardatarios: 40, resguardos: 200, porcentaje: "16%" },
]

const resguardosPorArea = [
  {
    id: 1,
    cargo: "Director",
    resguardatario: "Andrés Felipe Gómez Sáez",
    empleado: "159753",
    fechaIngreso: "10/12/24",
    resguardos: 40,
  },
  {
    id: 2,
    cargo: "Subdirector",
    resguardatario: "José María Ramírez Tovar",
    empleado: "159632",
    fechaIngreso: "10/12/24",
    resguardos: 40,
  },
  {
    id: 3,
    cargo: "Jefe de departamento",
    resguardatario: "Daniel Andrés Torres Frías",
    empleado: "157412",
    fechaIngreso: "10/12/24",
    resguardos: 40,
  },
  {
    id: 4,
    cargo: "Administrativo",
    resguardatario: "María Fernanda López Pérez",
    empleado: "154789",
    fechaIngreso: "10/12/24",
    resguardos: 40,
  },
  {
    id: 5,
    cargo: "Capturista",
    resguardatario: "Juan Carlos Martínez Rivera",
    empleado: "152101",
    fechaIngreso: "10/12/24",
    resguardos: 40,
  },
  {
    id: 6,
    cargo: "Director",
    resguardatario: "Ana Sofía Hernández García",
    empleado: "159753",
    fechaIngreso: "10/12/24",
    resguardos: 40,
  },
  {
    id: 7,
    cargo: "Subdirector",
    resguardatario: "Juan Carlos Martínez Rivera",
    empleado: "152101",
    fechaIngreso: "10/12/24",
    resguardos: 40,
  },
]

const resguardosServidorPublico = [
  {
    id: 1,
    inventario: "20162016",
    creg: "SI-SEASPUE-0025",
    bien: "Laptop",
    marca: "Lenovo",
    modelo: "V14-G2-IJL",
    serie: "28056456454465",
    descripcion: "PROCESADOR CORE I5, 16 GB RAM, 1 TB DISCO DURO",
    estado: "Bueno",
  },
  {
    id: 2,
    inventario: "20162016",
    creg: "SI-SEASPUE-0027",
    bien: "Proyector",
    marca: "HP",
    modelo: "PZ7H G5",
    serie: "28056456454465",
    descripcion: "Proyector marca HP 1080p",
    estado: "Regular",
  },
  {
    id: 3,
    inventario: "20162016",
    creg: "SI-SEASPUE-0125",
    bien: "Camioneta",
    marca: "Dodge",
    modelo: "RAM 700",
    serie: "28056456454465",
    descripcion: "Camioneta Dodge modelo RAM 700, año 2020",
    estado: "Bueno",
  },
  {
    id: 4,
    inventario: "20162016",
    creg: "SI-SEASPUE-0829",
    bien: "Escáner",
    marca: "Epson",
    modelo: "E20 3LCD",
    serie: "28056456454465",
    descripcion: "Escáner Epson, modelo E20 3LCD. Dispositivo de alta precisión con resolución de 600 dpi",
    estado: "Malo",
  },
  {
    id: 5,
    inventario: "20162016",
    creg: "SI-SEASPUE-0098",
    bien: "Cámara",
    marca: "Canon",
    modelo: "R50 RF-s",
    serie: "28056456454465",
    descripcion: "Cámara fotográfica Canon, modelo R50 RF-s. Equipada con un sensor de 50 megapíxeles",
    estado: "Bueno",
  },
  {
    id: 6,
    inventario: "20162016",
    creg: "SI-SEASPUE-0200",
    bien: "Monitor",
    marca: "Lenovo",
    modelo: "ThinkVision",
    serie: "28056456454465",
    descripcion: 'Monitor Lenovo, modelo ThinkVision E24. Pantalla de 23.8" con resolución 1080p',
    estado: "Regular",
  },
  {
    id: 7,
    inventario: "20162016",
    creg: "SI-SEASPUE-0147",
    bien: "Impresora",
    marca: "HP",
    modelo: "Smart Tank 210",
    serie: "28056456454465",
    descripcion: "Impresora HP, modelo Smart Tank 210. Láser",
    estado: "Bueno",
  },
  {
    id: 8,
    inventario: "20162016",
    creg: "SI-SEASPUE-1346",
    bien: "Monitor",
    marca: "HP",
    modelo: "P27H G5",
    serie: "28056456454465",
    descripcion: 'Monitor HP, modelo V27FA. Pantalla de 23.8" con resolución 1080p',
    estado: "Bueno",
  },
]

export default function Resguardos() {
     const [activeTab, setActiveTab] = useState("generales")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filterValues, setFilterValues] = useState({})

  // Configuración de pestañas
  const tabs = [
    { id: "generales", label: "Resguardos generales" },
    { id: "area", label: "Resguardos por área" },
    { id: "servidor", label: "Resguardos por servidor público" },
  ]

  // Configuración de opciones para filtros
  const areaOptions = [
    { value: "cultura", label: "Dirección de Cultura" },
    { value: "educacion", label: "Dirección de Educación" },
    { value: "proteccion", label: "Coordinación de Protección Civil" },
  ]

  const trabajadorOptions = [
    { value: "andres", label: "Andrés Felipe Gómez Sáez" },
    { value: "jose", label: "José María Ramírez Tovar" },
    { value: "daniel", label: "Daniel Andrés Torres Frías" },
  ]

  // Configuración de tablas
  const tableConfigs = {
    generales: {
      columns: [
        { key: "id", label: "No.", align: "left" },
        { key: "area", label: "Área", align: "left" },
        { key: "resguardatarios", label: "Número de resguardatarios", align: "center" },
        { key: "resguardos", label: "Número de resguardos", align: "center" },
        { key: "porcentaje", label: "Porcentaje gubernamental", align: "center" },
      ],
      data: resguardosGenerales,
      showFooter: true,
      footerData: {
        id: "Total",
        resguardatarios: "280",
        resguardos: "1,600",
        porcentaje: "100%",
      },
    },
    area: {
      columns: [
        { key: "id", label: "No.", align: "left" },
        { key: "cargo", label: "Cargo", align: "left" },
        { key: "resguardatario", label: "Resguardatario", align: "left" },
        { key: "empleado", label: "Número de empleado", align: "center" },
        { key: "fechaIngreso", label: "Fecha de ingreso", align: "center" },
        { key: "resguardos", label: "Número de resguardos", align: "center" },
      ],
      data: resguardosPorArea,
      filters: [{ key: "area", placeholder: "Área*", options: areaOptions }],
      showFooter: true,
      footerData: {
        id: "Total global",
        resguardos: "320",
      },
    },
    servidor: {
      columns: [
        { key: "id", label: "No.", align: "left" },
        { key: "inventario", label: "Número de inventario", align: "center" },
        { key: "creg", label: "CREG", align: "center" },
        { key: "bien", label: "Nombre del bien", align: "center" },
        { key: "marca", label: "Marca", align: "center" },
        { key: "modelo", label: "Modelo", align: "center" },
        { key: "serie", label: "Número de serie", align: "center" },
        {
          key: "descripcion",
          label: "Descripción",
          align: "center",
          render: (value) => (
            <span className="max-w-xs truncate block" title={value}>
              {value}
            </span>
          ),
        },
        {
          key: "estado",
          label: "Estado de uso",
          align: "center",
          render: (value) => (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                value === "Bueno"
                  ? "bg-green-100 text-green-800"
                  : value === "Regular"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {value}
            </span>
          ),
        },
      ],
      data: resguardosServidorPublico,
      filters: [
        { key: "area", placeholder: "Área*", options: areaOptions },
        { key: "trabajador", placeholder: "Trabajador*", options: trabajadorOptions },
      ],
    },
  }

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    console.log("Buscando con filtros:", filterValues)
    // Aquí implementarías la lógica de búsqueda
  }

  const handleDownload = () => {
    console.log("Descargando datos de:", activeTab)
    // Aquí implementarías la lógica de descarga
  }

  return (
    <div className="p-6">
      <TableStats
        // Configuración de pestañas
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId)
          setCurrentPage(1)
          setFilterValues({})
        }}
        showTabs={true}
        // Configuración de datos
        tableConfigs={tableConfigs}
        currentTableKey={activeTab}
        // Configuración de filtros
        showFilters={true}
        onSearch={handleSearch}
        searchLabel="Buscar"
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
        // Configuración de paginación
        showPagination={true}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[10, 25, 50]}
        // Configuración de descarga
        showDownload={true}
        onDownload={handleDownload}
        downloadLabel="Descargar"
      />
    </div>
  )
}
