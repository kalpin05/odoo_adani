export default function InputField({
  label,
  type = "text",
  register,
  error,
  placeholder,
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-teal-400"
          }`}
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
