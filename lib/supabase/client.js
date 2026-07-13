import { createBrowserClient } from "@supabase/ssr/dist/module/createBrowserClient.js";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export const supabase = createClient();
export default supabase;
