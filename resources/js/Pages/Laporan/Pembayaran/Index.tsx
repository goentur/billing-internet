import PaginationControls from '@/Components/PaginationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { alertApp } from '@/utils'
import { Head, usePage } from '@inertiajs/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DataTable from './Components/DataTable'
import PaginationSearchForm from './Components/PaginationSearchForm'
const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

type indexProps = {
    gate: { print: boolean }
}
export default function Index({ gate }: indexProps) {
    const { perusahaan }: any = usePage().props.auth
    const judul = 'Laporan Pembayaran'
    const [loading, setLoading] = useState(false)
    const [dataTable, setDataTable] = useState<[]>([])
    const [linksPagination, setLinksPagination] = useState([])
    const [dataInfo, setDataInfo] = useState({
        currentPage: 1,
        from: 1,
        to: 1,
        totalRecords: 0,
        perPage: 25,
        search: null,
        tanggal: null,
    })
    useEffect(() => {
        getData()
    }, [
        dataInfo.currentPage,
        dataInfo.search,
        dataInfo.perPage,
        dataInfo.tanggal,
    ])

    const getData = async () => {
        setLoading(true)
        try {
            const response = await axios.post(
                route('laporan.pembayaran.data'),
                {
                    page: dataInfo.currentPage,
                    perPage: dataInfo.perPage,
                    perusahaan: perusahaan?.id,
                    search: dataInfo.search,
                    tanggal: dataInfo.tanggal,
                }
            )
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
                    />
                    <DataTable
                        loading={loading}
                        dataTable={dataTable}
                    />
                    <PaginationControls
                        dataInfo={dataInfo}
                        setDataInfo={setDataInfo}
                        linksPagination={linksPagination}
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    )
}
