import { DatabaseBackup, Loader2 } from 'lucide-react'

type DataTableProps = {
    loading: boolean
    dataTable: []
}
export default function DataTable({
    loading,
    dataTable,
}: DataTableProps) {
    return (
        <table className="w-full text-left border-collapse border">
            <thead className="text-center">
                <tr className="uppercase text-sm leading-normal">
                    <th className="px-2 border table-cell">
                        Pelanggan
                    </th>
                    <th className="px-2 border hidden md:table-cell w-1">
                        Tanggal
                    </th>
                    <th className="px-2 border table-cell">
                        Alamat
                    </th>
                    <th className="px-2 border hidden md:table-cell">
                        Paket Internet
                    </th>
                </tr>
            </thead>
            <tbody className="font-light">
                {loading ? (
                    <tr>
                        <td colSpan={8}>
                            <div className="flex items-center justify-center">
                                <Loader2
                                    className="animate-spin me-2"
                                    size={18}
                                />
                                Mohon Tunggu...
                            </div>
                        </td>
                    </tr>
                ) : dataTable.length > 0 ? (
                    dataTable.map((value: any, index: number) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 text-sm align-top dark:hover:bg-slate-900"
                        >
                            <td className="px-2 py-1 border">
                                {value.nama}
                            </td>
                            <td className="px-2 py-1 border hidden md:table-cell w-1 text-center">
                                {value.tgl}
                            </td>
                            <td className="px-2 py-1 border">
                                {value.alamat}
                            </td>
                            <td className="px-2 py-1 border hidden md:table-cell">
                                {value.paket}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8}>
                            <div className="flex items-center justify-center">
                                <DatabaseBackup size={18} className="me-2" />{' '}
                                Data tidak ditemukan
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
