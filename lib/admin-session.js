export async function getAuthenticatedAdmin(supabase) {
  if (!supabase) {
    return {
      admin: null,
      error: null,
      status: "not_configured",
      user: null,
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      admin: null,
      error: userError,
      status: "unauthenticated",
      user: null,
    };
  }

  const { data: admin, error: roleError } = await supabase
    .from("admins")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (roleError) {
    return {
      admin: null,
      error: roleError,
      status: "role_error",
      user,
    };
  }

  if (!admin) {
    return {
      admin: null,
      error: null,
      status: "not_admin",
      user,
    };
  }

  return {
    admin,
    error: null,
    status: "authorized",
    user,
  };
}

export function getAdminAccessMessage(result) {
  switch (result.status) {
    case "not_configured":
      return "Supabase is not configured. Check the environment variables.";
    case "not_admin":
      return "Your account is not authorized to manage platforms.";
    case "role_error":
      return result.error?.message || "Could not verify your admin access.";
    default:
      return "Please sign in to manage platforms.";
  }
}
