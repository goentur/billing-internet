import DeleteDialog from '@/Components/DeleteDialog';
import PaginationControls from '@/Components/PaginationControls';
import PaginationSearchForm from '@/Components/PaginationSearchForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { alertApp } from '@/utils';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import DataTable from './Components/DataTable';
import FormDialog from './Components/FormDialog';

type indexProps = {
    gate: {
        create : boolean,
        update : boolean,
        delete : boolean,
    };  
};

export default function Index({gate}:indexProps) {
    const judul = "Role";
    const [form, setForm] = useState(false);
    const [hapus, setHapus] = useState(false);
    const formRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [dataPermissions, setDataPermissions] = useState<[]>([]);
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
        uuid: '',
        nama: '',
        permissions: [],
    });

    useEffect(() => {
        getData();
    }, [dataInfo.currentPage, dataInfo.search, dataInfo.perPage]);

    useEffect(() => {
        getDataPermissions();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('pengaturan.role.data'), {
                page: dataInfo.currentPage,
                search: dataInfo.search,
                perPage: dataInfo.perPage,
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
    const getDataPermissions = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('pengaturan.permission.all-data'));
            setDataPermissions(response.data);
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
            ? route('pengaturan.role.update', data) as string 
            : route('pengaturan.role.store') as string;

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
        destroy(route('pengaturan.role.destroy', data), {
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
            <FormDialog open={form} setOpen={setForm} judul={judul} data={data} isEdit={isEdit} setData={setData} errors={errors} formRefs={formRefs} processing={processing} simpanAtauUbah={handleSubmit} dataPermissions={dataPermissions} />
            <DeleteDialog open={hapus} setOpen={setHapus} processing={processing} handleHapusData={handleHapus}/>
        </AuthenticatedLayout>
    );
}
