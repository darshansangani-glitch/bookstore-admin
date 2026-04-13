import React from "react";
import BookForm, { book } from "./BookForm";
import { useAppSelector } from "../../redux/hooks";
import { api } from "../../utils/api";

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

  const token = useAppSelector((s) => s.auth.token);

  // const toBase64 = uInt8Array => btoa(String.fromCharCode(...uInt8Array));

  const addBookData = async () => {
    try {
      const data = document.getElementById("Book_add_form") as HTMLFormElement;
      if (data) {
        const formData = new FormData(data);
        const url = `${import.meta.env.VITE_API_URL}/book/add`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: token ? ` ${token}` : "",
          },
          body: formData,
        });
        console.log(response);
        const result = await response.json();
        setBookData(result);

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" box-border! w-full! flex justify-between font-[Poppins]! items-center ">
      <div>
        <h1 className="text-4xl">
          <span className="text-red-500">Book</span> Inventory
        </h1>
        <p className="text-[15px]">Manage your books inventory</p>
      </div>
      {addBook && (
        <BookForm
          addBook={addBook}
          handleForm={handleForm}
          setBookData={setBookData}
          bookData={bookData}
          addBookData={addBookData}
        />
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
