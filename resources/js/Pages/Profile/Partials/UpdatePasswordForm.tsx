import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import InfoPassword from '@/Components/ui/info-password';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Loader2, Save } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Ubah Password</CardTitle>
                <CardDescription>
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap ada aman.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={updatePassword} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="current_password" className={errors.current_password && "text-red-500"}>Password lama</Label>
                        <Input
                            id="current_password"
                            name="current_password"
                            ref={currentPasswordInput}
                            type="password"
                            value={data.current_password}
                            placeholder="Masukan password lama"
                            onChange={(e) => setData('current_password', e.target.value)}
                            autoComplete="off"
                            required
                        />
                        {errors.current_password && <div className="text-red-500 text-xs mt-0">{errors.current_password}</div>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className={errors.password && "text-red-500"}>Password Baru</Label>
                        <Input
                            id="password"
                            name="password"
                            ref={passwordInput}
                            type="password"
                            value={data.password}
                            placeholder="Masukan password baru"
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="off"
                            required
                        />
                        {errors.password && <div className="text-red-500 text-xs mt-0">{errors.password}</div>}
                        <InfoPassword/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            placeholder="Ulangi password baru"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>

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
