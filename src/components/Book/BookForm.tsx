import { RxCross1 } from "react-icons/rx";
interface book {
  _id: string;
  book_name: string;
  quantity: string;
  description: string;
  author: string;
  category: string;
  shelf_name: string;
}

export default function BookEditForm(props: any) {
  return (
    <div className="w-full h-screen z-200 bg-gre fixed ">
      <form
        className="min-w-50.5 w-132.5  h-fit -top-60 left-60 border right-50 absolute bg-white flex flex-col pt-5 rounded-2xl items-center z-20 "
        style={{ display: props.editBookData ? "flex" : "none" }}
      >
        <div className="relative border-b border-b-amber-900 w-full flex justify-center p-2">
          <h4 className="text-3xl font-semibold text-red-600">
            Book Edit Form
          </h4>
          <button className="absolute -top-3 text-xl font-black! hover:bg-red-200 p-1 right-2 rounded-3xl" type="button" onClick={() => props.setEditBookId(null)}>
            <RxCross1 />
          </button>
        </div>
        <div className="p-5 pl-13 pr-13 flex flex-col gap-3 text-xs">
          <label htmlFor="Book Name">
            Book Name
            <input
              name="Book Name"
              type="text"
              value={props.editBookData.book_name}
              className="text-[20px] w-110 border-b text-gray-500 text-xl p-1"
              onChange={(e) =>
                props.setEditBookData((prev: book) => ({
                  ...prev!,
                  book_name: e.target.value,
                }))
              }
            />
          </label>
          <label htmlFor="Description">Description
            <textarea
              name="Description"
              value={props.editBookData.description}
              className="text-[20px] w-110 border-b text-gray-500 text-xl p-1"
              rows={4}
              onChange={(e) =>
                props.setEditBookData((prev: book) => ({
                  ...prev!,
                  description: e.target.value,
                }))
              }
            />
          </label>
          <div className="flex justify-between! w-full!">
            <label htmlFor="Author">Author
              <input
                name="Author"
                value={props.editBookData.author}
                className="text-[20px] w-52! border-b text-gray-500 text-xl p-1"
                type="text"
                onChange={(e) =>
                  props.setEditBookData((prev: book) => ({
                    ...prev!,
                    author: e.target.value,
                  }))
                }
              />
            </label>
            <label htmlFor="Category" className="!">Category
              <input
                className="text-[20px] w-full! border-b text-gray-500 text-xl p-1"
                name="Category"
                value={props.editBookData.category}
                type="text"
                onChange={(e) => {
                  props.setEditBookData((prev: book) => ({
                    ...prev!,
                    category: e.target.value,
                  }));
                }}
              />
            </label>
          </div>
          <div className="flex justify-between! w-full! ">
            <label htmlFor="Shelf Name">Shelf Name
              <input
                name="Shelf Name"
                className="text-[20px] w-52! border-b text-gray-500 text-xl p-1"
                type="text"
                value={props.editBookData.shelf_name}
                onChange={(e) =>
                  props.setEditBookData((prev: book) => ({
                    ...prev!,
                    shelf_name: e.target.value,
                  }))
                }
              />
            </label>
            <label htmlFor="Quantity">Quantity
              <input
                name="Quantity"
                className="text-[20px] w-56! border-b text-gray-500 text-xl p-1"
                type="number"
                value={props.editBookData.quantity}
                onChange={(e) => {
                  props.setEditBookData((prev: book) => ({
                    ...prev!,
                    quantity: e.target.value as any,
                  }));
                }}
              />
            </label>
          </div>
          <div className="w-110 flex justify-center mt-5 ">

            <button className="w-full bg-green-400 h-12 rounded-xl border-0 text-xl items-center flex justify-center text-white font-bold" type="button" onClick={props.updateRecord}>
              Update Book
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}