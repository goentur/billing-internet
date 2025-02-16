import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

interface DataInfo {
    from: number;
    to: number;
    totalRecords: number;
    currentPage: number;
}

interface LinkPagination {
    label: string;
    url: string | null;
    active: boolean;
}

interface PaginationControlsProps {
    dataInfo: DataInfo;
    setDataInfo: React.Dispatch<React.SetStateAction<any>>;
    linksPagination: LinkPagination[];
}

export default function PaginationControls({
    dataInfo,
    setDataInfo,
    linksPagination
}: PaginationControlsProps) {
    return (
        <div className="flex justify-between items-center mt-4">
            <span className="text-sm">
                Menampilkan {dataInfo.from??0} sampai {dataInfo.to??0} dari {dataInfo.totalRecords} data
            </span>
            <div className="flex items-center space-x-1">
                <Pagination>
                    <PaginationContent>
                        {linksPagination.map((item, index) => (
                            <PaginationItem key={index}>
                                {item.label.includes("Previous") ? (
                                    <PaginationPrevious
                                        disabled={!item.url}
                                        onClick={() => setDataInfo((prev:any) => ({
                                            ...prev,
                                            currentPage: prev.currentPage - 1
                                        }))}
                                    />
                                ) : item.label.includes("Next") ? (
                                    <PaginationNext
                                        onClick={() => setDataInfo((prev:any) => ({
                                            ...prev,
                                            currentPage: prev.currentPage + 1
                                        }))}
                                        disabled={!item.url}
                                    />
                                ) : item.label === "..." ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        isActive={item.active}
                                        onClick={() => setDataInfo((prev:any) => ({
                                            ...prev,
                                            currentPage: Number(item.label)
                                        }))}
                                    >
                                        {item.label}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}