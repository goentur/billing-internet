
import { AppSidebar } from "@/Components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/Components/ui/breadcrumb";
import { Separator } from "@/Components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/toaster";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  useEffect(() => {
      const savedMode = localStorage.getItem("theme");
      const isDarkMode = savedMode !== "light"; // Default to dark if no value exists
      document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block font-semibold">
                  <Link href={route('dashboard')}>
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{header}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </SidebarInset>
      <Toaster/>
    </SidebarProvider>
  )
}
