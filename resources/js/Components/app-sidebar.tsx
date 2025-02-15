import {
	Building,
	FileCheck2,
	FileMinus2,
	Globe,
	HandCoins,
	Key,
	Package,
	Timer,
	UserCheck2,
	UserRoundCog,
	Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/Components/nav-main"
import { NavSecondary } from "@/Components/nav-secondary"
import { NavUser } from "@/Components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react"
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const {user, permissions} = usePage().props.auth;
	const data = {
		user: {
			name: user.name,
			email: user.email,
		},
		menuMaster: [
			{
				title: "Zona Waktu",
				url: "master.zona-waktu.index",
				icon: Timer,
				permission: 'index-zona-waktu',
			},
			{
				title: "Perusahaan",
				url: "master.perusahaan.index",
				icon: Building,
				permission: 'index-perusahaan',
			},
			{
				title: "Paket Internet",
				url: "master.paket-internet.index",
				icon: Package,
				permission: 'index-paket-internet',
			},
			{
				title: "Pelanggan",
				url: "dashboard",
				icon: Users,
				permission: 'index-pelanggan',
			},
			{
				title: "Pemilik",
				url: "master.pemilik.index",
				icon: UserCheck2,
				permission: 'index-pemilik',
			},
			{
				title: "Pegawai",
				url: "dashboard",
				icon: UserCheck2,
				permission: 'index-pegawai',
			},
		],
		menuTransaksi: [
			{
				title: "Pembayaran",
				url: "dashboard",
				icon: HandCoins,
				permission: 'index-pembayaran',
			},
		],
		menuLaporan: [
			{
				title: "Pembayaran",
				url: "dashboard",
				icon: FileCheck2,
				permission: 'index-laporan-pembayaran',
			},
			{
				title: "Piutang",
				url: "dashboard",
				icon: FileMinus2,
				permission: 'index-laporan-piutang',
			},
		],
		navSecondary: [
			{
				title: "Pengguna",
				url: "pengaturan.pengguna.index",
				icon: UserCheck2,
				permission: 'index-pengguna',
			},
			{
				title: "Role",
				url: "pengaturan.role.index",
				icon: UserRoundCog,
				permission: 'index-role',
			},
			{
				title: "Permission",
				url: "pengaturan.permission.index",
				icon: Key,
				permission: 'index-permission',
			},
		],
	}
	return (
	<Sidebar variant="inset" {...props}>
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" asChild>
					<Link href={route('dashboard')}>
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<Globe className="size-4" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{appName}</span>
							<span className="truncate text-xs">NAMA PERUSAHAAN</span>
						</div>
					</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
		<SidebarContent className="sidebar-scrollbar">
			<NavMain items={data.menuMaster} title={'Master'} permissions={permissions} />
			<NavMain items={data.menuTransaksi} title={'Transaksi'} permissions={permissions} />
			<NavMain items={data.menuLaporan} title={'Laporan'} permissions={permissions} />
			<NavSecondary items={data.navSecondary} permissions={permissions} className="mt-auto" />
		</SidebarContent>
		<SidebarFooter>
			<NavUser user={data.user} />
		</SidebarFooter>
	</Sidebar>
	)
}
