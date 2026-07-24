import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";

export async function checkAdmin() {
  const supabase = await createClient();
  const locale = await getLocale();
  const signInPath = `/${locale}/signin`;

  if (!supabase) {
    redirect(signInPath);
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(signInPath);
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!admin) {
    redirect(signInPath);
  }

  return { user, admin };
}
