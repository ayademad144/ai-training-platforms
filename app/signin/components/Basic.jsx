"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function Basic() {
  const router = useRouter();

  const [passwordShown, setPasswordShown] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!supabase) {
      await Swal.fire({
        icon: "error",
        title: "Configuration Error",
        text: "Authentication is not configured.",
      });

      setLoading(false);
      return;
    }

    // Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });

      setLoading(false);
      return;
    }

    // Check Admin Role
    const { data: admin, error: roleError } = await supabase
      .from("admins")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    if (roleError || !admin) {
      await supabase.auth.signOut();

      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are not authorized.",
      });

      setLoading(false);
      return;
    }

    switch (admin.role) {
      case "admin":
        router.push("/dashboard");
        break;

      default:
        await supabase.auth.signOut();

        Swal.fire({
          icon: "error",
          title: "Unknown Role",
          text: "Your account doesn't have a valid role.",
        });

        setLoading(false);
        return;
    }
  };

  return (
    <section className="grid h-screen place-items-center p-8">
      <div>
        <h1 className="mb-2 text-3xl font-semibold leading-snug tracking-normal text-gray-900">
          Sign In
        </h1>

        <p className="mb-12 text-lg font-light leading-relaxed text-gray-600">
          Enter your email and password to sign in
        </p>

        <form onSubmit={handleLogin} className="mx-auto max-w-sm text-left">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={passwordShown ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-3 pr-11 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                required
              />

              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="rounded text-gray-600 hover:text-gray-900"
                  aria-label={passwordShown ? "Hide password" : "Show password"}
                  aria-pressed={passwordShown}
                >
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 px-6 py-3 text-xs font-bold uppercase text-white shadow-md transition-shadow hover:shadow-lg focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
export default Basic;
