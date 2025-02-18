import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import InfoPassword from "@/Components/ui/info-password";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Loader2, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>
                        Silahkan masukan password Anda yang baru
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} method="post">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="password" className={errors.password && "text-red-500"}>Password</Label>
                                <Input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Masukan password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-0">{errors.password}</div>}
                                <InfoPassword/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                <Input 
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Ulangi password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? <Loader2 className="animate-spin" /> : <Save/>} Simpan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
