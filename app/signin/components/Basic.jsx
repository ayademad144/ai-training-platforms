"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function Basic() {
  const router = useRouter();

  const [passwordShown, setPasswordShown] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data.session);

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
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>

        <Typography className="mb-12 text-gray-600 text-lg">
          Enter your email and password to sign in
        </Typography>

        <form
          onSubmit={handleLogin}
          className="mx-auto max-w-sm text-left"
        >
          <div className="mb-6">
            <Typography variant="small" className="mb-2 font-medium">
              Email
            </Typography>

            <Input
              type="email"
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <Typography variant="small" className="mb-2 font-medium">
              Password
            </Typography>

            <Input
              size="lg"
              type={passwordShown ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={
                <button
                  type="button"
                  onClick={togglePasswordVisiblity}
                >
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </button>
              }
            />
          </div>

          <Button
            type="submit"
            color="gray"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </section>
  );
} 
export default Basic;