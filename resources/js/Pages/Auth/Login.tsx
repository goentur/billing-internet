import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2, LogIn } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Selamat Datang</CardTitle>
                    <CardDescription>
                        Silahkan masuk untuk melanjutkan
                    </CardDescription>
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
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                            >
                                            Lupa password?
                                            </Link>
                                        )}
                                    </div>
                                    <Input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Masukan password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    {errors.password && <div className="text-red-500 text-xs mt-0">{errors.password}</div>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        onChange={(e) => setData('password', e.target.checked)}
                                    />
                                    <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >Ingat saya</label>
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? <Loader2 className="animate-spin" /> : <LogIn/>} Masuk
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
