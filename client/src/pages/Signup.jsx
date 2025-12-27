import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import AuthCard from "../components/AuthCard"
import InputField from "../components/InputField"

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function Signup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.message || "Signup failed")
      }

      alert("Account created! Please log in.")
      navigate("/login")
    } catch (err) {
      alert(err?.message || "Signup failed")
    }
  }

  return (
    <AuthCard title="Create account" subtitle="Get started with GearGuard">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Name"
          placeholder="Your name"
          register={register("name")}
          error={errors.name?.message}
        />

        <InputField
          label="Email"
          placeholder="you@example.com"
          register={register("email")}
          error={errors.email?.message}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          register={register("password")}
          error={errors.password?.message}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}