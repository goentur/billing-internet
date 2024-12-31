import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BadgeX, Check, Ellipsis, Pencil, Search } from 'lucide-react';
import { useState } from 'react';





export default function Index() {
    const judul = "Zona Waktu"
    const [hapus, setHapus] = useState(false);
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{judul}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                                <Select>
                                    <SelectTrigger className="w-1/3">
                                        <SelectValue placeholder="Jumlah per halaman" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="75">75</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <form className="flex items-center gap-4">
                                <Select>
                                    <SelectTrigger className="w-1/2">
                                        <SelectValue placeholder="Cari berdasarkan?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NAMA">NAMA</SelectItem>
                                        <SelectItem value="GMT OFFSET">GMT OFFSET</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    id="cari"
                                    name="cari"
                                    type="text"
                                    placeholder="Masukan kata percarian"
                                    autoComplete="off"
                                    required
                                />
                                <Button type="submit"><Search/> Cari</Button>
                            </form>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse border">
                        <thead>
                        <tr className="uppercase text-sm leading-normal">
                            <th className="p-2 border w-[1px]">NO</th>
                            <th className="p-2 border">nama</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border w-1">aksi</th>
                        </tr>
                        </thead>
                        <tbody className="font-light ">
                            <tr className="hover:bg-gray-100 dark:hover:bg-slate-900">
                                <td className="px-2 py-1 border text-center">1</td>
                                <td className="px-2 py-1 border">John Doe</td>
                                <td className="px-2 py-1 border">john@example.com</td>
                                <td className="px-2 py-1 border">Admin</td>
                                <td className="border text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='px-2 py-1'><Ellipsis/></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem><Pencil/> Ubah</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => {setHapus(true)}}><BadgeX/> Hapus</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <AlertDialog open={hapus} onOpenChange={setHapus}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel><BadgeX/> Tidak</AlertDialogCancel>
                            <AlertDialogAction variant="destructive"><Check/> Ya</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm">Menampilkan 1 sampai 25 dari 50 data</span>
                        <div className="flex items-center space-x-1">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
