import { getAdmin } from "../lib/admin-auth";
import AdminPanel from "./AdminPanel";
import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  let admin = null;
  try { admin = await getAdmin(); } catch { /* Login will show connection errors without exposing credentials. */ }
  return <AdminPanel admin={admin} />;
}
