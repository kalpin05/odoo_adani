import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data) => {
    console.log("LOGIN DATA", data)
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

        <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition">
          Sign In
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
