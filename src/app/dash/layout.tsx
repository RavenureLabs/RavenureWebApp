import DashBoardClientLayout from "@/src/components/layout/dashboard.layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
          <DashBoardClientLayout>
            {children}
          </DashBoardClientLayout>
      </body>
    </html>
  )
}