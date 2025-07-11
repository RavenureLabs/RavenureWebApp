'use client'

import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react";

export default function DashBoardPageComponent(){
    const { data: session } = useSession();
    return (
        <div>
            <h1>
                Dashboard, Welcome {session?.user?.name || session?.user?.email || "Guest"}
            </h1>
        </div>
    );
}
