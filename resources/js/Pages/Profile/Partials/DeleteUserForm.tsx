import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { useForm } from '@inertiajs/react';
import { CheckCheck, Loader2, OctagonX, X } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Hapus Akun</CardTitle>
                <CardDescription className="text-justify">
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun Anda, silakan unduh data atau informasi apa pun yang Anda inginkan mempertahankan.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" onClick={confirmUserDeletion}><OctagonX /> Hapus Akun</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <form onSubmit={deleteUser} className='space-y-5'>
                            <DialogHeader>
                                <DialogTitle className='text-xl'>Apakah Anda yakin?</DialogTitle>
                                <DialogDescription className="text-justify">
                                    Setelah akun Anda dihapus, semua data akan dihapus secara permanen. Silakan masukkan password Anda untuk mengkonfirmasi bahwa Anda ingin menghapus.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid gap-2 w-full">
                                    <Input
                                        id="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        type="password"
                                        placeholder="Masukan password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="off"
                                        required
                                    />
                                    {errors.password && <div className="text-red-500 text-xs mt-0">{errors.password}</div>}
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-start gap-4">
                                <Button type="button" onClick={closeModal}>
                                    <X /> Tidak
                                </Button>
                                <Button type="submit" variant="destructive" disabled={processing}>
                                    {processing ? <Loader2 className="animate-spin" /> : <CheckCheck />} Ya
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
