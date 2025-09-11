// admin dashboard layout
'use client';

import SidebarComponent from "@/src/components/admin-dashboard/sidebar.component";
import { useSidebarStore } from "@/src/stores/sidebar-store";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const isOpen = useSidebarStore(state => state.isOpen);
    const { data: session, status} = useSession();
    useEffect(() => {
        if(!session && status === "unauthenticated") {
            window.location.href = "/login";
            return;
        }
        if(session && session.user.role !== "admin") {
            window.location.href = "/";
            return;
        }
    }, [session]);
    return (
        <div>
            <SidebarComponent />
            <div className={`${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
                {children}
            </div>
        </div>
    );
}