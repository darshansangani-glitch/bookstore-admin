import React, { useEffect, useState } from "react";
import { purchase} from "./PurchaseAdd";
import { useAppSelector } from "../../redux/hooks";
import { api } from "../../utils/api";
import { BookPurchasedItems } from "../../data/CardData";
import { Card } from "../Card";
import PurchaseForm from "./PurchaseForm";
import ReusableTable, { Column } from "../Table";
import PurchaseInsertion from "./PurchaseAdd";

interface Stats {
  booksPurchased: number;
}

const columns: readonly Column<purchase>[] = [
  { id: "book_id", label: "Book Id", minWidth: 150, align: "left" },
  { id: "staff_id", label: "Staff Id", minWidth: 150, align: "left" },
  {
    id: "purchase_status",
    label: "P-Status",
    minWidth: 150,
    align: "left",
  },
  { id: "purchase_date", label: "P-Date", minWidth: 150, align: "left" },
  {
    id: "purchase_quantity",
    label: "Quantity",
    minWidth: 150,
    align: "left",
  },
  { id: "actions", label: "Activities", minWidth: 150, align: "left" },
];

export default function PurchaseTable() {
  const [editPurchaseId, setEditPurchaseId] = React.useState<string | null>(
    null,
  );
  const [editPurchaseData, setEditPurchaseData] =
    React.useState<purchase | null>(null);
  const [purchase, setPurchases] = useState([
    {
      _id: "",
      book_id: "",
      staff_id: "",
      purchase_status: "",
      purchase_date: "",
      purchase_quantity: "",
    },
  ]);
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [total, setTotal] = React.useState(0);

  const handleEdit = (purchase: purchase) => {
    console.log("Edit hurray");
    setEditPurchaseId(purchase._id ? purchase._id : '');
    setEditPurchaseData(purchase);
  };

  const token = useAppSelector(s => s.auth.token)

  const LoadPurchases = async () => {
    try {
      console.log(search)
      const data = await api.get(`/purchase?page=${page + 1}&limit=${rowsPerPage}&search=${search}`, token ? token : '');
      const withIds = data.Purchases.map((item: purchase) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setPurchases(withIds);
      setTotal(data.totalCount);
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };

  const updateRecord = async () => {
    try {
      await api.put(`/purchase/update/${editPurchaseId}`, editPurchaseData, token ? token : '')
      setEditPurchaseId(null);
      setEditPurchaseData(null);
      LoadPurchases();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const deleteRecord = async (row: purchase) => {
    try {
      await api.delete(`/purchase/delete/${row._id}`, token ? token : '')
      setPurchases((prev) => prev.filter((record) => record._id !== row._id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting record:", error);

      return { success: false, error: error };
    }
  };

  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    try {
      fetch("http://localhost:5001/api/stats", { credentials: "include" })
        .then((res) => res.json())
        .then((data: Stats) => setStats(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const statValues = stats ? [stats.booksPurchased] : [null];

  useEffect(() => {
    LoadPurchases();
  }, [search, page]);

  return (
    <div>
      <PurchaseInsertion />

      <div className="flex flex-wrap font-[Poppins]! gap-6 mt-4">
        {BookPurchasedItems.map((item, i) => (
          <Card
            key={item.name}
            item={{ ...item, number: statValues[i] ?? item.number }}
            loading={stats === null}
          />
        ))}
      </div>
      {editPurchaseId && editPurchaseData && (
        <PurchaseForm
          editPurchaseData={editPurchaseData}
          setEditPurchaseData={setEditPurchaseData}
          setEditPurchaseId={setEditPurchaseId}
          updateRecord={updateRecord}
        />
      )}
      <ReusableTable
        columns={columns}
        data={purchase}
        onEdit={handleEdit}
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
      />
    </div>
  );
}
