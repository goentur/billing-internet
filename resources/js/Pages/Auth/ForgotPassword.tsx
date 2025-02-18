import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardHeader
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2, Send } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />
            <Card>
                <CardHeader className="text-justify text-sm">
                    Lupa password Anda? Tidak masalah. Cukup beri tahu kami alamat email Anda dan kami akan mengirimkan Anda email berisi tautan pengaturan ulang password.
                </CardHeader>
                <CardContent>
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                    <form onSubmit={submit} method="post">
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className={errors.email && "text-red-500"}>Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={errors.email && "border-red-500"}
                                        placeholder="Masukan email"
                                        autoFocus={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-0">{errors.email}</div>}
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? <Loader2 className="animate-spin" /> : <Send/>} Kirim email
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Tidak punya akun?<Link href={route('register')} className="underline ms-1 underline-offset-4">Daftar</Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
