'use client';

import SidebarComponent from '@/src/components/admin-dashboard/sidebar.component';
import { useSidebarStore } from '@/src/stores/sidebar-store';
import { useEffect } from 'react';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const { setOpen, isOpen } = useSidebarStore();
    useEffect(() => {
        setOpen(true);
    }, []);
    return (
        <div>
            <SidebarComponent />
            <div className={`${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
                {children}
            </div>
        </div>
    )
}