import React from "react";
import Select, { StylesConfig, SingleValue } from "react-select";
import {
  Controller,
  Control,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";

type OptionType = {
  value: string | number;
  label: string;
};

type SelectFieldProps<T> = {
  id: keyof T;
  label: string;
  options: OptionType[];
  additionalClasses?: string;
  control: Control<T>;
  rules?: RegisterOptions;
  errors: FieldErrors<T>;
  disabled?: boolean;
  onChange?: (selectedOption: SingleValue<OptionType>) => void;
};

const SelectField = <T,>({
  id,
  label,
  options,
  additionalClasses = "",
  control,
  rules,
  errors,
  disabled,
  onChange,
}: SelectFieldProps<T>) => {
  const colourStyles: StylesConfig<OptionType, false> = {
    control: (styles, { isDisabled, isFocused }) => ({
      ...styles,
      backgroundColor: "transparent",
      borderTop: "transparent",
      borderLeft: "transparent",
      borderRight: "transparent",
      borderBottom: isFocused ? "2px solid #115641" : "2px solid #e5ebe6ff",
      padding: "0.3rem",
      borderRadius: "0",
      boxShadow: "none",
      pointerEvents: isDisabled ? "none" : "auto",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "transparent",
    }),
    clearIndicator: (styles) => ({
      ...styles,
      cursor: "pointer",
      color: "#9ca3af",
      "&:hover": {
        color: "#6b7280",
      },
    }),
  };

  return (
    <div className={`relative ${additionalClasses}`}>
      <Controller
        name={id as string}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            id={id as string}
            options={options}
            value={options.find((option) => option.value === field.value) || null}
            onChange={(selectedOption) => {
              field.onChange(selectedOption?.value ?? "");
              if (onChange) onChange(selectedOption);
            }}
            onBlur={field.onBlur}
            styles={colourStyles}
            className="peer block w-full bg-transparent sm:text-sm focus:ring-0 disabled:opacity-50 mt-1.5"
            classNamePrefix="react-select"
            isDisabled={disabled}
            placeholder="Selecciona una opción"
            isClearable
          />
        )}
      />
      <label
        htmlFor={id as string}
        className="absolute top-0 start-0 py-1 px-0 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0]
          peer-disabled:opacity-50 peer-disabled:pointer-events-none
          peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500
          peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
      >
        {label}
      </label>
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectField;
