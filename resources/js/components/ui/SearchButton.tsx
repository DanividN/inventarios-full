export function SearchButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-gray-300",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-green-500 disabled:bg-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-green-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  )
}
