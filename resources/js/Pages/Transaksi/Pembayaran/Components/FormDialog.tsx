import InputFormatUang from "@/Components/InputFormatUang";
import SelectDateMonth from "@/Components/SelectDateMonth";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
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
import { Label } from "@/Components/ui/label";
import clsx from "clsx";
import { Check, ChevronsUpDown, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SelectPopover from "@/Components/SelectPopover";
type FormDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    judul: string;
    data: any; // Tipe data bisa disesuaikan sesuai dengan struktur data yang digunakan
    setData: (data: any) => void;
    errors: any; // Tipe data errors dapat disesuaikan dengan format error yang digunakan
    processing: boolean;
    simpan: (e: React.FormEvent) => void;
    dataPelanggan: { value: string; label: string }[];
};
export default function FormDialog({open,setOpen,judul,data,setData,errors,processing,simpan,dataPelanggan}:FormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={simpan}>
                    <DialogHeader>
                        <DialogTitle>Form {judul}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="space-y-6 mt-5">
                        <SelectPopover label="pelanggan" selectedValue={data.pelanggan} options={dataPelanggan} onSelect={(value) => setData((prevData:any) => ({ ...prevData, pelanggan: value }))} error={errors.pelanggan}/>
                        <div className="grid gap-2">
                            <Label className={clsx({ "text-red-500": errors.bulan_pembayaran }, "capitalize")}>Bulan pembayaran</Label>
                            <SelectDateMonth hide={false} value={data.bulan_pembayaran} onChange={(e:any) =>  setData((prev:any) => ({ ...prev, bulan_pembayaran: e}))}/>
                            {errors.bulan_pembayaran && <div className="text-red-500 text-xs mt-0">{errors.bulan_pembayaran}</div>}
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
    );
}
