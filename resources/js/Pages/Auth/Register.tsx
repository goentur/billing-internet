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
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2, Save } from 'lucide-react';
import { FormEventHandler } from 'react';


export default function Register() {
    const { setData, post, processing, errors } = useForm({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Registrasi" />
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Registrasi</CardTitle>
                            <CardDescription>
                                Silahkan masukan data diri Anda
                            </CardDescription>
                        </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} method="post">
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className={errors.name && "text-red-500"}>Nama</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className={errors.name && "border-red-500"}
                                            placeholder="Masukan nama"
                                            autoFocus={true}
                                            onChange={(e:any) => setData('name', e.target.value)}
                                            autoComplete="off"
                                            required
                                        />
                                        {errors.name && <div className="text-red-500 text-xs mt-0">{errors.name}</div>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className={errors.email && "text-red-500"}>Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={errors.email && "border-red-500"}
                                            placeholder="Masukan email"
                                            autoComplete="username"
                                            onChange={(e:any) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <div className="text-red-500 text-xs mt-0">{errors.email}</div>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className={errors.password && "text-red-500"}>Password</Label>
                                        <Input 
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Masukan password"
                                            onChange={(e:any) => setData('password', e.target.value)}
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
                                            onChange={(e:any) => setData('password_confirmation', e.target.value)}
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing} className="w-full">
                                        {processing ? <Loader2 className="animate-spin" /> : <Save/>} Daftar
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Sudah punya akun?<Link href={route('login')} className="underline ms-1 underline-offset-4">Login</Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                    Dengan mengklik daftar, Anda menyetujui <a href="#">Terms of Service</a> dan <a href="#">Privacy Policy</a> kami.
                </div>
            </div>
            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
