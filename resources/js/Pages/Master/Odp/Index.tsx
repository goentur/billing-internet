import DeleteDialog from '@/Components/DeleteDialog'
import PaginationControls from '@/Components/PaginationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { alertApp } from '@/utils'
import { Head, useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import { MapPinned } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import DataTable from './Components/DataTable'
import FormDialog from './Components/FormDialog'
import FormDialogPelanggan from './Components/FormDialogPelanggan'
import OpenLayersMap from './Components/OpenLayersMap'

type indexProps = {
    gate: {
        pelanggan: boolean
        create: boolean
        update: boolean
        delete: boolean
    }
}
export default function Index({ gate }: indexProps) {
    const { perusahaan }: any = usePage().props.auth
    const judul = 'ODP'
    const [form, setForm] = useState(false)
    const [hapus, setHapus] = useState(false)
    const formRefs = useRef<Record<string, HTMLInputElement | null>>({})
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [dataTable, setDataTable] = useState<[]>([])
    const [dataMaps, setDataMaps] = useState<[]>([])
    const [dataPaketInternet, setDataPaketInternet] = useState<[]>([])
    const [formPelanggan, setFormPelanggan] = useState(false)
    const [linksPagination, setLinksPagination] = useState([])
    const [dataInfo, setDataInfo] = useState({
        currentPage: 1,
        from: 1,
        to: 1,
        totalRecords: 0,
        perPage: 25,
        search: null,
        perusahaan: perusahaan?.id,
        odp: null,
        nama: null,
        alamat: null,
    })

    const {
        data,
        setData,
        errors,
        post,
        patch,
        delete: destroy,
        reset,
        processing,
    } = useForm({
        id: '',
        perusahaan: perusahaan?.id,
        nama: '',
        alamat: '',
        koordinat: '',
    })
    useEffect(() => {
        getData()
        getDataPaketInternet()
    }, [])

    useEffect(() => {
        getDataPelanggan()
    }, [dataInfo.currentPage, dataInfo.search, dataInfo.perPage, dataInfo.odp])

    const getData = async () => {
        try {
            const response = await axios.post(route('master.odp.data'), {
                perusahaan: perusahaan?.id,
            })
            setDataMaps(response.data)
        } catch (error: any) {
            alertApp(error.message, 'error')
        }
    }
    const getDataPaketInternet = async () => {
        try {
            const response = await axios.post(
                route('master.paket-internet.all-data'),
                {
                    perusahaan: perusahaan?.id,
                }
            )
            setDataPaketInternet(response.data)
        } catch (error: any) {
            alertApp(error.message, 'error')
        }
    }
    const getDataPelanggan = async () => {
        setLoading(true)
        try {
            const response = await axios.post(route('master.pelanggan.data'), {
                page: dataInfo.currentPage,
                search: dataInfo.search,
                perPage: dataInfo.perPage,
                perusahaan: perusahaan?.id,
                odp: dataInfo.odp,
            })
            setDataTable(response.data.data)
            setLinksPagination(response.data.links)
            setDataInfo((prev) => ({
                ...prev,
                currentPage: response.data.current_page,
                from: response.data.from,
                to: response.data.to,
                totalRecords: response.data.total,
                perPage: response.data.per_page,
            }))
        } catch (error: any) {
            alertApp(error.message, 'error')
        } finally {
            setLoading(false)
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const action = isEdit ? patch : post
        const routeName = isEdit
            ? (route('master.odp.update', data) as string)
            : (route('master.odp.store') as string)
        action(routeName, {
            preserveScroll: true,
            onSuccess: (e) => {
                setForm(false)
                reset()
                alertApp(e)
                getData()
            },
            onError: (e) => {
                const firstErrorKey = Object.keys(e)[0]
                if (firstErrorKey) {
                    formRefs.current[firstErrorKey]?.focus()
                }
            },
        })
    }
    const handleSubmitPelanggan = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('master.pelanggan.store'), {
            preserveScroll: true,
            onSuccess: (e) => {
                setFormPelanggan(false)
                reset()
                alertApp(e)
                getDataPelanggan()
            },
            onError: (e) => {
                const firstErrorKey = Object.keys(e)[0]
                if (firstErrorKey) {
                    formRefs.current[firstErrorKey]?.focus()
                }
            },
        })
    }
    const handleHapus = (e: React.FormEvent) => {
        e.preventDefault()
        destroy(route('master.odp.destroy', data), {
            preserveScroll: true,
            onSuccess: (e) => {
                setHapus(false)
                alertApp(e)
                getData()
                setDataInfo((prev) => ({
                    ...prev,
                    currentPage: 1,
                    odp: null,
                    nama: null,
                    alamat: null,
                }))
            },
            onError: (e) => {
                alertApp(e.message, 'error')
            },
        })
    }

    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{judul}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border bg-blue-900 py-5 px-3 mb-2 rounded-xl">
                        <div className="flex text-xl">
                            <MapPinned size={28} className="me-2" /> INFORMASI
                            MAP
                        </div>
                        <ul className="text-sm mt-3">
                            <li>
                                * Klik kanan untuk menambahkan titik baru ODP
                            </li>
                            <li>
                                * Klik kiri untuk melihat informasi data
                                pelanggan yang menggunakan ODP tersebut
                            </li>
                        </ul>
                    </div>
                    <OpenLayersMap
                        gate={gate}
                        dataMaps={dataMaps}
                        perusahaan={perusahaan}
                        setForm={setForm}
                        setData={setData}
                        setDataInfo={setDataInfo}
                    />
                    <div className="mt-5">
                        <DataTable
                            gate={gate}
                            loading={loading}
                            dataTable={dataTable}
                            dataInfo={dataInfo}
                            setData={setData}
                            setDataInfo={setDataInfo}
                            setForm={setForm}
                            setIsEdit={setIsEdit}
                            setHapus={setHapus}
                            setFormPelanggan={setFormPelanggan}
                        />
                        <PaginationControls
                            dataInfo={dataInfo}
                            setDataInfo={setDataInfo}
                            linksPagination={linksPagination}
                        />
                    </div>
                </CardContent>
            </Card>
            <FormDialogPelanggan
                open={formPelanggan}
                setOpen={setFormPelanggan}
                data={data}
                setData={setData}
                errors={errors}
                formRefs={formRefs}
                processing={processing}
                simpanPelanggan={handleSubmitPelanggan}
                dataPaketInternet={dataPaketInternet}
            />
            <FormDialog
                open={form}
                setOpen={setForm}
                judul={judul}
                data={data}
                setData={setData}
                errors={errors}
                formRefs={formRefs}
                processing={processing}
                simpanAtauUbah={handleSubmit}
            />
            <DeleteDialog
                open={hapus}
                setOpen={setHapus}
                processing={processing}
                handleHapusData={handleHapus}
            />
        </AuthenticatedLayout>
    )
}
