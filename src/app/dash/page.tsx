// app/dash/page.tsx
import { redirect } from "next/navigation";
import {currentUser} from "@/src/lib/auth/currentUser";

// mevcut componentini buraya taşıyacağız:
import DashboardClient from "@/src/components/pages/dash/dashboard.page";

export const metadata = {
  title: "Ravenure - Panel",
  description: "Ravenure Kullanıcı Paneli",
};

export default async function DashPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardClient
      user={{
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "member",
        discordId: user.discordId ?? "",
        accountType: user.accountType ?? "discord",
        avatarUrl: user.profilePictureUrl ?? "/Ravenure-Logo.png",
      }}
    />
  );
}
