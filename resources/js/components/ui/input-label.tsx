import * as React from "react"
import { cn } from "@/lib/utils"

interface InputLabelProps extends React.ComponentProps<"input"> {
  label: string
}

export default function InputLabel({ className, label, type,...props }: InputLabelProps) {


  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "block px-0 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent appearance-none",
          "border-0 border-b border-black rounded-none",
          "focus:outline-none focus:ring-0 focus:border-green-800 peer",
          "dark:text-white dark:border-gray-600 dark:focus:border-green-800",
          className,
        )}
        placeholder=" "
        {...props}
      />
      <label
        className={cn(
          "absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]",
          "dark:bg-gray-900 px-2",
          "peer-focus:px-2 peer-focus:text-green-800 peer-focus:dark:text-green-800",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2",
          "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4",
          "start-0",
        )}
      >
        {label}
      </label>
    </div>
  )
}

