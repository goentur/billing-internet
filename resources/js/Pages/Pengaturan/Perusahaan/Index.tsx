import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Transition } from '@headlessui/react'
import { Head, useForm } from '@inertiajs/react'
import clsx from 'clsx'
import { Eraser, Loader2, Save } from 'lucide-react'
import { FormEventHandler } from 'react'

export default function Index({perusahaan, logo} : any) {
    const judul = 'Perusahaan'

    const { errors, data, setData, post, processing, recentlySuccessful } = useForm({
        nama: perusahaan.nama,
        telp: perusahaan.telp,
        alamat: perusahaan.alamat,
        logo: '',
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('pengaturan.perusahaan.update',perusahaan.id))
    }
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{judul}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 lg:grid-cols-2">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="nama"
                                    className={clsx(
                                        { 'text-red-500': errors.nama },
                                        'capitalize'
                                    )}
                                >
                                    Nama
                                </Label>
                                <Input
                                    id="nama"
                                    name="nama"
                                    type="text"
                                    value={data.nama}
                                    placeholder="Masukkan nama"
                                    onChange={(e) =>
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            nama: e.target.value,
                                        }))
                                    }
                                    required
                                />
                                {errors.nama && (
                                    <div className="text-red-500 text-xs mt-0">
                                        {errors.nama}
                                    </div>
                                )}
                                <Label
                                    htmlFor="telp"
                                    className={clsx(
                                        { 'text-red-500': errors.telp },
                                        'capitalize'
                                    )}
                                >
                                    telp
                                </Label>
                                <Input
                                    id="telp"
                                    name="telp"
                                    type="text"
                                    value={data.telp}
                                    placeholder="Masukkan telp"
                                    onChange={(e) =>
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            telp: e.target.value,
                                        }))
                                    }
                                    required
                                />
                                {errors.telp && (
                                    <div className="text-red-500 text-xs mt-0">
                                        {errors.telp}
                                    </div>
                                )}
                                <Label
                                    htmlFor="alamat"
                                    className={clsx(
                                        { 'text-red-500': errors.alamat },
                                        'capitalize'
                                    )}
                                >
                                    alamat
                                </Label>
                                <Input
                                    id="alamat"
                                    name="alamat"
                                    type="text"
                                    value={data.alamat}
                                    placeholder="Masukan alamat"
                                    onChange={(e) =>
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            alamat: e.target.value,
                                        }))
                                    }
                                    required
                                />
                                {errors.alamat && (
                                    <div className="text-red-500 text-xs mt-0">
                                        {errors.alamat}
                                    </div>
                                )}
                                <Label htmlFor="logo">Logo</Label>
                                <Input
                                    id="logo"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    onChange={(e) => {
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            logo: e.target.files?.[0] || null,
                                        }))
                                    }}
                                    type="file"
                                />

                                {errors.logo && (
                                    <div className="text-red-500 text-xs mt-0">
                                        {errors.logo}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center mt-5">
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <Save />
                                    )}{' '}
                                    Simpan
                                </Button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="ms-5 text-sm text-green-600 dark:text-green-400">
                                        Selesai.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                        <div className="w-full text-center">
                            <span className='text-4xl'>logo perusahaan</span>
                            <img src={logo} className='w-1/4 mx-auto' alt="Logo Perusahaan" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    )
}
