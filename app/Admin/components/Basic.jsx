"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export  function Basic() {
  const router = useRouter();

  const [passwordShown, setPasswordShown] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const togglePasswordVisiblity = () =>
    setPasswordShown((cur) => !cur);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data.user.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
  
    // Check Role
    const { data: admin, error: roleError } = await supabase
  .from("admins")
  .select("*")
  .eq("user_id", data.user.id);

    console.log("Admin Data:", admin);
    console.log("Role Error:", roleError);

    if (roleError || !admin) {
      alert("You are not authorized.");

      await supabase.auth.signOut();

      setLoading(false);
      return;
    }
    console.log(admin)
    console.log(admin.role);

    if (admin.role === "admin") {
      router.push("/admin/dashboard");
      return;
    }

    if (admin.role === "admin") {
      router.push("/admin/dashboard");
      return;
    }

    alert("Unknown Role");

    setLoading(false);
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>

        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>

        <form
          onSubmit={handleLogin}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label>
              <Typography
                variant="small"
                className="mb-2 block font-medium"
              >
                Email
              </Typography>
            </label>

            <Input
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
            />
          </div>

          <div className="mb-6">
            <label>
              <Typography
                variant="small"
                className="mb-2 block font-medium"
              >
                Password
              </Typography>
            </label>

            <Input
              size="lg"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
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