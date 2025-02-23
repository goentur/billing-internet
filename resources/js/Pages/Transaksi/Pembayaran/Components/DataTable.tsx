import { Button } from '@/Components/ui/button';
import { DatabaseBackup, Loader2, PrinterIcon } from 'lucide-react';
import { useState } from 'react';

type DataTableProps = {
    loading: boolean;
    dataTable: [];
    setData: React.Dispatch<React.SetStateAction<any>>;
    setPrint: (id : string) => void;
};
export default function DataTable({ loading, dataTable, setPrint }: DataTableProps) {
    const [loadingPrintId, setLoadingPrintId] = useState<string | null>(null);

    const handlePrint = async (id: string) => {
        setLoadingPrintId(id);
        await setPrint(id);
        setLoadingPrintId(null);
    };

    return (
        <table className="w-full text-left border-collapse border">
            <thead className="text-center">
                <tr className="uppercase text-sm leading-normal">
                    <th rowSpan={2} className="px-2 border w-[1px] table-cell">AKSI</th>
                    <th rowSpan={2} className="px-2 border hidden md:table-cell">Pegawai</th>
                    <th rowSpan={2} className="px-2 border table-cell">Pelanggan</th>
                    <th rowSpan={2} className="px-2 border table-cell">Alamat</th>
                    <th rowSpan={2} className="px-2 border hidden md:table-cell">Paket Internet</th>
                    <th colSpan={2} className="px-2 border hidden md:table-cell">Tanggal</th>
                    <th rowSpan={2} className="px-2 border w-[1px] hidden md:table-cell">Total</th>
                    <th rowSpan={2} className="px-2 border w-[1px] hidden md:table-cell">Status</th>
                </tr>
                <tr className="uppercase text-sm leading-normal hidden md:table-row">
                    <th className="px-2 border w-[1px]">Pembayaran</th>
                    <th className="px-2 border w-[1px]">Transaksi</th>
                </tr>
            </thead>
            <tbody className="font-light">
                {loading ? (
                    <tr>
                        <td colSpan={8}>
                            <div className="flex items-center justify-center">
                                <Loader2 className="animate-spin me-2" size={18} />Mohon Tunggu...
                            </div>
                        </td>
                    </tr>
                ) : dataTable.length > 0 ? (
                    dataTable.map((value: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-100 text-sm align-top dark:hover:bg-slate-900">
                            <td className="px-2 py-1 border text-center">
                                <Button size={'sm'} onClick={() => handlePrint(value.id)}>
                                    {loadingPrintId === value.id ? <Loader2 className="animate-spin" /> : <PrinterIcon />}
                                </Button>
                            </td>
                            <td className="px-2 py-1 border hidden md:table-cell">{value.user}</td>
                            <td className="px-2 py-1 border">{value.pelanggan}</td>
                            <td className="px-2 py-1 border">{value.alamat}</td>
                            <td className="px-2 py-1 border hidden md:table-cell">{value.paket_internet}</td>
                            <td className="px-2 py-1 border hidden md:table-cell">
                                <span>{value?.tanggal_pembayaran?.tanggal}</span>
                                <br className="m-0" />
                                <span className="text-xs">{value?.tanggal_pembayaran?.jam}</span>
                            </td>
                            <td className="px-2 py-1 border hidden md:table-cell">
                                <span>{value?.tanggal_transaksi?.tanggal}</span>
                                <br className="m-0" />
                                <span className="text-xs">{value?.tanggal_transaksi?.jam}</span>
                            </td>
                            <td className="px-2 py-1 border hidden md:table-cell">{value.total}</td>
                            <td className="px-2 py-1 border hidden md:table-cell">{value.status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8}>
                            <div className="flex items-center justify-center">
                                <DatabaseBackup size={18} className="me-2" /> Data tidak ditemukan
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}