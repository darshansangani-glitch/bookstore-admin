import React, { SetStateAction } from "react";
import { MdCloudUpload } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
export interface book {
  _id: string;
  book_name: string;
  quantity: string;
  description: string;
  author: string;
  category: string;
  shelf_name: string;
  book_image: File | null;
}

interface BookFormProps {
  editBookData?: book,
  handleForm?: () => void,
  setBookData?: React.Dispatch<SetStateAction<book>>
  addBook?: Boolean,
  bookData?: book
  addBookData?: () => void,
  setEditBookId?: React.Dispatch<SetStateAction<string | null>>,
  setEditBookData?: React.Dispatch<SetStateAction<book | null>>
  updateRecord?: () => void,
  editBookId?: string
}

export default function BookForm({ editBookData,
  handleForm,
  setBookData,
  addBook,
  addBookData,
  setEditBookId,
  setEditBookData,
  updateRecord  }: BookFormProps) {
  return (
    <div
      className={`fixed inset-0 z-4000 flex items-center justify-center transition-opacity ${addBook
        ? addBook
        : editBookData
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{
          WebkitBackdropFilter: "blur(6px)",
          backdropFilter: "blur(6px)",
        }}
        onClick={() => {
          handleForm ? handleForm() : setEditBookId?.(null);
        }}
      />
      <div
        className="w-screen h-full flex justify-center items-center relative -top-8 left-auto! p-8 rounded-2xl"
        style={{ left: "-230px" }}
      >
        <form
          id="Book_add_form"
          className="min-w-50.5 w-130.5  h-140  left-60 border right-50  bg-white flex flex-col  rounded-2xl items-center z-20 "
          style={{
            display: (addBook ? addBook : editBookData)
              ? "flex"
              : "none",
          }}
        >
          <div className="relative p-4 pl-6 pr-6  w-full flex justify-between border-b border-b-gray-300">
            <span className="text-xl font-bold  text-gray-400">
              {addBook ? "Add Your New Book" : "Book Edit Form"}
            </span>
            <button
              className=" top-2 text-xl font-black! hover:bg-red-200 p-1 right-2 rounded-3xl cursor-pointer"
              type="button"
              onClick={() => {
                handleForm
                  ? handleForm()
                  : setEditBookId ? setEditBookId(null) : null;
              }}
            >
              <RxCross1 />
            </button>
          </div>

          <div
            className="p-5 pt-2 pl-7 pr-7 flex flex-col gap-3 text-[16px] font-medium font-['poppins','sans-serif] overflow-hidden overflow-y-auto [scrollbar-width:thin]! "
            style={{ scrollbarColor: "#e6e2e28a transparent" }}
          >
            <label>
              <span className="p-1 ">Book Name</span>
              <input
                name="book_name"
                type="text"
                placeholder="Enter Book Name..."
                id="book_name"
                value={editBookData && editBookData.book_name}
                className="text-[15px] border-gray-300  w-full border rounded-lg text-gray-500 p-2 cursor-pointer"
                onChange={(e) =>
                  setEditBookData
                    ? setEditBookData((prev) => ({
                      ...prev!,
                      book_name: e.target.value,
                    }))
                    : setBookData && setBookData((prev: book) => ({
                      ...prev!,
                      book_name: e.target.value,
                    }))
                }
                required
              />
            </label>
            <label>
              <span className="p-1">Description</span>
              <textarea
                name="description"
                id="description"
                placeholder="Lorem ipsum, dolor sit ament consectetur adipisicing elt. Aut tot ito libero.."
                value={editBookData && editBookData.description}
                className="p-2 border-gray-300   w-full border rounded-lg text-gray-500 text-[15px]! cursor-pointer"
                rows={4}
                onChange={(e) =>
                  setEditBookData
                    ? setEditBookData((prev) => ({
                      ...prev!,
                      description: e.target.value,
                    }))
                    : setBookData
                    && setBookData((prev: book) => ({
                      ...prev!,
                      description: e.target.value,
                    }))
                }
                required
              />
            </label>
            <div className="flex justify-between! gap-3 w-full!">
              <label>
                <span className="p-1">Author</span>
                <input
                  name="author"
                  id="author"
                  placeholder="John Doe"
                  value={editBookData && editBookData.author}
                  className="text-[15px] w-full! border border-gray-300 rounded-lg text-gray-500  p-2 cursor-pointer"
                  type="text"
                  onChange={(e) =>
                    setEditBookData
                      ? setEditBookData((prev) => ({
                        ...prev!,
                        author: e.target.value,
                      }))
                      : setBookData && setBookData((prev: book) => ({
                        ...prev!,
                        author: e.target.value,
                      }))
                  }
                  required
                />
              </label>
              <label htmlFor="Category" className="">

                <span className="p-1">Category</span>
                <input
                  className="text-[15px] border-gray-300  w-full! border rounded-lg text-gray-500 cursor-pointer p-2"
                  name="category"
                  id="category"
                  placeholder="Science"
                  value={editBookData && editBookData.category}
                  type="text"
                  onChange={(e) => {
                    setEditBookData
                      ? setEditBookData((prev) => ({
                        ...prev!,
                        category: e.target.value,
                      }))
                      : setBookData && setBookData((prev: book) => ({
                        ...prev!,
                        category: e.target.value,
                      }));
                  }}
                  required
                />
              </label>
            </div>
            <div className="flex justify-between! w-full! gap-4">
              <label htmlFor="Shelf Name" className="w-55! ">
                <span className="p-1">Shelf Name</span>
                <input
                  name="shelf_name"
                  id="shelf_name"
                  placeholder="Science-A2"
                  className="text-[15px] border-gray-300 cursor-pointer w-full! border rounded-lg text-gray-500 p-2"
                  type="text"
                  value={editBookData && editBookData.shelf_name}
                  onChange={(e) =>
                    setEditBookData
                      ? setEditBookData((prev) => ({
                        ...prev!,
                        shelf_name: e.target.value,
                      }))
                      : setBookData && setBookData((prev: book) => ({
                        ...prev!,
                        shelf_name: e.target.value,
                      }))
                  }
                  required
                />
              </label>
              <label>
                <span className="p-1">Quantity</span>
                <input
                  name="quantity"
                  placeholder="00"
                  className="text-[15px] border-gray-300 cursor-pointer w-full! border rounded-lg text-gray-500 p-2"
                  type="number"
                  value={editBookData && editBookData.quantity}
                  onChange={(e) => {
                    setEditBookData
                      ? setEditBookData((prev) => ({
                        ...prev!,
                        quantity: e.target.value as any,
                      }))
                      : setBookData && setBookData((prev: book) => ({
                        ...prev!,
                        quantity: e.target.value as any,
                      }));
                  }}
                  required
                />
              </label>
            </div>
            {addBook ? (
              <label className="flex flex-col gap-2  p-5 w-full! justify-center! items-center bg-blue-100  h-40 cursor-pointer rounded border-dashed!  border-blue-600 border-2 ">
                <input
                  type="file"
                  id="book_image"
                  className=""
                  // style={{ display: 'none' }}
                  placeholder="Upload Your Book"
                  name="book_image"
                  onChange={(e) => {
                    const target = e.target;

                    if (target) {
                      setBookData && setBookData((prev: book) => ({
                        ...prev,
                        book_image: target.files && target.files[0],
                      }));
                    }
                  }}
                  required
                />
                <MdCloudUpload color="#1475cf" size={60} />
                <p className="text-[15px]">Upload Your Book Image</p>
                <p className="text-[17px]">Browse Book Images to upload</p>
              </label>
            ) : null}
          </div>
          <div className="w-full flex justify-center pt-3 pb-3 gap-10 border-t border-t-gray-300 pl-6 pr-6 ">
            <button
              className="w-full border h-12 rounded-xl  text-xl items-center hover:bg-red-500 hover:text-white flex justify-center font-semibold cursor-pointer"
              onClick={() => {
                handleForm
                  ? handleForm()
                  : setEditBookId && setEditBookId(null);
              }}
            >
              Cancel
            </button>
            {addBook && (
              <button
                className="w-full bg-green-400 h-12 rounded-xl border-0 text-xl items-center hover:bg-green-600 flex justify-center text-white font-semibold cursor-pointer"
                type="button"
                onClick={() => addBookData && addBookData()}
              >
                Add Book
              </button>
            )}
            {editBookData && (
              <button
                className="w-full bg-green-400 h-12 rounded-xl border-0 text-xl items-center cursor-pointer hover:bg-green-600 flex justify-center text-white font-semibold"
                onClick={updateRecord}
              >
                Update Book
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
