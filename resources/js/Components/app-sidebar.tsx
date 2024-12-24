import {
	Bot,
	Globe,
	LifeBuoy,
	Send,
	SquareTerminal
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = usePage().props.auth.user;
	const data = {
		user: {
			name: user.name,
			email: user.email,
		},
		navMain: [
			{
				title: "Playground",
				url: "#",
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: "History",
						url: "dashboard",
					},
					{
						title: "Starred",
						url: "dashboard",
					},
					{
						title: "Settings",
						url: "dashboard",
					},
				],
			},
			{
				title: "Models",
				url: "#",
				icon: Bot,
				items: [
					{
						title: "Genesis",
						url: "dashboard",
					},
					{
						title: "Explorer",
						url: "dashboard",
					},
					{
						title: "Quantum",
						url: "dashboard",
					},
				],
			},
			{
				title: "Models",
				url: "#",
				icon: Bot,
				items: [
					{
						title: "Genesis",
						url: "dashboard",
					},
					{
						title: "Explorer",
						url: "dashboard",
					},
					{
						title: "Quantum",
						url: "dashboard",
					},
				],
			},
			{
				title: "Models",
				url: "#",
				icon: Bot,
				items: [
					{
						title: "Genesis",
						url: "dashboard",
					},
					{
						title: "Explorer",
						url: "dashboard",
					},
					{
						title: "Quantum",
						url: "dashboard",
					},
				],
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoy,
			},
			{
				title: "Feedback",
				url: "#",
				icon: Send,
			},
		],
	}
	return (
	<Sidebar variant="inset" {...props} className="sidebar-scrollbar">
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" asChild>
					<a href="#">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<Globe className="size-4" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{appName}</span>
							<span className="truncate text-xs">NAMA PERUSAHAAN</span>
						</div>
					</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
		<SidebarContent className="sidebar-scrollbar">
			<NavMain items={data.navMain} />
			<NavSecondary items={data.navSecondary} className="mt-auto" />
		</SidebarContent>
		<SidebarFooter>
			<NavUser user={data.user} />
		</SidebarFooter>
	</Sidebar>
	)
}
