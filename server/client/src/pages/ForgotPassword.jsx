import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
})

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = (data) => {
    console.log("RESET PASSWORD EMAIL:", data.email)
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        Forgot password?
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        We’ll send you a reset link
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            {...register("email")}
            placeholder="you@example.com"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition">
          Send reset link
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-6">
        Remembered your password?{" "}
        <Link to="/login" className="text-teal-600 font-medium">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  )
}
