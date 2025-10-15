import { ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { SearchButton } from "./SearchButton"
import { SelectStats } from "./SelectStats"


export default function TableStats({
  // Configuración de pestañas
  tabs = [],
  activeTab,
  onTabChange,
  showTabs = true,

  // Configuración de datos
  tableConfigs = {},
  currentTableKey,

  // Configuración de filtros
  showFilters = true,
  onSearch,
  searchLabel = "Buscar",

  // Configuración de paginación
  showPagination = true,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50],

  // Configuración de descarga
  showDownload = true,
  onDownload,
  downloadLabel = "Descargar",

  // Estados de filtros
  filterValues = {},
  onFilterChange,

  // Configuración adicional
  emptyMessage = "No hay datos disponibles",
  className = "",
}) {
  const currentConfig = tableConfigs[currentTableKey]

  if (!currentConfig) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-red-500">Configuración de tabla no encontrada: {currentTableKey}</p>
      </div>
    )
  }

  // Preparar filtros con valores actuales
  const filtersWithValues = (currentConfig.filters || []).map((filter) => ({
    ...filter,
    value: filterValues[filter.key] || "",
    onChange: (value) => onFilterChange?.(filter.key, value),
  }))

  // Calcular paginación
  const totalItems = currentConfig.data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const itemsPerPageSelectOptions = itemsPerPageOptions.map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }))

  const getAlignmentClass = (align = "left") => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  // Renderizar pestañas
  const renderTabs = () => {
    if (!showTabs || tabs.length === 0) return null

    return (
      <div className="flex space-x-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onTabChange?.(tab.id)}
            disabled={tab.disabled}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id || currentTableKey === tab.id
                ? "text-green-700 border-green-500 bg-green-50"
                : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
            } ${tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  // Renderizar filtros
  const renderFilters = () => {
    if (!showFilters || filtersWithValues.length === 0) return null

    return (
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex gap-4 items-end">
          {filtersWithValues.map((filter) => (
            <div key={filter.key} className="flex-1">
              <SelectStats
                value={filter.value}
                onChange={filter.onChange}
                placeholder={filter.placeholder}
                options={filter.options}
              />
            </div>
          ))}
          {onSearch && (
            <SearchButton variant="outline" onClick={onSearch} className="px-6 bg-transparent">
              <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
              {searchLabel}
            </SearchButton>
          )}
        </div>
      </div>
    )
  }

  // Renderizar tabla
  const renderTable = () => {
    if (currentConfig.data.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )
    }

    return (
      <div className="bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {currentConfig.columns.map((column) => (
                  <th
                    key={column.key}
                    className={`py-4 px-6 text-sm font-medium text-gray-600 ${getAlignmentClass(column.align)}`}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentConfig.data.map((row, index) => (
                <tr key={row.id || index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  {currentConfig.columns.map((column) => (
                    <td
                      key={column.key}
                      className={`py-4 px-6 text-sm text-gray-900 ${getAlignmentClass(column.align)}`}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {currentConfig.showFooter && currentConfig.footerData && (
              <tfoot>
                <tr className="bg-green-800 text-white">
                  {currentConfig.columns.map((column, index) => (
                    <td
                      key={column.key}
                      className={`py-4 px-6 text-lg font-semibold ${getAlignmentClass(column.align)}`}
                    >
                      {currentConfig.footerData[column.key] || (index === 0 ? "Total" : "")}
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    )
  }

  // Renderizar paginación
  const renderPagination = () => {
    if (!showPagination) return null

    return (
      <div className="bg-white p-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filas por página</span>
              <SelectStats
                value={itemsPerPage.toString()}
                onChange={(value) => onItemsPerPageChange?.(Number(value))}
                options={itemsPerPageSelectOptions}
                className="w-20"
              />
            </div>
            <span className="text-sm text-gray-600">
              {startItem}-{endItem} de {totalItems}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <SearchButton
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" />
              Anterior
            </SearchButton>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <SearchButton
                    key={pageNum}
                    variant={currentPage === pageNum ? "primary" : "outline"}
                    size="sm"
                    onClick={() => onPageChange?.(pageNum)}
                  >
                    {pageNum}
                  </SearchButton>
                )
              })}
            </div>

            <SearchButton
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </SearchButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header con pestañas y botón de descarga */}
      {(showTabs || showDownload) && (
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            {renderTabs()}
            {!showTabs && <div />}
            {showDownload && (
              <SearchButton onClick={onDownload} className="bg-green-600 hover:bg-green-700 text-white">
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                {downloadLabel}
              </SearchButton>
            )}
          </div>
        </div>
      )}

      {/* Filtros */}
      {renderFilters()}

      {/* Tabla */}
      <div className={!showTabs && !showDownload ? "rounded-t-lg" : ""}>{renderTable()}</div>

      {/* Paginación */}
      {renderPagination()}
    </>
  )
}
