import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import ReusableTable, { Column } from "./Table.js";
import { Card } from "./Card.js";
import { BookItems } from "../data/CardData.js";
import BookEditForm from "./BookEditForm.js";

interface book {
  _id: string;
  book_name: string;
  quantity: string;
  description: string;
  author: string;
  category: string;
  shelf_name: string;
  book_image: File | null;
}

interface Stats {
  totalBooks: number;
  totalQuantity: number;
}

const columns: readonly Column<book>[] = [
  { id: "book_name", label: "Book Name", minWidth: 20, align: "left" },
  { id: "description", label: "Description", minWidth: 20, align: "left" },
  { id: "author", label: "Author", minWidth: 20, align: "left" },
  { id: "category", label: "Category", minWidth: 20, align: "left" },
  { id: "shelf_name", label: "Shelf name", minWidth: 20, align: "left" },
  { id: "quantity", label: "Quantity", minWidth: 20, align: "left" },
  { id: "actions", label: "Activities", minWidth: 20, align: "left" },
];

export function BookAdd() {
  const [addBook, setAddBook] = React.useState(false);
  const [bookData, setBookData] = React.useState<book>({
    _id: "",
    book_name: "",
    quantity: "",
    description: "",
    author: "",
    category: "",
    shelf_name: "",
    book_image: null,
  });

  const handleForm = async () => {
    setAddBook((prev) => !prev);
  };

  const token = localStorage.getItem("token-info");

  // const toBase64 = uInt8Array => btoa(String.fromCharCode(...uInt8Array));

  const addBookData = async () => {
    try {
      const data = document.getElementById("Book_add_form") as HTMLFormElement;
      if (data) {
        const formData = new FormData(data);
        // formData.append("book_name", this.book_name);
        // formData.append("description", this.description);
        // formData.append("author", this.author);
        // formData.append("category", this.category);
        // formData.append("shelf_name", this.shelf_name);
        // formData.append("quantity", this.quantity);
        // formData.append("book_image", this.book_image);
        console.log(formData);
        const url = `${import.meta.env.VITE_API_URL}/book/add`;
        console.log(url);
        const response = fetch(url, {
          method: "POST",
          headers: {
            Authorization: token ? ` ${token}` : "",
          },
          body: formData,
        });
        console.log(response);

        const result = (await response).json();
        setBookData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between font-[Poppins]! items-center">
      <div>
        <h1 className="text-4xl">
          <span className="text-red-500">Book</span> Inventory
        </h1>
        <p className="text-[15px]">Manage your books inventory</p>
      </div>
      {addBook && (
        <div className=" text-red-400">
          <form
            id="Book_add_form"
            className="w-132.5 h-115.25 top-10 left-60 border right-50 absolute bg-white flex flex-col pt-5 rounded-2xl items-center z-20"
            style={{ display: addBook ? "flex" : "none" }}
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
                name="book_name"
                className="text-[20px] w-full! mb-2 mt-3"
                onChange={(e) => {
                  setBookData((prev) => ({
                    ...prev,
                    book_name: e.target.value,
                  }));
                }}
                variant="standard"
              />
              <TextField
                id="standard-multiline-static"
                label="Description"
                name="description"
                multiline
                className="text-[20px] w-full mb-3"
                rows={4}
                variant="standard"
                onChange={(e) => {
                  setBookData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
              <div className="flex gap-10 mb-3 mt-3">
                <TextField
                  id="standard-basic"
                  className="text-[20px] w-[50%] mb-3"
                  label="Author"
                  name="author"
                  onChange={(e) => {
                    setBookData((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }));
                  }}
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  className="text-[20px] w-[50%] mb-3"
                  label="Category"
                  name="category"
                  onChange={(e) => {
                    setBookData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));
                  }}
                  variant="standard"
                />
              </div>

              <div className="flex w-full! gap-10 items-baseline mb-3">
                <TextField
                  id="standard-basic"
                  label="Shelf Name"
                  className="w-[50%]!"
                  name="shelf_name"
                  onChange={(e) => {
                    setBookData((prev) => ({
                      ...prev,
                      shelf_name: e.target.value,
                    }));
                  }}
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="Quantity"
                  className="w-[50%]!"
                  name="quantity"
                  onChange={(e) => {
                    setBookData((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }));
                  }}
                  variant="standard"
                />
              </div>
              <label htmlFor="File">
                BookCover
                <input
                  type="file"
                  name="book_image"
                  id="book_image"
                  onChange={(e) => {
                    const target = e.target;

                    if (target && target.files && target.files.length > 0) {
                      setBookData((prev) => ({
                        ...prev,
                        book_image: target.files[0],
                      }));
                    }
                  }}
                />
              </label>
              <div className="w-full! flex justify-between mt-5">
                <Button variant="text" onClick={handleForm}>
                  Cancel
                </Button>

                <Button variant="contained" onClick={addBookData}>
                  Add Book
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      <button
        className="flex text-amber-50 w-30 items-center justify-center bg-sky-500 h-10 mr-5 rounded"
        onClick={handleForm}
      >
        Add Book
      </button>
    </div>
  );
}

export default function BooksTable() {
  const [editBookId, setEditBookId] = React.useState<string | null>(null);
  const [editBookData, setEditBookData] = React.useState<book | null>(null);

  const handleEdit = (book: book) => {
    setEditBookId(book._id);
    setEditBookData(book);
  };

  const [books, setBooks] = React.useState<book[]>([
    {
      _id: "",
      book_name: "",
      quantity: "",
      description: "",
      author: "",
      category: "",
      shelf_name: "",
      book_image: null,
    },
  ]);

  const token = localStorage.getItem("token-info");

  const LoadBooks = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/book`;

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
      const withIds = data.Books.map((item: book) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setBooks(withIds);
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };

  const updateRecord = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/book/update/${editBookId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
        body: JSON.stringify(editBookData),
      });
      if (!response.ok) {
        throw new Error("Failed to update the record");
      }

      setEditBookId(null);
      setEditBookData(null);
      LoadBooks();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/stats", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Stats) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const statValues = stats
    ? [stats.totalBooks, stats.totalQuantity]
    : [null, null];

  const deleteRecord = async (row: book) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/book/delete/${row._id}`;
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

      LoadBooks();
      return { success: true };
    } catch (error) {
      console.error("Error deleting record:", error);

      return { success: false, error: error };
    }
  };

  React.useEffect(() => {
    LoadBooks();
  }, []);

  return (
    <>
      <div className="  w-full! h-full pt-20!   ml-auto items-center justify-between relative p-5">
        <BookAdd />
        <div className="flex flex-wrap font-[Poppins]! gap-6 mt-4">
          {BookItems.map((item, i) => (
            <Card
              key={item.name}
              item={{ ...item, number: statValues[i] ?? item.number }}
              loading={stats === null}
            />
          ))}
        </div>
        <div className="w-full!">
          {editBookId && editBookData && (
            <BookEditForm
              editBookData={editBookData}
              setEditBookData={setEditBookData}
              setEditBookId={setEditBookId}
              updateRecord={updateRecord}
              component="main"
            />
          )}

          <ReusableTable
            columns={columns}
            data={books}
            onEdit={handleEdit}
            onDelete={deleteRecord}
            searchPlaceholder="Search Books..."
          />
        </div>
      </div>
    </>
  );
}
