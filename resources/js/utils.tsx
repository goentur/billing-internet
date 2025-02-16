import { toast } from "@/hooks/use-toast";

export const alertApp = (e: any, type: 'error' | null = null) => {
    const message = e.props?.flash ?? e;
    const isMessageObject = typeof message === 'object' && message !== null;
    const isError = type === "error" || (isMessageObject && message.error);

    toast({
        variant: isError ? "destructive" : "default",
        title: isError ? "Galat" : "Selamat",
        description: isMessageObject 
            ? message.success ?? message.error ?? "Terjadi kesalahan pada saat proses data"
            : message,
    });
};
export const formatUang = (angka:string) => {
    return parseFloat(angka)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

