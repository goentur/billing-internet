import {
	Building,
	FileCheck2,
	FileMinus2,
	Globe,
	HandCoins,
	Key,
	MapPinned,
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
	const {user, permissions, perusahaan} : any = usePage().props.auth;
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
				permission: 'zona-waktu-index',
			},
			{
				title: "Perusahaan",
				url: "master.perusahaan.index",
				icon: Building,
				permission: 'perusahaan-index',
			},
			{
				title: "Paket Internet",
				url: "master.paket-internet.index",
				icon: Package,
				permission: 'paket-internet-index',
			},
			{
				title: "ODP",
				url: "master.odp.index",
				icon: MapPinned,
				permission: 'odp-index',
			},
			{
				title: "Pelanggan",
				url: "master.pelanggan.index",
				icon: Users,
				permission: 'pelanggan-index',
			},
			{
				title: "Pemilik",
				url: "master.pemilik.index",
				icon: UserCheck2,
				permission: 'pemilik-index',
			},
			{
				title: "Pegawai",
				url: "master.pegawai.index",
				icon: UserCheck2,
				permission: 'pegawai-index',
			},
		],
		menuTransaksi: [
			{
				title: "Pembayaran",
				url: "dashboard",
				icon: HandCoins,
				permission: 'pembayaran-index',
			},
		],
		menuLaporan: [
			{
				title: "Pembayaran",
				url: "dashboard",
				icon: FileCheck2,
				permission: 'laporan-pembayaran-index',
			},
			{
				title: "Piutang",
				url: "dashboard",
				icon: FileMinus2,
				permission: 'laporan-piutang-index',
			},
		],
		navSecondary: [
			{
				title: "Pengguna",
				url: "pengaturan.pengguna.index",
				icon: UserCheck2,
				permission: 'pengguna-index',
			},
			{
				title: "Role",
				url: "pengaturan.role.index",
				icon: UserRoundCog,
				permission: 'role-index',
			},
			{
				title: "Permission",
				url: "pengaturan.permission.index",
				icon: Key,
				permission: 'permission-index',
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
							<span className="truncate text-xs">{perusahaan.nama}</span>
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
