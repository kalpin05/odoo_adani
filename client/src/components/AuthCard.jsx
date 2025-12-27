export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfeff0] via-[#e9edf7] to-[#f3e8f9] px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  )
}
