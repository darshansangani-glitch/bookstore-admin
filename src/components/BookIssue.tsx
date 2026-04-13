import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import ReusableTable, { Column } from "./Table.js";
import { BookIssuedItems } from "../data/CardData.js";
import { Card } from "./Card.js";
import { useAppSelector } from "../redux/hooks.js";
import { api } from "../utils/api.js";

interface issue {
  _id: string;
  issuer_id: string;
  request_id: string;
  issue_date: string;
  return_date: string;
  book_status: string;
}

interface Stats {
  booksIssued: number;
  booksRequested: number;
}

const columns: readonly Column<issue>[] = [
  { id: "issuer_id", label: "Issuer ID", minWidth: 150, align: "left" },
  { id: "request_id", label: "Request Id", minWidth: 150, align: "left" },
  { id: "issue_date", label: "Issue Date", minWidth: 150, align: "left" },
  { id: "return_date", label: "Return Date", minWidth: 150, align: "left" },
  { id: "book_status", label: "Book Status", minWidth: 150, align: "left" },
  { id: "actions", label: "Actions", minWidth: 150, align: "left" },
];

export function BookIssueAdd() {
  const [addIssue, setAddIssue] = React.useState(false);
  const [issueData, setIssueData] = React.useState({
    request_id: "",
  });

  const handleForm = async () => {
    setAddIssue((prev) => !prev);
  };

  const token = useAppSelector(state => state.auth.token)

  const addBookData = async () => {
    try {
      console.log(issueData)
      const data = await api.post('/book-issued/add', issueData, token ? token : '')
      setIssueData(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <Typography className="text-4xl!" variant="h3">
          <span className="text-red-500">Book Issue</span> Inventory
        </Typography>
        <Typography variant="body1">
          Manage your book Issues inventory
        </Typography>
      </div>
      {addIssue && (
        <div className="text-red-500">
          <form
            className="w-132.5 h-55.25 top-50 left-110 border right-50 absolute bg-white flex flex-col p-5 rounded-2xl items-center z-20"
            style={{ display: addIssue ? "flex" : "none" }}
          >
            <Typography
              className="w-full flex justify-center  border-b! border-b-gray-300!"
              variant="h4"
              style={{ fontSize: "40px", borderBottom: "2px solid white" }}
            >
              Book Add Form
            </Typography>
            <div className="p-7 pt-3 ml-auto mr-auto">
              <TextField
                id="standard-basic"
                label="Book Name"
                name={issueData.request_id}
                className="text-[20px] w-110 mb-2 mt-3"
                onChange={(e) => {
                  setIssueData((prev) => ({
                    ...prev,
                    request_id: e.target.value,
                  }));
                }}
                variant="standard"
              />
              <div className="w-110 flex justify-between mt-5">
                <Button variant="text" onClick={handleForm}>
                  Cancel
                </Button>

                <Button variant="contained" onClick={() => addBookData()}>
                  Approve Issue
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      <button
        className="flex text-amber-50 w-40 items-center pl-8 pr-2 bg-sky-500 h-10 mr-5 rounded"
        onClick={handleForm}
      >
        Approve Issue
      </button>
    </div>
  );
}

export default function IssueBooksTable() {

  const [issues, setIssues] = React.useState<issue[]>([
    {
      _id: "",
      issuer_id: "",
      request_id: "",
      issue_date: "",
      return_date: "",
      book_status: "",
    },
  ]);

  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/stats", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Stats) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const statValues = stats
    ? [stats.booksIssued, stats.booksRequested]
    : [null, null, null, null, null];

  const token = useAppSelector(s => s.auth.token)

  const LoadIssues = async () => {
    try {
      const data = await api.get('/book-issued', token ? token : '');
      const withIds = data.Book_issue.map((item: issue) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setIssues(withIds);
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };


  const deleteRecord = async (row: issue) => {
    try {
      await api.delete(`/book-issued/delete/${row._id}`, token ? token : '')
      LoadIssues();
      setIssues((prev) => prev.filter((record) => record._id !== row._id));

      return { success: true };
    } catch (error) {
      console.error("Error deleting record:", error);

      return { success: false, error: error };
    }
  };

  React.useEffect(() => {
    LoadIssues();
  }, []);

  return (
    <>
      <BookIssueAdd />
      <div className="flex flex-wrap font-[Poppins]! gap-6 mt-4">
        {BookIssuedItems.map((item, i) => (
          <Card
            key={item.name}
            item={{ ...item, number: statValues[i] ?? item.number }}
            loading={stats === null}
          />
        ))}
      </div>
      <div>
        <ReusableTable
          columns={columns}
          data={issues}
          onDelete={deleteRecord}
          searchPlaceholder="Search Books..."
        />
      </div>
    </>
  );
}
