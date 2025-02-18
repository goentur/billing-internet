import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardHeader
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Loader2, Send } from "lucide-react";
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password" />
            <Card>
                <CardHeader className="text-justify text-sm">
                    Ini adalah area aplikasi yang aman. Harap konfirmasi password Anda sebelum melanjutkan.
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
                            </div>
                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? <Loader2 className="animate-spin" /> : <Send/>} Konfirmasi
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
