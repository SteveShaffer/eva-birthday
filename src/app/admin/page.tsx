import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getRSVPs } from "@/lib/google-sheets";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch RSVPs server-side
  let rsvps = [];
  try {
    if (process.env.GOOGLE_SHEET_ID) {
      rsvps = await getRSVPs();
    }
  } catch (error) {
    console.error("Failed to load RSVPs for admin", error);
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--color-primary)' }}>Admin Dashboard</h1>
        <div>
          <span style={{ marginRight: '16px', color: 'var(--color-text-light)' }}>
            {session.user?.email}
          </span>
          <a href="/api/auth/signout" style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>Sign Out</a>
        </div>
      </div>
      
      <AdminDashboardClient initialRsvps={rsvps} />
    </div>
  );
}
