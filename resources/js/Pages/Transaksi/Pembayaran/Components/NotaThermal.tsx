import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

type DataPrintType = {
    dataPrint: any
    perusahaan: any
    setDataPrint: React.Dispatch<React.SetStateAction<any>>
}

export default function NotaThermal({
    perusahaan,
    dataPrint,
    setDataPrint,
}: DataPrintType) {
    const contentRef = useRef<HTMLDivElement>(null)

    const handlePrintLaporan = useReactToPrint({
        contentRef,
        documentTitle: 'BUKTI PEMBAYARAN',
        pageStyle: `
            @media print {
                body * {
                    visibility: hidden !important; /* Sembunyikan semua */
                }
                #print-area, #print-area * {
                    visibility: visible !important; /* Hanya cetak ini */
                }
                #print-area {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
            }
		`,
        onAfterPrint: () => {
            setDataPrint([])
        },
    })

    useEffect(() => {
        if (dataPrint && Object.keys(dataPrint).length > 0) {
            setTimeout(() => {
                handlePrintLaporan()
            }, 1000)
        }
    }, [dataPrint])
    return (
        <>
            {dataPrint && Object.keys(dataPrint).length > 0 && (
                <>
                    <div className="flex flex-col items-center">
                        <div
                            ref={contentRef}
                            id="print-area"
                            className="w-[80mm] p-0 m-0 border border-dashed font-mono"
                        >
                            <div className="text-center flex-auto">
                                <img
                                    src={perusahaan.logo}
                                    alt="Logo Perusahaan"
                                    className="w-1/4 mx-auto"
                                />
                                <p className="font-semibold">
                                    {perusahaan.nama}
                                </p>
                                <p className="text-xs">{perusahaan.alamat}</p>
                            </div>
                            <table className="w-full text-xs border-collapse">
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="text-center m-0 p-0"
                                        >
                                            ---------------------------------------------
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="w-[1px] align-top font-bold">
                                            PEGAWAI
                                        </td>
                                        <td className="align-top">:</td>
                                        <td className="text-start">
                                            {dataPrint?.user ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-top font-bold">
                                            TANGGAL
                                        </td>
                                        <td className="align-top">:</td>
                                        <td className="text-start">
                                            {dataPrint?.tanggal_transaksi ??
                                                '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="text-center">
                                            ---------------------------------------------
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="w-full text-xs border-collapse">
                                <tbody>
                                    <tr>
                                        <td className="align-top font-bold">
                                            PELANGGAN
                                        </td>
                                        <td className="align-top">:</td>
                                        <td>
                                            {dataPrint?.pelanggan?.nama ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-top font-bold">
                                            ALAMAT
                                        </td>
                                        <td className="align-top">:</td>
                                        <td>
                                            {dataPrint?.pelanggan?.alamat ??
                                                '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-top font-bold">
                                            KETENGAN
                                        </td>
                                        <td className="align-top">:</td>
                                        <td>
                                            Bayar internet untuk bulan{' '}
                                            {dataPrint?.tanggal_pembayaran ??
                                                '-'}
                                        </td>
                                    </tr>
                                    <tr className="font-bold">
                                        <td className="align-top font-bold">
                                            NOMINAL
                                        </td>
                                        <td className="align-top">:</td>
                                        <td>{dataPrint?.total ?? 0}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="text-center">
                                            TERIMAKASIH
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="italic text-[10px]"
                                        >
                                            * Pembayaran sudah termasuk PPN 11%
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="text-[8px]">
                                            dicetak dari {appName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="text-center m-0 p-0"
                                        >
                                            ---------------------------------------------
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
