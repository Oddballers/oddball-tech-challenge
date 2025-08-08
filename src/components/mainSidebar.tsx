'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Home,
  Users,
  Briefcase,
  FileText,
  UserCheck,
  BarChart2,
  Settings,
  HelpCircle,
  Code,
} from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'

/**
 * Encapsulated sidebar for the dashboard pages
 */
export default function MainSidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <Sidebar>
      {/* ---------- header ---------- */}
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Code className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold">CodeAlchemist</span>
        </div>
      </SidebarHeader>

      {/* ---------- main nav ---------- */}
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>

            <SidebarMenuItem>
              <Link href="/dashboard" passHref>
                <SidebarMenuButton isActive={isActive('/dashboard')} tooltip={{ children: 'Home' }}>
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/reporting" passHref>
                <SidebarMenuButton
                  isActive={isActive('/reporting')}
                  tooltip={{ children: 'Reporting' }}
                >
                  <BarChart2 />
                  <span>Reporting</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>

            <SidebarMenuItem>
              <Link href="/users" passHref>
                <SidebarMenuButton isActive={isActive('/users')} tooltip={{ children: 'Users' }}>
                  <Users />
                  <span>Users</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/challenges-dashboard" passHref>
                <SidebarMenuButton
                  isActive={isActive('/challenges-dashboard')}
                  tooltip={{ children: 'Challenges' }}
                >
                  <FileText />
                  <span>Challenges</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/candidates" passHref>
                <SidebarMenuButton
                  isActive={isActive('/candidates')}
                  tooltip={{ children: 'Candidates' }}
                >
                  <Briefcase />
                  <span>Candidates</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/interviewers" passHref>
                <SidebarMenuButton
                  isActive={isActive('/interviewers')}
                  tooltip={{ children: 'Interviewers' }}
                >
                  <UserCheck />
                  <span>Interviewers</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>

      {/* ---------- footer ---------- */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: 'Settings' }}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: 'Help' }}>
              <HelpCircle />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
