import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Loader2, OctagonX, Save } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/components/ui/input';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
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

    return (<>
        <CardHeader>
            <CardTitle className="text-xl">Hapus Akun</CardTitle>
            <CardDescription className="text-justify">
                Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun Anda, silakan unduh data atau informasi apa pun yang Anda inginkan mempertahankan.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {/* <Button variant="destructive" onClick={confirmUserDeletion}>
                <OctagonX/> Delete Account
            </Button> */}
            <Dialog open={confirmingUserDeletion} >
                <DialogTrigger asChild>
                    <Button variant="destructive" onClick={confirmUserDeletion}><OctagonX/> Delete Account</Button>
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
                                    placeholder="Masukan password baru"
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-0">{errors.password}</div>}
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <Button type="submit" disabled={processing}>
                                {processing ? <Loader2 className="animate-spin" /> : <OctagonX/>} Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </CardContent>
        <Modal show={confirmingUserDeletion} onClose={closeModal}>
            <form onSubmit={deleteUser} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete your account?
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and
                    data will be permanently deleted. Please enter your
                    password to confirm you would like to permanently delete
                    your account.
                </p>

                <div className="mt-6">
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="sr-only"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="Password"
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2"
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ms-3" disabled={processing}>
                        Delete Account
                    </DangerButton>
                </div>
            </form>
        </Modal>
    </>);
}
