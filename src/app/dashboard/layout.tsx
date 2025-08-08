'use client'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import Header from '@/components/header'
import MainSidebar from '@/components/mainSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
