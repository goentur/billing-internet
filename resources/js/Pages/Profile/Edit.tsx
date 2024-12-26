import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import ThemeApp from './Partials/ThemeApp';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const judul = "Profil";
    return (
        <AuthenticatedLayout
            header={judul}
        >
            <Head title={judul} />
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="flex flex-col">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>
                        <div className="flex flex-col">
                            <ThemeApp />
                        </div>
                    </div>
                        <DeleteUserForm />
                </div>
                <div className="flex flex-col">
                    <UpdatePasswordForm />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
