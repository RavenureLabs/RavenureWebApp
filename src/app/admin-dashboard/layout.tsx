import { getServerSession } from "next-auth";
import LayoutClient from "./LayoutClient";
import{ redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth/options";
import { currentUser } from "@/src/lib/auth/currentUser";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser({
        role: 1
    });
    if(!user){
        redirect('/login');
    }else if(user.role !== 'admin'){
        redirect('/');
    }
    return (
        <LayoutClient children={children} />
    );
}