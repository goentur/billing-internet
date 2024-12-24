import InfoPassword from '@/Components/ui/info-password';
import { Label } from '@/Components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Loader2, Save } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
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
        // <section className={className}>
        //     <header>
        //         <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        //             Update Password
        //         </h2>

        //         <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        //             Ensure your account is using a long, random password to stay
        //             secure.
        //         </p>
        //     </header>

        //     <form onSubmit={updatePassword} className="mt-6 space-y-6">
        //         <div>
        //             <InputLabel
        //                 htmlFor="current_password"
        //                 value="Current Password"
        //             />

        //             <TextInput
        //                 id="current_password"
        //                 ref={currentPasswordInput}
        //                 value={data.current_password}
        //                 onChange={(e) =>
        //                     setData('current_password', e.target.value)
        //                 }
        //                 type="password"
        //                 className="mt-1 block w-full"
        //                 autoComplete="current-password"
        //             />

        //             <InputError
        //                 message={errors.current_password}
        //                 className="mt-2"
        //             />
        //         </div>

        //         <div>
        //             <InputLabel htmlFor="password" value="New Password" />

        //             <TextInput
        //                 id="password"
        //                 ref={passwordInput}
        //                 value={data.password}
        //                 onChange={(e) => setData('password', e.target.value)}
        //                 type="password"
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div>
        //             <InputLabel
        //                 htmlFor="password_confirmation"
        //                 value="Confirm Password"
        //             />

        //             <TextInput
        //                 id="password_confirmation"
        //                 value={data.password_confirmation}
        //                 onChange={(e) =>
        //                     setData('password_confirmation', e.target.value)
        //                 }
        //                 type="password"
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //             />

        //             <InputError
        //                 message={errors.password_confirmation}
        //                 className="mt-2"
        //             />
        //         </div>

        //         <div className="flex items-center gap-4">
        //             <PrimaryButton disabled={processing}>Save</PrimaryButton>

        //             <Transition
        //                 show={recentlySuccessful}
        //                 enter="transition ease-in-out"
        //                 enterFrom="opacity-0"
        //                 leave="transition ease-in-out"
        //                 leaveTo="opacity-0"
        //             >
        //                 <p className="text-sm text-gray-600 dark:text-gray-400">
        //                     Saved.
        //                 </p>
        //             </Transition>
        //         </div>
        //     </form>
        // </section>
    );
}
