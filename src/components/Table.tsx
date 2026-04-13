import { FcPrevious, FcNext } from "react-icons/fc";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin4Line, RiEditLine } from "react-icons/ri";

export interface Column<T> {
  id: Extract<keyof T, string> | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: any, row: T) => React.ReactNode;
}

interface ReusableTableProps<T> {
  columns: readonly Column<T>[];
  data: T[];
  title?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onApprove?: (row: T) => void;
  uniqueKey?: keyof T;
  total?: number,
  page?: number,
  search?: string,
  serverSide?: boolean,
  rowsPerPage?: number,
  onPageChange?: (newPage: number) => void,
  onRowsPerPageChange?: (newRows: number) => void,
  onSearch?: (term: string) => void,
}

export default function ReusableTable<
  T extends { _id?: string | number; id?: string | number }
>({
  columns,
  data,
  title,
  searchPlaceholder = "Search...",
  showSearch = true,
  onEdit,
  onDelete,
  uniqueKey = "_id" as keyof T,
  total,
  serverSide,
  page,
  // search,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onSearch
}: ReusableTableProps<T>) {
  const [searchValue, setSearchValue] = React.useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    if (serverSide) {
      if (onSearch) onSearch(value);
    }
  };

  const filteredData = React.useMemo(() => {
    if (serverSide) return data
    if (!searchValue) return data;
    const lowercasedTerm = searchValue.toLowerCase();

    return data.filter((row) => {
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lowercasedTerm),
      );
    });
  }, [data, searchValue, serverSide, data]);

  const displayedData = React.useMemo(() => {
    if (serverSide) return data;
  }, [filteredData, page, rowsPerPage, serverSide, data]);

  const totalCount = serverSide ? total : filteredData.length;
  const totalPages = (totalCount && rowsPerPage) && Math.ceil(totalCount / rowsPerPage);

  const handleChangePage = (newPage: number) => {
    if (serverSide)
      if (onPageChange) onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(event.target.value, 10);
    if (serverSide) {
      if (onRowsPerPageChange) onRowsPerPageChange(newRows);
    };
  }
  return (
    <>
      {(title || showSearch) && (
        <>
          {showSearch && (
            <div className="flex  items-center font-[Poppins]! w-100 h-0 mt-5  p-5 border-[1px solid #e5e5e5]">
              <input
                id="search"
                name="search"
                className="border p-2 pl-3 rounded font-[Poppins]! w-full"
                placeholder={searchPlaceholder}
                aria-label="search data"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <button
                className="p-3 items-center text-gray-400!"
                type="button"
                aria-label="search"
              >
                <FaSearch />
              </button>
            </div>
          )}
        </>
      )}
      <div className=" card  overflow-x-auto font-[Poppins]! mt-5 ">
        <table className="border-0!">
          <thead className="rounded-t-xl!">
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <td
                  //   className="bg-[#f5f5f5]!   "
                  className="text-[18px]! h-14 p-3"
                  key={String(column.id)}
                  align={column.align || "left"}
                  style={{
                    minWidth: column.minWidth,
                    color: "black",
                    fontSize: "20px",
                  }}
                >
                  {column.label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="border border-gray-200">
            {displayedData && displayedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  align="center"
                  style={{ padding: "20px" }}
                >
                  No data available
                </td>
              </tr>
            ) : (
              displayedData && displayedData.map((row) => (
                <tr
                  className=" hover:bg-gray-200!"
                  role="checkbox"
                  tabIndex={-1}
                  key={String(row[uniqueKey] || Math.random())}
                >
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <td

                          key="actions"
                          align={column.align || "left"}
                          className=" p-3 text-[15px]! border-b border-b-gray-300! border-t-0 border-l-0"
                        >
                          {(onEdit || onDelete) && (
                            <div className="flex gap-0.5">
                              {onEdit && (
                                <button
                                  className="w-7 align-center pl-2.5 text-black text-[20px] hover:text-red-500! h-8 rounded shrink-0 flex items-center justify-center"
                                  onClick={() => onEdit(row)}
                                  title="Edit"
                                >
                                  <RiEditLine />
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  className="w-7 align-center pl-2.5 text-red-600 hover:text-red-800 text-[20px] h-8 rounded shrink-0 flex items-center justify-center"
                                  onClick={() => {
                                    if (
                                      confirm(
                                        "Are you sure you want to delete this record?",
                                      )
                                    ) {
                                      onDelete(row);
                                    }
                                  }}
                                  title="Delete"
                                >
                                  <RiDeleteBin4Line />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    }

                    const value = row[column.id as keyof T];

                    return (
                      <td
                        key={String(column.id)}
                        align={column.align || "left"}
                        className={
                          column.id === "description"
                            ? "whitespace-nowrap text-ellipsis border p-3 border-r-0 border-l-0 border-gray-300 border-t-0 overflow-hidden text-[16px]! max-w-43.75"
                            : "p-3 text-[16px] border-b border-b-gray-300 border-r-0!"
                        }
                      >
                        {column.format
                          ? column.format(value, row)
                          : (value as React.ReactNode)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-1 border border-t-0 rounded-b-xl border-slate-200 bg-slate-50/40 flex  justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <select
                  className="p-3 text-slate-400 font-semibold text-[18px] cursor-pointer"
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                >
                  {[10, 20, 50, 100].map((count) => (
                    <option key={count} value={count}>
                      {count} rows
                    </option>
                  ))}
                </select>

              </div>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden lg:block" />
            <div className="text-[18px] font-semibold text-slate-400 font-[poppins] uppercase">
              {total ?? 1 > 0
                ? <><span className="text-slate-600">{(page ??0) * (rowsPerPage ?? 0) + 1} - {Math.min(((page ?? 0) + 1) * (rowsPerPage ?? 10), (total ?? 0))}</span> <span className="mx-1">of</span> <span className="text-slate-600">{total}</span> entries</>
                : "No entries"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleChangePage(Math.max(0, (page ?? 0) - 1))}
              disabled={page === 0}
              className="p-3.5 flex items-center text-slate-400 font-semibold text-[18px] gap-2"
            >
              <FcPrevious size={18} /> Prev
            </button>

            <div className="flex items-center border p-1 font-semibold text-slate-400 rounded-4xl  border-slate-400 text-[18px]!">
              <button
                key={page}
                onClick={() => handleChangePage(page ? page : 0)}
                className="min-w-6 h-6  "
              >
                {page !== undefined && page + 1}
              </button>
            </div>

            <button
              onClick={() => handleChangePage(Math.min((totalPages ?? 0) - 1, page ? + 1 : + 0))}
              disabled={page && page >= (totalPages ? totalPages : 1) - 1 || totalPages === 0}
              className="p-3.5 flex items-center font-semibold text-slate-400 text-[18px] gap-2"
            >
              Next <FcNext size={18} />
            </button>
          </div>
        </div>
      </div >
    </>
  );
}
