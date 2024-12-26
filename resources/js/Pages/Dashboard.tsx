import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const judul = "Dashboard"
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    You're logged in!
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
