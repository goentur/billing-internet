import { Button } from '@/Components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import clsx from 'clsx'
import { Loader2, Save } from 'lucide-react'
type FormDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
    judul: string
    data: any // Tipe data bisa disesuaikan sesuai dengan struktur data yang digunakan
    setData: (data: any) => void
    errors: any // Tipe data errors dapat disesuaikan dengan format error yang digunakan
    formRefs: React.RefObject<Record<string, HTMLInputElement | null>>
    processing: boolean
    simpanAtauUbah: (e: React.FormEvent) => void
}
export default function FormDialog({
    open,
    setOpen,
    judul,
    data,
    setData,
    errors,
    formRefs,
    processing,
    simpanAtauUbah,
}: FormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={simpanAtauUbah}>
                    <DialogHeader>
                        <DialogTitle>Form {judul}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="space-y-6 mt-5">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="nama"
                                className={clsx(
                                    { 'text-red-500': errors.nama },
                                    'capitalize'
                                )}
                            >
                                Nama
                            </Label>
                            <Input
                                id="nama"
                                name="nama"
                                ref={(el) => {
                                    if (formRefs.current) {
                                        formRefs.current['nama'] = el
                                    }
                                }}
                                type="text"
                                value={data.nama}
                                placeholder="Masukkan nama"
                                onChange={(e) =>
                                    setData((prevData: any) => ({
                                        ...prevData,
                                        nama: e.target.value,
                                    }))
                                }
                                required
                            />
                            {errors.nama && (
                                <div className="text-red-500 text-xs mt-0">
                                    {errors.nama}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="telp"
                                className={clsx(
                                    { 'text-red-500': errors.telp },
                                    'capitalize'
                                )}
                            >
                                telp
                            </Label>
                            <Input
                                id="telp"
                                name="telp"
                                ref={(el) => {
                                    if (formRefs.current) {
                                        formRefs.current['telp'] = el
                                    }
                                }}
                                type="text"
                                value={data.telp}
                                placeholder="Masukkan telp"
                                onChange={(e) =>
                                    setData((prevData: any) => ({
                                        ...prevData,
                                        telp: e.target.value,
                                    }))
                                }
                                required
                            />
                            {errors.telp && (
                                <div className="text-red-500 text-xs mt-0">
                                    {errors.telp}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="alamat"
                                className={clsx(
                                    { 'text-red-500': errors.alamat },
                                    'capitalize'
                                )}
                            >
                                alamat
                            </Label>
                            <Input
                                id="alamat"
                                name="alamat"
                                ref={(el) => {
                                    if (formRefs.current) {
                                        formRefs.current['alamat'] = el
                                    }
                                }}
                                type="text"
                                value={data.alamat}
                                placeholder="Masukan alamat"
                                onChange={(e) =>
                                    setData((prevData: any) => ({
                                        ...prevData,
                                        alamat: e.target.value,
                                    }))
                                }
                                required
                            />
                            {errors.alamat && (
                                <div className="text-red-500 text-xs mt-0">
                                    {errors.alamat}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="koordinat"
                                className={clsx(
                                    { 'text-red-500': errors.koordinat },
                                    'capitalize'
                                )}
                            >
                                koordinat
                            </Label>
                            <Input
                                id="koordinat"
                                name="koordinat"
                                ref={(el) => {
                                    if (formRefs.current) {
                                        formRefs.current['koordinat'] = el
                                    }
                                }}
                                type="text"
                                value={data.koordinat}
                                placeholder="Masukan koordinat"
                                onChange={(e) =>
                                    setData((prevData: any) => ({
                                        ...prevData,
                                        koordinat: e.target.value,
                                    }))
                                }
                                required
                            />
                            {errors.koordinat && (
                                <div className="text-red-500 text-xs mt-0">
                                    {errors.koordinat}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="token_wa"
                                className={clsx(
                                    { 'text-red-500': errors.token_wa },
                                    'capitalize'
                                )}
                            >
                                token wa
                            </Label>
                            <Input
                                id="token_wa"
                                name="token_wa"
                                ref={(el) => {
                                    if (formRefs.current) {
                                        formRefs.current['token_wa'] = el
                                    }
                                }}
                                type="text"
                                value={data.token_wa}
                                placeholder="Masukan token wa"
                                onChange={(e) =>
                                    setData((prevData: any) => ({
                                        ...prevData,
                                        token_wa: e.target.value,
                                    }))
                                }
                                required
                            />
                            {errors.token_wa && (
                                <div className="text-red-500 text-xs mt-0">
                                    {errors.token_wa}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="logo">Logo</Label>
                            <Input
                                id="logo"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                onChange={(e) => {
                                    setData((prevData: any) => ({
                                        ...prevData,
                                        logo: e.target.files?.[0] || null,
                                    }))
                                }}
                                type="file"
                            />

                            {errors.logo && (
                                <div className="text-red-500 text-xs mt-0">
                                    {errors.logo}
                                </div>
                            )}
                        </div>
                    </DialogDescription>
                    <DialogFooter>
                        <div className="flex items-center mt-5">
                            <Button type="submit" disabled={processing}>
                                {processing ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <Save />
                                )}{' '}
                                Simpan
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
