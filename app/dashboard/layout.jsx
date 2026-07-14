import { checkAdmin } from "@/lib/auth";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Dashboard",
};

export async function AdminLayout({ children }) {
  await checkAdmin();

  return <>{children}</>;
}

export default AdminLayout;
