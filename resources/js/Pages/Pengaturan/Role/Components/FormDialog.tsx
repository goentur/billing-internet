import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
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
import { Loader2, Save } from 'lucide-react';
type FormDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    judul: string;
    data: any; // Tipe data bisa disesuaikan sesuai dengan struktur data yang digunakan
    isEdit: boolean;
    setData: (data: any) => void;
    errors: any; // Tipe data errors dapat disesuaikan dengan format error yang digunakan
    formRefs: React.RefObject<Record<string, HTMLInputElement | null>>;
    processing: boolean;
    simpanAtauUbah: (e: React.FormEvent) => void;
    dataPermissions: { value: string; label: string }[];
};
export default function FormDialog({open,setOpen,judul,data,isEdit,setData,errors,formRefs,processing,simpanAtauUbah, dataPermissions}:FormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={simpanAtauUbah}>
                    <DialogHeader>
                        <DialogTitle>Form {judul}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="space-y-6 mt-5">
                        <div className="grid gap-2">
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
                                readOnly={isEdit}
                                required
                            />
                            {errors.nama && <div className="text-red-500 text-xs mt-0">{errors.nama}</div>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="permissions" className={clsx({ "text-red-500": errors.permissions }, "capitalize")}>permissions</Label>
                            <div className="grid grid-cols-2 gap-4">
                                {dataPermissions?.map((p:any) => (
                                    <div className="grid gap-2" key={p.value}>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={p.value}
                                                value={p.value}
                                                checked={data.permissions?.includes(p.value)}
                                                onCheckedChange={() => 
                                                    setData((prevData:any) => ({
                                                        ...prevData,
                                                        permissions: prevData.permissions.includes(p.value)
                                                        ? prevData.permissions.filter((item:string) => item !== p.value)
                                                        : [...prevData.permissions, p.value],
                                                    }))
                                                }
                                            />
                                            <label
                                                htmlFor={p.value}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >{p.label}</label>
                                        </div>
                                    </div>
                                ))}
                                {errors.permissions && <div className="text-red-500 text-xs mt-0">{errors.permissions}</div>}
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
    );
}
