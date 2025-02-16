import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { BadgeX, DatabaseBackup, Loader2, Pencil, Plus } from 'lucide-react';

type DataTableProps = {
    gate:{
        pelanggan : boolean,
        create : boolean,
        update : boolean,
        delete : boolean,
    };
    loading: boolean;
    dataTable: [];
    dataInfo: any;
    setData: (data: any) => void;
    setDataInfo: React.Dispatch<React.SetStateAction<any>>;
    setForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setHapus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DataTable({gate,loading,dataTable,dataInfo,setData,setDataInfo,setForm,setIsEdit,setHapus} : DataTableProps) {
    return (
        <> 
            <div className="mb-4">
                {gate.delete && dataInfo.odp && dataTable.length == 0 || gate.pelanggan && dataInfo.odp ? ( 
                <div className='text-sm text-white border p-2 mb-3 rounded font-bold'>
                    <ul>
                        {gate.update && dataInfo.odp &&<li className='dark:text-green-500 text-green-900'>* ODP yang dipilih dapat ubah</li>}
                        {gate.delete && dataInfo.odp && dataTable.length == 0 &&<li className='dark:text-red-500 text-red-900'>* ODP yang dipilih dapat hapus</li>}
                        {gate.pelanggan && dataInfo.odp && <li className='dark:text-red-500 text-red-900'>* Setiap pelanggan yang ditambahkan akan otomatis terhubung dengan ODP yang dipilih. Pastikan data pelanggan sesuai dengan lokasi ODP yang telah ditentukan.</li>}
                    </ul>
                </div>
                ):(null)
                }
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="flex items-center gap-4">
                        <Select onValueChange={(e) =>  setDataInfo((prev:any) => ({ ...prev, perPage: Number(e), currentPage: 1 }))}>
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
                        {gate.delete && <Button type="button" variant="destructive" disabled={dataInfo.odp && dataTable.length == 0?false:true} onClick={() => {setHapus(true), setData({id:dataInfo.odp})}}><BadgeX/> Hapus ODP</Button>}
                        {gate.update && <Button type="button" disabled={dataInfo.odp?false:true} onClick={() => {setForm(true), setIsEdit(true), setData({id:dataInfo.odp, nama:dataInfo.nama, alamat:dataInfo.alamat})}}><Pencil/> Ubah ODP</Button>}
                    </div>
                    <form className="flex items-center gap-4">
                        <Input
                            id="cari"
                            name="cari"
                            type="text"
                            placeholder="Masukan kata percarian"
                            autoComplete="off"
                            required
                            onChange={(e) => setDataInfo((prev:any) => ({...prev, search:e.target.value, currentPage : 1}))}
                        />
                        {gate.pelanggan && <Button type="button" variant="destructive" disabled={dataInfo.odp?false:true}><Plus/> Tambah Pelanggan</Button>}
                    </form>
                </div>
            </div>
            <table className="w-full text-left border-collapse border">
                <thead>
                    <tr className="uppercase text-sm leading-normal">
                        <th className="p-2 border w-[1px]">NO</th>
                        <th className="p-2 border">ODP</th>
                        <th className="p-2 border">Nama</th>
                        <th className="p-2 border w-[1px]">Tanggal</th>
                        <th className="p-2 border w-[1px]">Telp</th>
                        <th className="p-2 border w-1/4">Alamat</th>
                        <th className="p-2 border w-1/5">Paket Internet</th>
                    </tr>
                </thead>
                <tbody className="font-light">
                    {loading?(
                        <tr>
                            <td colSpan={7}>
                                <div className="flex items-center justify-center">
                                    <Loader2 className="animate-spin me-2" size={18} />Mohon Tunggu...
                                </div>
                            </td>
                        </tr>
                    ):
                    dataTable.length > 0 ? dataTable.map((value : any,index:number) => (
                    <tr key={index} className="hover:bg-gray-100 dark:hover:bg-slate-900">
                        <td className="px-2 py-1 border text-center">{dataInfo.from+index}</td>
                        <td className="px-2 py-1 border">{value.odp?.nama}</td>
                        <td className="px-2 py-1 border">{value.nama}</td>
                        <td className="px-2 py-1 border">{value.tanggal_bayar}</td>
                        <td className="px-2 py-1 border">{value.telp}</td>
                        <td className="px-2 py-1 border">{value.alamat}</td>
                        <td className="px-2 py-1 border">{value.paket_internet?.nama}</td>
                    </tr>
                    )):
                        <tr>
                            <td colSpan={7}>
                                <div className="flex items-center justify-center">
                                    <DatabaseBackup size={18} className='me-2'/> Data tidak ditemukan
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}
