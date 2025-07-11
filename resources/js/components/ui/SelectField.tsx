import React from "react"
import Select, { StylesConfig, SingleValue } from "react-select"
import { Controller, Control, FieldErrors, RegisterOptions } from "react-hook-form"
import { AreaFormValues } from "@/types/AreaFormValues"

type OptionType = {
    value: string
    label: string
}

type SelectFieldProps = {
    id: keyof AreaFormValues
    label: string
    options: OptionType[]
    additionalClasses?: string
    control: Control<AreaFormValues>
    defaultValues: AreaFormValues
    rules?: RegisterOptions
    errors: FieldErrors<AreaFormValues>
    disabled?: boolean
    onChange?: (selectedOption: SingleValue<OptionType>) => void // ← importante
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    options,
    additionalClasses = "",
    control,
    defaultValues,
    rules,
    errors,
    disabled,
    onChange,
}) => {
    const colourStyles: StylesConfig<OptionType, false> = {
        control: (styles, { isDisabled, isFocused }) => ({
            ...styles,
            backgroundColor: "transparent",
            borderTop: "transparent",
            borderLeft: "transparent",
            borderRight: "transparent",
            borderBottom: isFocused ? "2px solid #115641" : "2px solid #e5e7eb",
            padding: "0.3rem",
            borderRadius: "0",
            boxShadow: "none",
            pointerEvents: isDisabled ? "none" : "auto",
        }),
        placeholder: (styles) => ({
            ...styles,
            color: "transparent",
        }),
        singleValue: (styles) => ({
            ...styles,
        }),
        clearIndicator: (styles) => ({
            ...styles,
            cursor: "pointer",
            color: "#9ca3af",
            "&:hover": {
                color: "#6b7280",
            },
        }),
    }

    return (
        <div className={`relative ${additionalClasses}`}>
            <Controller
                name={id}
                control={control}
                defaultValue={defaultValues[id]}
                rules={rules}
                render={({ field }) => (
                    <Select
                        id={id}
                        options={options}
                        onChange={(selectedOption: SingleValue<OptionType>) => {
                            field.onChange(selectedOption ? selectedOption.value : "")
                            if (onChange) onChange(selectedOption) // ← ejecuta tu lógica personalizada
                        }}
                        value={options.find((option) => option.value === field.value)}
                        className="peer block w-full bg-transparent sm:text-sm focus:ring-0 disabled:opacity-50 mt-1.5"
                        classNamePrefix="react-select"
                        styles={colourStyles}
                        isDisabled={disabled}
                        placeholder="Selecciona una opción"
                        isClearable
                    />
                )}
            />
            <label
                htmlFor={id}
                className="absolute top-0 start-0 py-1 px-0 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0]
                peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
                {label}
            </label>
            {errors[id] && (
                <p className="text-red-500 text-xs mt-1">{errors[id]?.message as string}</p>
            )}
        </div>
    )
}

export default SelectField
