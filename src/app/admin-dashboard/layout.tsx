// admin dashboard layout
'use client';

import SidebarComponent from "@/src/components/admin-dashboard/sidebar.component";
import { useSidebarStore } from "@/src/stores/sidebar-store";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const isOpen = useSidebarStore(state => state.isOpen);
    return (
        <div>
            <SidebarComponent />
            <div className={`${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
                {children}
            </div>
        </div>
    );
}