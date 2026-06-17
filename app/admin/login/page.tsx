import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getIsAuthenticated } from "@/lib/auth";

export default async function AdminLoginPage() {
  if (await getIsAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
      <LoginForm />
    </main>
  );
}
