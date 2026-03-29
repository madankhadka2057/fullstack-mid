"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  meta: {
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
  limit: number;
}

export default function PaginationControls({ meta, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams?.toString());
    params.set("limit", newLimit);
    params.set("page", "1"); // Reset to page 1 on limit change
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (meta.totalPages <= maxVisible + 2) {
      for (let i = 1; i <= meta.totalPages; i++) pages.push(i);
    } else {
      if (meta.page <= 3) {
        pages.push(1, 2, 3, 4, "...", meta.totalPages);
      } else if (meta.page >= meta.totalPages - 2) {
        pages.push(
          1,
          "...",
          meta.totalPages - 3,
          meta.totalPages - 2,
          meta.totalPages - 1,
          meta.totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          meta.page - 1,
          meta.page,
          meta.page + 1,
          "...",
          meta.totalPages,
        );
      }
    }
    return pages;
  };

  const createPageUrl = (targetPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", targetPage.toString());
    params.set("limit", limit.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="inline-flex items-center gap-4 bg-white px-2 py-2 rounded-full border shadow-sm">
        {/* Pagination Nav */}
        <div className="flex items-center gap-1 font-medium text-sm">
          {meta.hasPrevPage ? (
            <Link
              href={createPageUrl(meta.page - 1)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          ) : (
            <div className="p-2 text-slate-300">
              <ChevronLeft className="w-5 h-5" />
            </div>
          )}

          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-3 text-slate-400">
                ...
              </span>
            ) : (
              <Link
                key={p}
                href={createPageUrl(p as number)}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                  meta.page === p
                    ? "bg-blue-100 text-blue-600 border border-blue-200 pointer-events-none"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {p}
              </Link>
            ),
          )}

          {meta.hasNextPage ? (
            <Link
              href={createPageUrl(meta.page + 1)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="p-2 text-slate-300">
              <ChevronRight className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Limit Selector */}
        <div className="flex items-center ml-2 border-l pl-4 pr-2 py-1 border-slate-200">
          <select
            value={limit}
            onChange={handleLimitChange}
            className="appearance-none bg-transparent py-1.5 pl-3 pr-8 text-sm outline-none cursor-pointer hover:bg-slate-50 border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-600"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
              backgroundPosition: `right 10px center`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `14px`,
            }}
          >
            {[1, 2, 3, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
