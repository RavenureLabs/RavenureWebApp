"use client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";
const SidebarComponent = dynamic(
  () => import("../sidebar/sidebar.component")
);


function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">

      </div>
    </div>
  );
}

export default function DashBoardClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <Loading />;
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-gradient-to-br from-[#09080a] to-[#171717] text-white py-10 flex items-center justify-center">
        <div className="container max-w-8xl mx-auto flex flex-col md:flex-row gap-8 px-4">
          <SidebarComponent />
          {children}
        </div>
      </div>
    </Suspense>
  );
}