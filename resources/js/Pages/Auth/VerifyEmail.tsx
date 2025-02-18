import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardHeader
} from "@/Components/ui/card";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2, LogOut, Send } from 'lucide-react';
import { FormEventHandler } from 'react';
export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />
            <Card>
                <CardHeader className="text-justify text-sm">
                    Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirim ke email Anda? Jika Anda tidak menerima email, kami dengan senang hati akan mengirimkan kembali kepada Anda.
                </CardHeader>
                <CardContent>
                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            Tautan verifikasi baru telah dikirim ke alamat email Anda yang diberikan saat pendaftaran.
                        </div>
                    )}
                    
                    <form onSubmit={submit}>
                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? <Loader2 className="animate-spin" /> : <Send/>} Kirim Ulang Email Verifikasi
                        </Button>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Atau
                            </span>
                        </div>
                        <Button asChild className='mt-2 w-full'>
                            <Link href={route('logout')} method="post"><LogOut/> Logout</Link>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
