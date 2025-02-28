import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { BadgeX, DatabaseBackup, Ellipsis, Loader2, Pencil } from 'lucide-react';

type DataTableProps = {
    gate:{
        create : boolean,
        update : boolean,
        delete : boolean,
    };
    loading: boolean;
    dataTable: [];
    dataInfo: number;
    setForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setData: React.Dispatch<React.SetStateAction<any>>;
    setHapus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DataTable({gate,loading,dataTable,dataInfo,setForm,setIsEdit,setData,setHapus} : DataTableProps) {
    return (
        <table className="w-full text-left border-collapse border">
            <thead>
                <tr className="uppercase text-sm leading-normal">
                    <th className="p-2 border w-[1px]">NO</th>
                    <th className="p-2 border">Nama</th>
                    <th className="p-2 border">Alamat</th>
                    <th className="p-2 border">Koordinat</th>
                    <th className="p-2 border w-1">Aksi</th>
                </tr>
            </thead>
            <tbody className="font-light">
                {loading?(
                    <tr>
                        <td colSpan={5}>
                            <div className="flex items-center justify-center">
                                <Loader2 className="animate-spin me-2" size={18} />Mohon Tunggu...
                            </div>
                        </td>
                    </tr>
                ):
                dataTable.length > 0 ? dataTable.map((value : any,index:number) => (
                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-slate-900">
                    <td className="px-2 py-1 border text-center">{dataInfo++}</td>
                    <td className="px-2 py-1 border">{value.nama}</td>
                    <td className="px-2 py-1 border">{value.alamat}</td>
                    <td className="px-2 py-1 border">{value.koordinat}</td>
                    <td className="border text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger className='px-2 py-1'><Ellipsis/></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {gate.update && <DropdownMenuItem onClick={() => {setForm(true), setIsEdit(true), setData({ id:value.id, nama:value.nama, alamat:value.alamat, koordinat:value.koordinat, logo:null})}}><Pencil/> Ubah</DropdownMenuItem>}
                                {gate.delete && <DropdownMenuItem onClick={() => {setHapus(true), setData({id:value.id})}}><BadgeX/> Hapus</DropdownMenuItem>}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </td>
                </tr>
                )):
                    <tr>
                        <td colSpan={5}>
                            <div className="flex items-center justify-center">
                                <DatabaseBackup size={18} className='me-2'/> Data tidak ditemukan
                            </div>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
}
