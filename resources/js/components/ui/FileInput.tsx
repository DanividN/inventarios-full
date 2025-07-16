import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import { useState, useRef } from "react"
import {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  UseFormSetValue
} from "react-hook-form"
import { TrabajadoresFormValues } from "@/types/TrabajadoresFormValues"

type FileInputProps = {
  id: keyof TrabajadoresFormValues
  label: string
  register: UseFormRegister<TrabajadoresFormValues>
  setValue: UseFormSetValue<TrabajadoresFormValues>
  rules?: RegisterOptions
  errors?: FieldErrors<TrabajadoresFormValues>
  disabled?: boolean
}

export default function FileInput({
  id,
  label,
  register,
  rules,
  errors,
  setValue,
  disabled = false

}: FileInputProps) {
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Solo registra el campo una vez
  const fileRegister = register(id, rules)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files)
      setFiles(selected)

      const dt = new DataTransfer()
      selected.forEach(file => dt.items.add(file))
      setValue(id, dt.files, { shouldValidate: true, shouldDirty: true })
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const dropped = Array.from(e.dataTransfer.files)
      setFiles(dropped)

      const dt = new DataTransfer()
      dropped.forEach(file => dt.items.add(file))
      setValue(id, dt.files, { shouldValidate: true, shouldDirty: true })

      if (inputRef.current) {
        inputRef.current.files = dt.files
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const getBorderColor = () => {
    if (files.length === 0) return "border-dashed border-gray-300"
    if (files.length === 1) return "border-dashed border-yellow-400"
    return "border-dashed border-green-500"
  }

  return (
    <div className="max-w-md w-full">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div
        className={`relative border-2 ${getBorderColor()} rounded p-3 cursor-pointer transition-colors duration-300`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
      >
        <input
          id={id}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={e => {
            inputRef.current = e
            fileRegister.ref(e)
          }}
          onChange={e => {
            handleFileChange(e)
            fileRegister.onChange(e)
          }}
          disabled={disabled}
        />

        <div className="flex flex-row items-center justify-center">
          <ArrowUpTrayIcon className="h-6 w-6 text-gray-500 mr-2 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">
              Suelta elementos aquí o{" "}
              <span className="text-blue-500">explora archivos</span>
            </p>
            {files.length > 0 && (
              <div className="text-sm text-gray-700 text-center mt-2">
                {files.length}{" "}
                {files.length === 1
                  ? "archivo seleccionado"
                  : "archivos seleccionados"}
              </div>
            )}
          </div>
        </div>
      </div>
      {errors?.[id] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  )
}
