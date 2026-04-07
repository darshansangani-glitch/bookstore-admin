import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ReusableTable, { Column } from "./Table.js";
import { BookPurchasedItems } from "../data/CardData.js";
import { Card } from "./Card.js";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import PurchaseEditForm from "./PurchaseEditForm.js";
import { useAppSelector } from "../redux/hooks/hooks.js";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

interface purchase {
  _id: string;
  book_id: string;
  staff_id: string;
  purchase_status: string;
  purchase_date: string;
  purchase_quantity: string;
}

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

export function PurchaseInsertion() {
  const [addPurchase, setAddPurchase] = React.useState(false);
  const [purchaseData, setPurchaseData] = React.useState({
    book_id: "",
    purchase_quantity: "",
  });

  // const token = useAppSelector(s=>s.auth.token)
  const token = useAppSelector((state) => state.auth.token)

 
 const decodedPayload = jwtDecode(token ?? "") as CustomJwtPayload;

  const userRole = decodedPayload.role;
  const handleForm = async () => {
    setAddPurchase((prev) => !prev);
  };

  const addPurchaseData = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/purchase/add`;

      const response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
        body: JSON.stringify(purchaseData),
      })
        .then((res) => res.json())
        .then((data) => {
          setPurchaseData(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userRole === "Admin" ? (
        <div className="w-full! flex h-20 font-[Poppins]! items-center justify-between relative">
          <div className="">
            <h1 className="text-4xl">
              <span className="text-red-500">Purchase</span> Inventory
            </h1>
            <p className="text-[15px]">Manage your Purchase inventory</p>
            <form
              className="w-132.5 h-65.25 -bottom-80 left-80 border right-50 absolute bg-white flex flex-col p-5 rounded-2xl items-center z-20"
              style={{ display: addPurchase ? "flex" : "none" }}
            >
              <Typography
                variant="h4"
                style={{ fontSize: "40px", borderBottom: "2px solid white" }}
              >
                Purchase Form
              </Typography>

              <TextField
                id="standard-basic"
                label="Book ID"
                name={purchaseData.book_id}
                className="text-[20px] w-110 mb-2 mt-3"
                onChange={(e) => {
                  setPurchaseData((prev) => ({
                    ...prev,
                    book_id: e.target.value,
                  }));
                }}
                variant="standard"
              />
              <TextField
                id="standard-multiline-static"
                label="Purchase Quantity"
                name={purchaseData.purchase_quantity}
                className="text-[20px] w-110 mb-3"
                variant="standard"
                onChange={(e) => {
                  setPurchaseData((prev) => ({
                    ...prev,
                    purchase_quantity: e.target.value,
                  }));
                }}
              />
              <div className="w-110 flex justify-between mt-5">
                <Button variant="text" onClick={handleForm}>
                  Cancel
                </Button>

                <Button variant="contained" onClick={addPurchaseData}>
                  Purchase
                </Button>
              </div>
            </form>
          </div>
          <button
            className="flex text-amber-50 w-40 text-[17px]! items-center justify-center bg-sky-500 h-10 mr-5 hover:bg-sky-800 rounded"
            onClick={handleForm}
          >
            Purchase Book
          </button>
        </div>
      ) : (
        <div className="bg-white  w-full! flex h-20 m  ml-auto items-center justify-between relative">
          <div className="">
            <h1 className="text-4xl">
              <span className="text-red-500">Purchase</span> Inventory
            </h1>
            <p className="text-[15px]">Manage your Purchase inventory</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function PurchaseDataShow() {
  const [form, setForm] = React.useState(false);
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
  const handleEdit = (purchase: purchase) => {
    console.log("Edit hurray");
    setEditPurchaseId(purchase._id);
    setEditPurchaseData(purchase);
  };

  const token = useAppSelector(s => s.auth.token)

  const LoadPurchases = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/purchase`;

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
      const withIds = data.Purchase.map((item: purchase) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setPurchases(withIds);
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };

  const updateRecord = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/purchase/update/${editPurchaseId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
        body: JSON.stringify(editPurchaseData),
      });
      if (!response.ok) {
        throw new Error("Failed to update the record");
      }

      setEditPurchaseId(null);
      setEditPurchaseData(null);
      LoadPurchases();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const deleteRecord = async (row: purchase) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/purchase/delete/${row._id}`;
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
  }, []);

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
        <PurchaseEditForm
          editPurchaseData={editPurchaseData}
          setEditPurchaseData={setEditPurchaseData}
          setEditPurchaseId={setEditPurchaseId}
          updateRecord={updateRecord}
          component="main"
        />
      )}
      <ReusableTable
        columns={columns}
        data={purchase}
        onEdit={handleEdit}
        onDelete={deleteRecord}
        searchPlaceholder="Search Books..."
      />
    </div>
  );
}
