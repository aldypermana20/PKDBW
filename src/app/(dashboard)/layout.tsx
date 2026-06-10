import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex flex-col flex-1 w-full">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
