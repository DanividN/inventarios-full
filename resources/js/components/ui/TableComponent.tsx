import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnDef,
    FilterFn,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Select from "react-select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TableComponentProps<T extends object> {
    titleTable?: string;
    columns: ColumnDef<T, any>[];
    data: T[];
    showButtonCreate?: boolean;
    iconButtonCreate?: React.ReactNode;
    titleButtonCreate?: string;
    toButtonCreate?: string;
    showButtonSecondary?: boolean;
    openModal?: () => void;
    primaryButtonText?: boolean;
    titleButtonSecondary?: React.ReactNode;
    showButtonEtiquetas?: boolean;
    titleButtonEtiquetas?: string;
    onClickButtonEtiquetas?: () => void;
    showButtonHistorial?: boolean;
    titleButtonHistorial?: string;
    toButtonHistorial?: string;
}

const monthYearFilter: FilterFn<any> = (row, columnId, filterValue) => {
    if (!filterValue) return true;
    const rowValue = parse(row.getValue(columnId), "dd-MM-yyyy", new Date());
    const [month, year] = filterValue.split("-");
    return (
        String(rowValue.getMonth() + 1).padStart(2, "0") === month &&
        String(rowValue.getFullYear()) === year
    );
};

const selectFilter: FilterFn<any> = (row, columnId, filterValue) =>
    filterValue ? row.getValue(columnId) === filterValue : true;

const fuzzyFilter: FilterFn<any> = (row, columnId, filterValue) =>
    rankItem(row.getValue(columnId), filterValue).passed;

function TableComponent<T extends object>({
    columns,
    data,
    titleTable,
    showButtonCreate,
    iconButtonCreate,
    titleButtonCreate,
    toButtonCreate,
    showButtonSecondary,
    openModal,
    primaryButtonText,
    titleButtonSecondary,
    showButtonEtiquetas,
    titleButtonEtiquetas,
    onClickButtonEtiquetas,
    showButtonHistorial,
    titleButtonHistorial,
    toButtonHistorial,
}: TableComponentProps<T>) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState<any[]>([]);

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
            monthYear: monthYearFilter,
            select: selectFilter,
        },
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
            <div className="block md:flex mt-2 justify-end gap-2 bg-white p-4 rounded-t-md border border-gray-300 border-b-0">
                {/* Acciones */}
                <div className="block md:flex gap-3">
                    {showButtonHistorial && toButtonHistorial && (
                        <Link
                            href={toButtonHistorial}
                            className="border rounded-md p-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                        >
                            <span className="flex-1 text-center md:text-start">
                                {titleButtonHistorial}
                            </span>
                        </Link>
                    )}
                </div>
                <div className="block md:flex gap-3 ">
                    {showButtonEtiquetas && (
                        <button
                            onClick={onClickButtonEtiquetas}
                            className="border rounded-md p-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                        >
                            {titleButtonEtiquetas}
                        </button>
                    )}
                </div>
                <div className="block md:flex gap-3 ">
                    {showButtonSecondary && (
                        <button
                            onClick={openModal}
                            className={`border rounded px-3 py-2 text-sm ${primaryButtonText
                                ? "bg-green-dark whitespace-nowrap w-full md:w-auto rounded-md text-white font-bold mt-4 md:mt-0 text-center flex items-center justify-between gap-3 pr-6"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {titleButtonSecondary}
                        </button>
                    )}
                </div>
                <div className="block md:flex gap-3">
                    {showButtonCreate && toButtonCreate && (
                        <Link
                            href={toButtonCreate}
                            className="bg-green-dark whitespace-nowrap w-full md:w-auto rounded-md text-white font-bold mt-4 md:mt-0 text-center flex items-center justify-between gap-3 pr-6"
                        >
                            <span className="h-11 w-11 font-bold flex items-center justify-end md:justify-center pl-6">
                                {iconButtonCreate}
                            </span>
                            <span className="flex-1 text-center md:text-start">
                                {titleButtonCreate}
                            </span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table
                    className="w-full fill mx-auto text-center"
                    style={{ tableLayout: "fixed" }}
                >
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} colSpan={1}
                                        className="text-black p-1 align-middle"
                                        style={{ width: "150px" }}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                <div
                                                    onClick={
                                                        header.column.getCanSort()
                                                            ? header.column.getToggleSortingHandler()
                                                            : undefined
                                                    }
                                                    className={`${header.column.getCanSort() ? "cursor-pointer select-none" : ""
                                                        }`}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.label ?? header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getIsSorted() === "asc"
                                                        ? " 🔼"
                                                        : header.column.getIsSorted() === "desc"
                                                            ? " 🔽"
                                                            : null}
                                                </div>

                                                {/* Filtros */}
                                                {header.column.getCanFilter() &&
                                                    !header.column.columnDef.disableFilter && (
                                                        <div className="mt-2 pl-5 pr-5">
                                                            {header.column.columnDef.filterType === "select" ? (
                                                                <Select
                                                                    options={Array.from(
                                                                        new Map(
                                                                            data.map((row) => {
                                                                                const value = row[header.column.id as keyof T];
                                                                                return [value, { value, label: value }];
                                                                            })
                                                                        ).values()
                                                                    )}
                                                                    isClearable
                                                                    placeholder="Filtrar..."
                                                                    value={
                                                                        header.column.getFilterValue()
                                                                            ? {
                                                                                value: header.column.getFilterValue(),
                                                                                label: header.column.getFilterValue(),
                                                                            }
                                                                            : null
                                                                    }
                                                                    onChange={(selected) =>
                                                                        header.column.setFilterValue(selected ? selected.value : "")
                                                                    }
                                                                    className="w-full text-start"
                                                                    menuPortalTarget={document.body}
                                                                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                                                />
                                                            ) : (
                                                                <DebouncedInput
                                                                    value={header.column.getFilterValue() ?? ""}
                                                                    onChange={(value) => header.column.setFilterValue(value)}
                                                                    className="p-[6px] border rounded w-full bg-white border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-light-600 focus:border-transparent"
                                                                    placeholder="Buscar..."
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
                    <tbody className="border first:border-t-2 first:border-t-gray-300">
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
                                        <td key={cell.id} className="p-2 text-gray-500 align-middle whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div  className="flex justify-between items-center gap-2 bg-white p-2 rounded-b-md border border-gray-300 border-t-0">
                <div className="flex gap-3">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    <select
                        className="border rounded p-1"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 30, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                     <span className="flex items-center gap-1">
                        <strong>
                            {table.getState().pagination.pageIndex + 1} -{" "}
                            {table.getPageCount()}
                        </strong>
                     </span>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border rounded p-1"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="border rounded p-1"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>

    );
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 300,
    ...props
}: {
    value: string;
    onChange: (value: string) => void;
    debounce?: number;
} & React.InputHTMLAttributes<HTMLInputElement>) {
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

    return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default TableComponent;
