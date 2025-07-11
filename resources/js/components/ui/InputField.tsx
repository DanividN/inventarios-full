import React from "react"
import { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form"
import { AreaFormValues } from "@/types/AreaFormValues"

type InputFieldProps = {
  id: keyof AreaFormValues
  label: string
  type?: string
  placeholder?: string
  additionalClasses?: string
  register: UseFormRegister<AreaFormValues>
  errors: FieldErrors<AreaFormValues>
  rules?: RegisterOptions
  disabled?: boolean
  maxLength?: number
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder = "",
  additionalClasses = "",
  register,
  errors,
  rules,
  disabled = false,
  maxLength,
}) => {
  return (
    <div className={`relative ${additionalClasses}`}>
      <input
        id={id}
        type={type}
        maxLength={maxLength}
        {...register(id, rules)}
        className={`peer py-4 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-sm placeholder:text-transparent focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-light-600 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none
        focus:pt-6
        focus:pb-2
        not-placeholder-shown:pt-6
        not-placeholder-shown:pb-2
        autofill:pt-6
        autofill:pb-2`}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="absolute top-0 start-0 py-2 px-0 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0]
        peer-disabled:opacity-50 peer-disabled:pointer-events-none
        peer-focus:scale-90
        peer-focus:translate-x-0.5
        peer-focus:-translate-y-1.5
        peer-focus:text-gray-500
        peer-not-placeholder-shown:scale-90
        peer-not-placeholder-shown:translate-x-0.5
        peer-not-placeholder-shown:-translate-y-1.5
        peer-not-placeholder-shown:text-gray-500"
      >
        {label}
      </label>
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  )
}

export default InputField
