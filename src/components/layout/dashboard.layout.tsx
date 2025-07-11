"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function DashBoardClientLayout({ children }: { children: React.ReactNode }) {
const { data: session, status} = useSession();
  useEffect(() => {
    if(!session && status === "unauthenticated") {
        window.location.href = "/login";
        return;
    }
  }, [session]);
  return (
    <div>
        {children}
    </div>
  );
}
