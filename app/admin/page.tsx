import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getPortfolioData } from "@/lib/data";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const data = await getPortfolioData();
  return <AdminDashboard initialData={data} />;
}
