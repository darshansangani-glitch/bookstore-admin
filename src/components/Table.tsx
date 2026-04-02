import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
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
}

export default function ReusableTable<
  T extends { _id?: string | number; id?: string | number },
>({
  columns,
  data,
  title,
  searchPlaceholder = "Search...",
  showSearch = true,
  onEdit,
  onDelete,
  uniqueKey = "_id" as keyof T,
}: ReusableTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    const lowercasedTerm = searchTerm.toLowerCase();

    return data.filter((row) => {
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lowercasedTerm),
      );
    });
  }, [data, searchTerm]);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
      {(title || showSearch) && (
        <Box sx={{ width: "100%", margin: "50px auto" }}>
          {title && (
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          )}
          {showSearch && (
            <div className="flex  items-center-safe font-[Poppins]!  h-0 w-70  border-[1px solid #e5e5e5]">
              <InputBase
                className="border p-1 pl-2 rounded font-[Poppins]!"
                sx={{ flex: 1 }}
                placeholder={searchPlaceholder}
                inputProps={{ "aria-label": "search data" }}
                value={searchTerm}
                onChange={handleSearchChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      className="pl-2 rounded text-[20px]!  text-gray-400!"
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <FaSearch />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          )}
        </Box>
      )}
      <div className="card overflow-x-auto font-[Poppins]! mt-16">
        <table className="border border-gray-200!">
          <thead >
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <td
                //   className="bg-[#f5f5f5]!   "
                className="text-[18px]! p-3"
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
          <tbody>
            {displayedData.length === 0 ? (
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
              displayedData.map((row) => (
                <tr
                  className="border-b hover:bg-gray-200!"
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
                            ? "whitespace-nowrap text-ellipsis border p-3 border-r-0 border-l-0 border-gray-300 overflow-hidden text-[16px]! max-w-43.75"
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
