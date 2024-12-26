import { Link } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { PropsWithChildren, useEffect } from 'react';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export default function Guest({ children }: PropsWithChildren) {
    useEffect(() => {
        const savedMode = localStorage.getItem("theme");
        const isDarkMode = savedMode !== "light"; // Default to dark if no value exists
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, []);
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href={route('/')} className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Globe className="size-6" />
                    </div>
                    <span className='text-2xl uppercase'>{appName}</span>
                </Link>
                {children}
            </div>
        </div>
    );
}
