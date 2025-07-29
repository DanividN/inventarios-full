import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import Select from 'react-select';
import { parse } from 'date-fns';
import { useEffect, useState } from "react";

const monthYearFilter = (row, columnId, filterValue) => {
    if (!filterValue) return true; // Si no hay filtro, muestra todas las filas
    const rowValue = parse(row.getValue(columnId), 'dd-MM-yyyy', new Date());
    const [filterMonth, filterYear] = filterValue.split('-');
    const rowMonth = String(rowValue.getMonth() + 1).padStart(2, '0'); // Mes en formato MM
    const rowYear = String(rowValue.getFullYear()); // Año en formato YYYY

    return rowMonth === filterMonth && rowYear === filterYear;
};

const selectFilter = (row, columnId, filterValue) => {
    return filterValue ? row.getValue(columnId) === filterValue : true;
};

const fuzzyFilter = (row, columnId, filterValue) => {
    return rankItem(row.getValue(columnId), filterValue).passed;
};

const TableHistorial = ({  titleTable,columns,  datos,  showButtonCreate = false, iconButtonCreate, titleButtonCreate, toButtonCreate, showButtonSecondary = false, titleButtonSecondary, toButtonSecondary }) => {
  const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        datos,
        columns,
        filterFns: { fuzzy: fuzzyFilter, monthYear: monthYearFilter, select: selectFilter },
        state: { columnFilters, globalFilter },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "fuzzy",
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="mt-5">
            <div className="block md:flex mt-2 justify-start gap-2 bg-white p-4 rounded-t-md border border-gray-300 border-b-0 shadow-md">
                <div className='block md:flex gap-3 '>
                    {titleTable && (
                        <h2 className='text-lg font-bold'>{titleTable}</h2>
                    )}
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className="table-auto fill mx-auto text-center" style={{ tableLayout: "fixed" }}>
                    <thead className='bg-gray-100'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        colSpan={1}
                                        className="text-black p-1 align-middle"
                                        style={{ width: "150px" }}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                <div
                                                    className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(header.column.columnDef.label, header.getContext())}
                                                    {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : null}
                                                </div>
                                                {/* Renderizar filtros según el tipo */}
                                                {header.column.getCanFilter() && !header.column.columnDef.disableFilter && (
                                                    <div className="mt-2 pl-5 pr-5">
                                                        {header.column.columnDef.filterType === "monthYear" ? (
                                                            <Select
                                                                options={Array.from(
                                                                    new Map(
                                                                        datos.map((row) => {
                                                                            const date = parse(row[header.column.id], 'dd-MM-yyyy', new Date());
                                                                            const month = String(date.getMonth() + 1).padStart(2, '0'); // MM
                                                                            const year = date.getFullYear(); // YYYY
                                                                            const value = `${month}-${year}`; // Formato MM-YYYY
                                                                            return [value, { value, label: value }]; // Usar el valor como clave en el Map
                                                                        })
                                                                    ).values() // Extraer solo los valores únicos del Map
                                                                ).sort((a, b) => {
                                                                    const [monthA, yearA] = a.value.split('-').map(Number);
                                                                    const [monthB, yearB] = b.value.split('-').map(Number);
                                                                    return yearA === yearB ? monthA - monthB : yearA - yearB; // Ordenar por año y luego por mes
                                                                })}
                                                                isClearable
                                                                placeholder="Buscar..."
                                                                value={header.column.getFilterValue() ? { value: header.column.getFilterValue(), label: header.column.getFilterValue() } : null}
                                                                onChange={(selectedOption) => header.column.setFilterValue(selectedOption ? selectedOption.value : "")}
                                                                className="w-full text-start"
                                                                menuPortalTarget={document.body} // Renderiza el menú en el body
                                                                styles={{
                                                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Asegura que el menú esté por encima de otros elementos
                                                                }}
                                                            />
                                                        ) : header.column.columnDef.filterType === "select" ? (
                                                            <Select
                                                                options={Array.from(
                                                                    new Map(
                                                                        datos.map((row) => {
                                                                            const value = row[header.column.id];
                                                                            return [value, { value, label: value }]; // Usar el valor como clave en el Map
                                                                        })
                                                                    ).values() // Extraer solo los valores únicos del Map
                                                                )}
                                                                isClearable
                                                                placeholder="Buscar..."
                                                                value={header.column.getFilterValue() ? { value: header.column.getFilterValue(), label: header.column.getFilterValue() } : null}
                                                                onChange={(selectedOption) => header.column.setFilterValue(selectedOption ? selectedOption.value : "")}
                                                                className="w-full text-start"
                                                                menuPortalTarget={document.body} // Renderiza el menú en el body
                                                                styles={{
                                                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Asegura que el menú esté por encima de otros elementos
                                                                }}
                                                            />
                                                        ) : (
                                                            <DebouncedInput
                                                                value={header.column.getFilterValue() ?? ""}
                                                                onChange={(value) => header.column.setFilterValue(value)}
                                                                className="p-[6px] border rounded w-full bg-white border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-light-600 focus:border-transparent"
                                                                placeholder={`Buscar...`}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className='border first:border-t-2 first:border-t-gray-300'>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="p-4 text-gray-500 text-center bg-gray-100">
                                    No hay datos para mostrar
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                               <tr key={row.id} className="h-14 w-full align-middle  first:border-t-white odd:bg-white even:bg-[#edfbf6]">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} colSpan={1} className="p-2 text-gray-500 align-middle">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center gap-2 bg-white p-2 rounded-b-md border border-gray-300 border-t-0">
                <div className='flex gap-3'>
                    Filtrar por página:
                    <select
                        className='border rounded p-1'
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    <span className="flex items-center gap-1">
                        <strong>{table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</strong>
                    </span>
                </div>
                <div className='flex items-center'>
                    <button
                        className="border rounded-l-xl p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"Anterior"}
                    </button>
                    <div className="border-l h-full"></div>
                    <button
                        className="border rounded-r-xl p-1 border-l-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {"Siguiente"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);
        return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);

    return (
        <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
export default TableHistorial
