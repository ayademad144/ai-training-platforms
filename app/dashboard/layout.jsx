
import { checkAdmin } from '@/lib/auth';

export  async function AdminLayout({ children }) {
  await checkAdmin();

  return (
    <>
      {children}
    </>
  );
}

export default AdminLayout;