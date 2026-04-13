import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
        className="w-132.5 h-115.25 -top-60 left-60 border right-50 absolute bg-white flex flex-col pt-5 rounded-2xl items-center z-20"
        style={{ display: props.editBookData ? "flex" : "none" }}
      >
        <Typography
          variant="h4"
          style={{ fontSize: "35px", borderBottom: "2px solid white" }}
        >
          Book Edit Form
        </Typography>
        <TextField
          label="Book Name"
          value={props.editBookData.book_name}
          className="text-[20px] w-110"
          style={{ margin: "12px auto" }}
          onChange={(e) =>
            props.setEditBookData((prev: book) => ({
              ...prev!,
              book_name: e.target.value,
            }))
          }
          variant="standard"
        />
        <TextField
          label="Description"
          value={props.editBookData.description}
          className="text-[20px] w-110 mb-2 mt-3"
          multiline
          rows={4}
          variant="standard"
          onChange={(e) =>
            props.setEditBookData((prev: book) => ({
              ...prev!,
              description: e.target.value,
            }))
          }
        />
        <div className="flex gap-10 mb-3 mt-3">
          <TextField
            label="Author"
            value={props.editBookData.author}
            className="text-[20px] w-50 mb-3"
            onChange={(e) =>
              props.setEditBookData((prev: book) => ({
                ...prev!,
                author: e.target.value,
              }))
            }
            variant="standard"
          />
          <TextField
            id="standard-basic"
            className="text-[20px] w-50 mb-3"
            label="Category"
            name={props.editBookData.category}
            onChange={(e) => {
              props.setEditBookData((prev: book) => ({
                ...prev!,
                category: e.target.value,
              }));
            }}
            variant="standard"
          />
        </div>
        <div className="flex gap-10 w-110 items-baseline mb-3">
          <TextField
            label="Shelf Name"
            value={props.editBookData.shelf_name}
            onChange={(e) =>
              props.setEditBookData((prev: book) => ({
                ...prev!,
                shelf_name: e.target.value,
              }))
            }
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Quantity"
            name={props.editBookData.quantity}
            onChange={(e) => {
              props.setEditBookData((prev: book) => ({
                ...prev!,
                quantity: e.target.value as any,
              }));
            }}
            variant="standard"
          />
        </div>
        <div className="w-110 flex justify-between mt-5">
          <Button variant="text" onClick={() => props.setEditBookId(null)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={props.updateRecord}>
            Update Book
          </Button>
        </div>
      </form>
    </div>
  )
}