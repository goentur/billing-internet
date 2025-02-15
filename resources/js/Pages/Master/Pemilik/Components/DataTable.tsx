import { Badge } from "@/Components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { BadgeX, DatabaseBackup, Ellipsis, Loader2, Pencil } from 'lucide-react';

type DataTableProps = {
  loading: boolean;
  dataTable: [];
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setHapus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DataTable({loading,dataTable,setForm,setIsEdit,setData,setHapus} : DataTableProps) {
    return (
        <div>
            <table className="w-full text-left border-collapse border">
                <thead>
                    <tr className="uppercase text-sm leading-normal">
                        <th className="p-2 border w-[1px]">NO</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Nama</th>
                        <th className="p-2 border">Zona Waktu</th>
                        <th className="p-2 border">Perusahaan</th>
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
                        <td className="px-2 py-1 border text-center">{++index}</td>
                        <td className="px-2 py-1 border">{value.email}</td>
                        <td className="px-2 py-1 border">{value.name}</td>
                        <td className="px-2 py-1 border">{value.zona_waktu?.singkatan}</td>
                        <td className="px-2 py-1 border">
                            { value.perusahaan.map((p:any) => (
                                    <Badge variant={"outline"} key={p.id}>{p.nama}</Badge>
                                )) 
                            }
                        </td>
                        <td className="border text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger className='px-2 py-1'><Ellipsis/></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => {setForm(true), setIsEdit(true), setData({
                                        id:value.id,
                                        email:value.email,
                                        nama:value.name,
                                        zona_waktu:value.zona_waktu_id,
                                        perusahaan:value.perusahaan[0]['id']
                                    })}}><Pencil/> Ubah</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {setHapus(true), setData({id:value.id,})}}><BadgeX/> Hapus</DropdownMenuItem>
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
        </div>
    );
}
