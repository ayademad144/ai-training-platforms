import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function checkAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/signin");
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!admin) {
    redirect("/signin");
  }

  return { user, admin };
}
