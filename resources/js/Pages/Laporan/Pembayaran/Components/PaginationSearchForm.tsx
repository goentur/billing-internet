import SelectDateMonth from '@/Components/SelectDateMonth'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'
import { Download } from 'lucide-react'
interface DataInfo {
    from: number
    to: number
    totalRecords: number
    currentPage: number
    tanggal: string
}
type PaginationSearchFormProps = {
    gate: {
        print: boolean
    }
    perusahaan: string
    dataInfo: DataInfo
    tanggal: string | null
    setDataInfo: React.Dispatch<React.SetStateAction<any>>
}

export default function PaginationSearchForm({
    gate,
    perusahaan,
    dataInfo,
    tanggal,
    setDataInfo,
}: PaginationSearchFormProps) {
    return (
        <div className="mb-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <Select
                        onValueChange={(e) =>
                            setDataInfo((prev: any) => ({
                                ...prev,
                                perPage: Number(e),
                                currentPage: 1,
                            }))
                        }
                    >
                        <SelectTrigger className="w-1/3 hidden md:flex">
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
                    <SelectDateMonth
                        hide={true}
                        value={tanggal}
                        onChange={(e: any) =>
                            setDataInfo((prev: any) => ({
                                ...prev,
                                tanggal: e,
                                currentPage: 1,
                            }))
                        }
                    />
                    <Input
                        id="cari"
                        name="cari"
                        type="text"
                        placeholder="Masukan kata percarian"
                        autoComplete="off"
                        required
                        onChange={(e) =>
                            setDataInfo((prev: any) => ({
                                ...prev,
                                search: e.target.value,
                                currentPage: 1,
                            }))
                        }
                    />
                    {gate.print && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                const url = route("laporan.pembayaran.export-excel", { 
                                    perusahaan: perusahaan,
                                    tanggal: dataInfo.tanggal,
                                });
                                window.open(url, "_blank");
                            }}
                        >
                                <Download />Excel
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}
