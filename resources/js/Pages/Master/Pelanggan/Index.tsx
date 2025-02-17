import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { alertApp } from '@/utils';
import DataTable from './Components/DataTable';
import FormDialog from './Components/FormDialog';
import DeleteDialog from '@/Components/DeleteDialog';
import PaginationControls from '@/Components/PaginationControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import PaginationSearchForm from '@/Components/PaginationSearchForm';

type indexProps = {
    gate: {
        create : boolean,
        update : boolean,
        delete : boolean,
    };  
};
export default function Index({gate}:indexProps) {
    const { perusahaan } : any = usePage().props.auth;
    const judul = "Pelanggan";
    const [form, setForm] = useState(false);
    const [hapus, setHapus] = useState(false);
    const formRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [dataOdp, setDataOdp] = useState<[]>([]);
    const [dataPaketInternet, setDataPaketInternet] = useState<[]>([]);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [linksPagination, setLinksPagination] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        currentPage: 1,
        from: 1,
        to: 1,
        totalRecords: 0,
        perPage: 25,
        search: null
    });

    const { data, setData, errors, post, patch, delete: destroy, reset, processing } = useForm({
        id: '',
        perusahaan: perusahaan?.id,
        odp: '',
        paket_internet: '',
        nama: '',
        tanggal_bayar: '',
        telp: '',
        alamat: '',
    });
    useEffect(() => {
        getData();
    }, [dataInfo.currentPage, dataInfo.search, dataInfo.perPage]);
    useEffect(() => {
        getDataOdp();
        getDataPaketInternet();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('master.pelanggan.data'), {
                page: dataInfo.currentPage,
                search: dataInfo.search,
                perPage: dataInfo.perPage,
                perusahaan: perusahaan?.id
            });
            setDataTable(response.data.data);
            setLinksPagination(response.data.links);
            setDataInfo((prev) => ({
                ...prev,
                currentPage: response.data.current_page,
                from: response.data.from,
                to: response.data.to,
                totalRecords: response.data.total,
                perPage: response.data.per_page,
            }));
        } catch (error:any) {
            alertApp(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    const getDataOdp = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('master.odp.all-data'), {
                perusahaan: perusahaan?.id
            });
            setDataOdp(response.data);
        } catch (error:any) {
            alertApp(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    const getDataPaketInternet = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('master.paket-internet.all-data'), {
                perusahaan: perusahaan?.id
            });
            setDataPaketInternet(response.data);
        } catch (error:any) {
            alertApp(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const action = isEdit ? patch : post;
        const routeName = isEdit 
            ? route('master.pelanggan.update', data) as string 
            : route('master.pelanggan.store') as string;

        action(routeName, {
            preserveScroll: true,
            onSuccess: (e) => {
                setForm(false);
                reset();
                alertApp(e);
                getData();
            },
            onError: (e) => {
                const firstErrorKey = Object.keys(e)[0];
                if (firstErrorKey) {
                    formRefs.current[firstErrorKey]?.focus();
                }
            },
        });
    };
    const handleHapus = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('master.pelanggan.destroy', data), {
            preserveScroll: true,
            onSuccess: (e) => {
                setHapus(false);
                alertApp(e);
                getData();
            },
            onError: (e) => {
                alertApp(e.message, 'error');
            },
        });
    };
    
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{judul}</CardTitle>
                </CardHeader>
                <CardContent>
                    <PaginationSearchForm gate={gate} setDataInfo={setDataInfo} setForm={setForm} setIsEdit={setIsEdit} reset={reset}/>
                    <DataTable gate={gate} loading={loading} dataTable={dataTable} dataInfo={dataInfo.from} setForm={setForm} setIsEdit={setIsEdit} setData={setData} setHapus={setHapus} />
                    <PaginationControls dataInfo={dataInfo} setDataInfo={setDataInfo} linksPagination={linksPagination} />
                </CardContent>
            </Card>
            <FormDialog open={form} setOpen={setForm} judul={judul} data={data} setData={setData} errors={errors} formRefs={formRefs} processing={processing} simpanAtauUbah={handleSubmit} dataOdp={dataOdp} dataPaketInternet={dataPaketInternet} />
            <DeleteDialog open={hapus} setOpen={setHapus} processing={processing} handleHapusData={handleHapus}/>
        </AuthenticatedLayout>
    );
}
