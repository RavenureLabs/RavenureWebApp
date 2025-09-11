import { getServerSession } from "next-auth";
import LayoutClient from "./LayoutClient";
import{ redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth/options";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if(!session?.user){
        redirect('/login');
    }else if(session.user.role !== 'admin'){
        redirect('/');
    }
    return (
        <LayoutClient children={children} />
    );
}