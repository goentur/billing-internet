import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Plus } from 'lucide-react';

type PaginationSearchFormProps = {
    gate: {
        create : boolean,
        update : boolean,
        delete : boolean,
    };  
    setDataInfo: React.Dispatch<React.SetStateAction<any>>;
    setForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    reset: () => void;
};

export default function PaginationSearchForm({gate,setDataInfo,setForm,setIsEdit,reset} : PaginationSearchFormProps) {
    return (
        <div className="mb-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
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
                    {gate.create && <Button type="button" variant="destructive" onClick={() => {reset(), setForm(true), setIsEdit(false)}}><Plus/> Tambah</Button>}
                </form>
            </div>
        </div>
    );
}
