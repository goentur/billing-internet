import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/Components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { Label } from "@/Components/ui/label";
import clsx from "clsx";
import { Check, ChevronsUpDown, Loader2, Save } from 'lucide-react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import InfoPassword from '@/Components/ui/info-password';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from '@/lib/utils';
import { useState } from 'react';
type FormDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    judul: string;
    data: any;
    setData: (data: any) => void;
    errors: any;
    formRefs: React.RefObject<Record<string, HTMLInputElement | null>>;
    processing: boolean;
    isEdit: boolean;
    simpanAtauUbah: (e: React.FormEvent) => void;
    dataZonaWaktu: { value: string; label: string }[];
    dataPerusahaan: { value: string; label: string }[];
};
export default function FormDialog({open,setOpen,judul,data,setData,errors,formRefs,processing, isEdit,simpanAtauUbah,dataZonaWaktu,dataPerusahaan}:FormDialogProps) {
    const [openSelectZonaWaktu, setOpenSelectZonaWaktu] = useState(false)
    const [openSelectPerusahaan, setOpenSelectPerusahaan] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={simpanAtauUbah}>
                        <DialogHeader>
                            <DialogTitle>Form {judul}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="space-y-6 mt-5">
                            <div className="flex gap-4">
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="email" className={clsx({ "text-red-500": errors.email }, "capitalize")}>email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["email"] = el;
                                            }
                                        }}
                                        type="email"
                                        value={data.email}
                                        placeholder="Masukkan email"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, email: e.target.value }))}
                                        required
                                        readOnly={isEdit}
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-0">{errors.email}</div>}
                                </div>
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="nama" className={clsx({ "text-red-500": errors.nama }, "capitalize")}>Nama</Label>
                                    <Input
                                        id="nama"
                                        name="nama"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["nama"] = el;
                                            }
                                        }}
                                        type="text"
                                        value={data.nama}
                                        placeholder="Masukkan nama"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, nama: e.target.value }))}
                                        required
                                    />
                                    {errors.nama && <div className="text-red-500 text-xs mt-0">{errors.nama}</div>}
                                </div>
                            </div>
                            {!isEdit && (<>
                            <div className="flex gap-4">
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="password" className={clsx({ "text-red-500": errors.password }, "capitalize")}>password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["password"] = el;
                                            }
                                        }}
                                        type="password"
                                        value={data.password}
                                        placeholder="Masukkan password"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, password: e.target.value }))}
                                        required
                                    />
                                    {errors.password && <div className="text-red-500 text-xs mt-0">{errors.password}</div>}
                                </div>
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="password_confirmation" className={clsx({ "text-red-500": errors.password_confirmation }, "capitalize")}>konfirmasi password</Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        placeholder="Masukkan konfirmasi password"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, password_confirmation: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <InfoPassword/>
                            </>)}
                            <div className="flex gap-4">
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="zona_waktu" className={clsx({ "text-red-500": errors.zona_waktu }, "capitalize")}>zona waktu</Label>
                                    <Popover open={openSelectZonaWaktu} onOpenChange={setOpenSelectZonaWaktu}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openSelectZonaWaktu}
                                                className="w-full justify-between"
                                            >
                                            {data.zona_waktu
                                                ? dataZonaWaktu.find((d) => d.value === data.zona_waktu)?.label
                                                : "Pilih zona waktu..."}
                                            <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari zona waktu..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>Zona waktu tidak ada.</CommandEmpty>
                                                    <CommandGroup>
                                                    {dataZonaWaktu.map((d) => (
                                                        <CommandItem
                                                            key={d.value}
                                                            value={d.value}
                                                            onSelect={(currentValue) => {
                                                                setData((prevData:any) => ({ ...prevData, zona_waktu: currentValue }))
                                                                setOpenSelectZonaWaktu(false)
                                                            }}
                                                        >
                                                        {d.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                data.zona_waktu === d.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {errors.zona_waktu && <div className="text-red-500 text-xs mt-0">{errors.zona_waktu}</div>}
                                </div>
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="perusahaan" className={clsx({ "text-red-500": errors.perusahaan }, "capitalize")}>perusahaan</Label>
                                    <Popover open={openSelectPerusahaan} onOpenChange={setOpenSelectPerusahaan}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openSelectPerusahaan}
                                                className="w-full justify-between"
                                            >
                                            {data.perusahaan
                                                ? dataPerusahaan.find((d) => d.value === data.perusahaan)?.label
                                                : "Pilih perusahaan..."}
                                            <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari perusahaan..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>Perusahaan tidak ada.</CommandEmpty>
                                                    <CommandGroup>
                                                    {dataPerusahaan.map((d) => (
                                                        <CommandItem
                                                            key={d.value}
                                                            value={d.value}
                                                            onSelect={(currentValue) => {
                                                                setData((prevData:any) => ({ ...prevData, perusahaan: currentValue }))
                                                                setOpenSelectPerusahaan(false)
                                                            }}
                                                        >
                                                        {d.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                data.perusahaan === d.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {errors.perusahaan && <div className="text-red-500 text-xs mt-0">{errors.perusahaan}</div>}
                                </div>
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <div className="flex items-center mt-5">
                                <Button type="submit" disabled={processing}>
                                    {processing ? <Loader2 className="animate-spin" /> : <Save/>} Simpan
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
