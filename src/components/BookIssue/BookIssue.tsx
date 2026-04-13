import React, { useEffect, useState } from "react";
import ReusableTable, { Column } from "../Table.js";
import { BookIssuedItems } from "../../data/CardData.js";
import { Card } from "../Card.js";
import { useAppSelector } from "../../redux/hooks.js";
import { api } from "../../utils/api.js";
import BookIssueAdd from "./BookIssueAdd.js";

export interface issue {
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
