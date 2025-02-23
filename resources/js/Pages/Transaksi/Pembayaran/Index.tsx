import PaginationControls from '@/Components/PaginationControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { alertApp } from '@/utils';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import DataTable from './Components/DataTable';
import FormDialog from './Components/FormDialog';
import NotaThermal from './Components/NotaThermal';
import PaginationSearchForm from './Components/PaginationSearchForm';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type indexProps = {
    gate: { create: boolean };
};

type DataPrintType = {
    user?: string;
    perusahaan?: {
		nama : string,
		alamat : string
	};
    pelanggan?: {
		nama : string,
		alamat : string
	};
    paket_internet?: string;
    tanggal_pembayaran?: string;
    tanggal_transaksi?: string;
    total?: string;
};

export default function Index({ gate }: indexProps) {
    const { perusahaan }: any = usePage().props.auth;
    const judul = 'Pembayaran';
    const [form, setForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [dataPrint, setDataPrint] = useState<DataPrintType | null>(null);
    const [linksPagination, setLinksPagination] = useState([]);
    const [dataPelanggan, setDataPelanggan] = useState<[]>([]);
    const [dataInfo, setDataInfo] = useState({
        currentPage: 1,
        from: 1,
        to: 1,
        totalRecords: 0,
        perPage: 25,
        search: null,
        tanggal: null,
    });

    const { data, setData, errors, post, reset, processing } = useForm({
        id: '',
        perusahaan: perusahaan?.id,
        pelanggan: '',
        bulan_pembayaran: '',
    });

    useEffect(() => {
        getData();
    }, [dataInfo.currentPage, dataInfo.search, dataInfo.perPage, dataInfo.tanggal]);

    useEffect(() => {
        getDataPelanggan();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('transaksi.pembayaran.data'), {
                page: dataInfo.currentPage,
                perPage: dataInfo.perPage,
                perusahaan: perusahaan?.id,
                search: dataInfo.search,
                tanggal: dataInfo.tanggal,
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
        } catch (error: any) {
            alertApp(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const getDataPelanggan = async () => {
        try {
            const response = await axios.post(route('master.pelanggan.all-data'), {
                perusahaan: perusahaan?.id,
            });
            setDataPelanggan(response.data);
        } catch (error: any) {
            alertApp(error.message, 'error');
        }
    };
	
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('transaksi.pembayaran.store'), {
			preserveScroll: true,
            onSuccess: (e) => {
                setForm(false);
                reset();
                alertApp(e);
                getData();
            },
            onError: (e) => {
				alertApp(e, 'error');
            },
        });
    };

    const handleGetDataPrint = async (id: string) => {
        if (!id) return;
        try {
            const response = await axios.post(route('transaksi.pembayaran.cetak-data'), { id });
            setDataPrint(response.data);
        } catch (error: any) {
            alertApp(error.message, 'error');
        }
    };

    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{judul}</CardTitle>
                </CardHeader>
                <CardContent>
                    <PaginationSearchForm
                        gate={gate}
                        tanggal={dataInfo.tanggal}
                        setDataInfo={setDataInfo}
                        setForm={setForm}
                        reset={reset}
                    />
                    <DataTable loading={loading} dataTable={dataTable} setData={setData} setPrint={handleGetDataPrint} />
                    <PaginationControls dataInfo={dataInfo} setDataInfo={setDataInfo} linksPagination={linksPagination} />
                </CardContent>
            </Card>
            <FormDialog open={form} setOpen={setForm} judul={judul} data={data} setData={setData} errors={errors} processing={processing} simpan={handleSubmit} dataPelanggan={dataPelanggan} />
            <NotaThermal dataPrint={dataPrint} setDataPrint={setDataPrint}/>
        </AuthenticatedLayout>
    );
}
