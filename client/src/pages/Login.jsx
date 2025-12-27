import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate, useLocation } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
})

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.message || "Login failed")
      }

      const token = json?.data?.token
      if (token) {
        localStorage.setItem("token", token)
        navigate(from, { replace: true })
      } else {
        throw new Error("No token received")
      }
    } catch (err) {
      alert(err?.message || "Login failed")
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        Welcome back
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Sign in to your account
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

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-teal-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-6">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-teal-600 font-medium">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}