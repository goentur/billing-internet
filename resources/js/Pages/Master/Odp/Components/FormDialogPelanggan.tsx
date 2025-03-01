import SelectPopover from '@/Components/SelectPopover'
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
    data: any // Tipe data bisa disesuaikan sesuai dengan struktur data yang digunakan
    setData: (data: any) => void
    errors: any // Tipe data errors dapat disesuaikan dengan format error yang digunakan
    formRefs: React.RefObject<Record<string, HTMLInputElement | null>>
    processing: boolean
    simpanPelanggan: (e: React.FormEvent) => void
    dataPaketInternet: { value: string; label: string }[]
}
export default function FormDialogPelanggan({
    open,
    setOpen,
    data,
    setData,
    errors,
    formRefs,
    processing,
    simpanPelanggan,
    dataPaketInternet,
}: FormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={simpanPelanggan}>
                    <DialogHeader>
                        <DialogTitle>Form Pelanggan</DialogTitle>
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
                        <div className="flex gap-4">
                            <div className="grid gap-2 w-1/2">
                                <Label
                                    htmlFor="tanggal_bayar"
                                    className={clsx(
                                        {
                                            'text-red-500':
                                                errors.tanggal_bayar,
                                        },
                                        'capitalize'
                                    )}
                                >
                                    tanggal bayar
                                </Label>
                                <Input
                                    id="tanggal_bayar"
                                    name="tanggal_bayar"
                                    ref={(el) => {
                                        if (formRefs.current) {
                                            formRefs.current['tanggal_bayar'] =
                                                el
                                        }
                                    }}
                                    type="text"
                                    value={data.tanggal_bayar}
                                    placeholder="Masukkan tanggal bayar"
                                    onChange={(e) =>
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            tanggal_bayar: e.target.value,
                                        }))
                                    }
                                    required
                                />
                                {errors.tanggal_bayar && (
                                    <div className="text-red-500 text-xs mt-0">
                                        {errors.tanggal_bayar}
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2 w-1/2">
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
                                placeholder="Masukkan alamat"
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
                            <SelectPopover
                                label="paket internet"
                                selectedValue={data.paket_internet}
                                options={dataPaketInternet}
                                onSelect={(value) =>
                                    setData((prevData: any) => ({
                                        ...prevData,
                                        paket_internet: value,
                                    }))
                                }
                                error={errors.paket_internet}
                            />
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
