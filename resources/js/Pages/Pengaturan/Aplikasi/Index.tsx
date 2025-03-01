import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Transition } from '@headlessui/react'
import { Head, useForm } from '@inertiajs/react'
import { Eraser, Loader2 } from 'lucide-react'
import { FormEventHandler } from 'react'

export default function Index() {
    const judul = 'Aplikasi'

    const { post, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const handleOptimizeClear: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('pengaturan.aplikasi.optimize-clear'))
    }
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{judul}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            onClick={handleOptimizeClear}
                            disabled={processing}
                        >
                            {processing ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Eraser />
                            )}{' '}
                            Optimize : Clear
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Selesai.
                            </p>
                        </Transition>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    )
}
