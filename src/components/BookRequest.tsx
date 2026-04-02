import { useEffect, useState } from "react";
import ReusableTable, { Column } from "./Table.js";
import { BookRequestedItems } from "../data/CardData.js";
import { Card } from "./Card.js";

interface bookRequest {
  _id: string;
  user_id: string;
  book_id:string,
  book_name: string;
  timestamp: string;
  req_status: string;
}


interface Stats {
  booksRequested: number;
}

const columns: readonly Column<bookRequest>[] = [
  { id: "user_id", label: "User Id", minWidth: 150, align: "left" },
  { id: "book_name", label: "Book Name", minWidth: 150, align: "left" },
  { id: "timestamp", label: "TimeStamp", minWidth: 150, align: "left" },
  { id: "req_status", label: "Request Status", minWidth: 150, align: "left" },
  { id: "actions", label: "Activity", minWidth: 150, align: "left" },
];

export function BookRequest() {
  const [addBookIssue, setAddBookIssue] = useState(false);
  const [issueData, setIssueData] = useState({
    request_id: "",
  });

  const handleForm = async () => {
    setAddBookIssue((prev) => !prev);
  };

  const token = localStorage.getItem("token-info");

  const addIssueData = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/book-issued/add`;
      const response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
        body: JSON.stringify(issueData),
      })
        .then((res) => res.json())
        .then((data) => {
          setIssueData(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="book-add-container font-[Poppins]!">
      <button className="book-add-btn" onClick={handleForm}>
        Approve Book
      </button>
      <div className="form-add-container font-[Poppins]!">
        <form
          className="book-add-form"
          style={{ display: addBookIssue ? "flex" : "none" }}
        >
          <label htmlFor="bookName">
            Book Id
            <input
              type="text"
              name={issueData.request_id}
              id={issueData.request_id}
              placeholder="Enter the Request ID"
              onChange={(e) =>
                setIssueData((prev) => ({
                  ...prev,
                  request_id: e.target.value,
                }))
              }
            />
          </label>
          <div className="form-add-btn">
            <button onClick={handleForm}>Cancel</button>
            <button onClick={addIssueData}>Purchase</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function BookRequestShow() {
  const token = localStorage.getItem("token-info");

  const [request, setRequests] = useState([
    {
      _id: "",
      user_id: "",
      book_id:"",
      book_name: "",
      timestamp: "",
      req_status: "",
    },
  ]);

  const LoadRequests = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/request`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token ? ` ${token}` : "",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const withIds = await data.Requests.map((item: bookRequest) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setRequests(withIds);
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };

  const approveRequest = async (req: bookRequest) => {
    if (req.req_status !== "Pending") return;
    try {
      const url = `${import.meta.env.VITE_API_URL}/book-issued/add`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
        body: JSON.stringify({
          request_id: req._id,
          book_id: req.book_id,
          book_status: "Issued",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to approve the request");
      }
      const result = response.json();

      LoadRequests();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const deleteRecord = async (row: bookRequest) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/request/delete/${row._id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the record");
      }
      console.log("deleted record");
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
    LoadRequests();
    console.log("ssdnfbsnfbs");
  }, []);

  return (
    <>
      <div className=" w-full pt-20!   ml-auto p-5">
        <div className="bg-white  w-full! flex h-20 font-[Poppins]!  ml-auto items-center justify-between relative">
          <div className="">
            <h1 className="text-4xl">
              <span className="text-red-500">User Requests</span> Inventory
            </h1>
            <p className="text-[15px]">Manage your Requests from User's</p>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap font-[Poppins]! gap-6 mt-4">
            {BookRequestedItems.map((item, i) => (
              <Card
                key={item.name}
                item={{ ...item, number: statValues[i] ?? item.number }}
                loading={stats === null}
              />
            ))}
          </div>
          <ReusableTable
            columns={columns}
            data={request}
            onApprove={approveRequest}
            onDelete={deleteRecord}
            searchPlaceholder="Search Books..."
          />
        </div>
      </div>
    </>
  );
}
