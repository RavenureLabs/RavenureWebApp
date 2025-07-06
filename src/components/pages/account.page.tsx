"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function AccountPageComponent(){
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);

    if (!session) {
        return null;
    }

    return(
        <div>
            <div>
                <h1>Account Page</h1>
                <p>Welcome, {session.user?.name}!</p>
            </div>
        </div>
    )
}