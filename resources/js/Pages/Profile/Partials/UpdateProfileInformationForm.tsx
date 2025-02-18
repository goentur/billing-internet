import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { AlertCircle, Loader2, Save, Send } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
        });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Informasi Akun</CardTitle>
                <CardDescription>
                    Perbarui informasi profil akun Anda.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className={errors.name && "text-red-500"}>Nama</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            className={errors.name && "border-red-500"}
                            placeholder="Masukan nama"
                            autoFocus={true}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="off"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-0">{errors.name}</div>}
                    </div>
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle className='text-lg'>Alamat email Anda belum diverifikasi.</AlertTitle>
                            <AlertDescription>
                                <Button asChild className='mt-2'>
                                    <Link href={route('verification.send')} method="post"><Send/> Klik di sini untuk mengirim ulang email verifikasi.</Link>
                                </Button>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                        Tautan verifikasi baru telah dikirimkan ke alamat email Anda.
                                    </div>
                                )}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? <Loader2 className="animate-spin" /> : <Save/>} Simpan
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Tersimpan.
                            </p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
