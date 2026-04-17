import React, { useEffect, useState } from "react";
import { addDays } from 'date-fns';
import ReusableTable, { Column } from "../Table.js";
import { BookRequestedItems } from "../../data/CardData.js";
import { Card } from "../Card.js";
import { useAppSelector } from "../../redux/hooks.js";
import { api } from "../../utils/api.js";
import { Range } from 'react-date-range';

interface bookRequest {
  _id: string;
  user_id: string;
  book_id: string,
  book_name: string;
  timestamp: string;
  req_status: string;
}

export interface DateState {
  startDate: Date,
  endDate: Date,
  key?: string
}

interface Stats {
  booksRequested: number;
}

const columns: readonly Column<bookRequest>[] = [
  { id: "_id", label: "Request Id", minWidth: 20, align: "left" },
  { id: "user_id", label: "User Id", minWidth: 20, align: "left" },
  { id: "book_id", label: "Book Id", minWidth: 20, align: "left" },
  { id: "timestamp", label: "Request Date", minWidth: 20, align: "left" },
  { id: "req_status", label: "Request Status", minWidth: 20, align: "left" },
  { id: "actions", label: "Activity", minWidth: 20, align: "left" },
];


export default function BookRequestShow() {
  const token = useAppSelector(s => s.auth.token)
  
  const [request, setRequests] = useState([
    {
      _id: "",
      user_id: "",
      book_id: "",
      book_name: "",
      timestamp: "",
      req_status: "",
    },
  ]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [search, setSearch] = React.useState<string>("");
  const [total, setTotal] = React.useState<number>(0);
  const [status, setStatus] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false);
  const getLocalDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };
  const [dateState, setDateState] = React.useState<Range[]>([{
    startDate: getLocalDate(new Date()),
    endDate: getLocalDate(addDays(new Date(), 7)),
    key: 'selection',
  }])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const startDate = dateState[0].startDate?.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const endDate = dateState[0].endDate?.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      console.log('start Date', startDate)
      const data = await api.get(`/request?page=${page + 1}&limit=${rowsPerPage}&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, token ? token : '');
      const withIds = data.Requests.map((item: bookRequest) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setRequests(withIds);
      setTotal(data.totalCount)
      setLoading(false)
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };

  // const approveRequest = async (req: bookRequest) => {
  //   if (req.req_status !== "Pending") return;
  //   try {
  //     const url = `${import.meta.env.VITE_API_URL}/book-issued/add`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token ? ` ${token}` : "",
  //       },
  //       body: JSON.stringify({
  //         request_id: req._id,
  //         book_id: req.book_id,
  //         book_status: "Issued",
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to approve the request");
  //     }
  //     const result = response.json();

  //     loadRequests();
  //   } catch (error) {
  //     console.error("Error approving request:", error);
  //   }
  // };

  const deleteRecord = async (row: bookRequest) => {
    try {
      await api.delete(`/request/delete/${row._id}`, token ? token : '')
      setRequests((prev) => prev.filter((record) => record._id !== row._id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting record:", error);

      return { success: false, error: error };
    }
  };

  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/stats", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Stats) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const statValues = stats ? [stats.booksRequested] : [null];

  useEffect(() => {
    loadRequests();
  }, [search, page, status, dateState]);


  return (
    <>
      <div className="w-full! box-border! h-full  items-center justify-between relative ">

        <div className=" box-border! w-full! flex justify-between font-[Poppins]! items-center ">
          <div>
            <h1 className="text-2xl">
              <span className="text-red-500">Book Request</span> Inventory
            </h1>
            <p className="text-[15px]">Manage your books inventory</p>
          </div>
        </div>
        <div className="flex box-border! flex-wrap font-[Poppins]! gap-6 mt-4">
          {BookRequestedItems.map((item, i) => (
            <Card
              key={item.name}
              item={{ ...item, number: statValues[i] ?? item.number }}
              loading={stats === null}
            />
          ))}
        </div>
        <div className="w-full! box-border! h-screen">
          <ReusableTable
            columns={columns}
            data={request}
            // onApprove={approveRequest}
            onDelete={deleteRecord}
            searchPlaceholder="Search Books..."
            serverSide={true}
            total={total}
            page={page}
            search={search}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage: number) => setPage(newPage)}
            onRowsPerPageChange={(newRows: number) => {
              setRowsPerPage(newRows);
              setPage(0);
            }}
            onSearch={(term: string) => {
              setSearch(term);
              setPage(0);
            }}
            onCategory={(term: string) => {
              setStatus(term);
              setPage(0);
            }}
            uniqueCategory={['Pending', "Approved", "Rejected"]}
            loading={loading}
            setDateState={setDateState}
            state={dateState}
          />
        </div>
      </div>

    </>
  );
}
