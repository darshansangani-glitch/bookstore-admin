import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface purchase {
  _id: string;
  book_id: string;
  staff_id: string;
  purchase_status: string;
  purchase_date: string;
  purchase_quantity: string;
}

export default function PurchaseEditForm(props: any) {
  return (
    <div className="w-full h-screen z-200 bg-gre fixed ">
      <form
        className="w-132.5 h-90.25  left-60 border right-50 absolute bg-white flex flex-col pt-5 rounded-2xl items-center z-20"
        style={{ display: props.editPurchaseData ? "flex" : "none" }}
      >
        <Typography
          variant="h4"
          style={{ fontSize: "35px", borderBottom: "2px solid white" }}
        >
          Book Edit Form
        </Typography>
        <TextField
          label="Book Id"
          value={props.editPurchaseData.book_id}
          className="text-[20px] w-110"
          style={{ margin: "12px auto" }}
          onChange={(e) =>
            props.setEditPurchaseData((prev: purchase) => ({
              ...prev!,
              book_id: e.target.value,
            }))
          }
          variant="standard"
        />
        <TextField
          label="Purchase Status"
          value={props.editPurchaseData.purchase_status}
          className="text-[20px] w-110 mb-3! mt-3"
          variant="standard"
          onChange={(e) =>
            props.setEditBookData((prev: purchase) => ({
              ...prev!,
              purchase_status: e.target.value,
            }))
          }
        />

        <TextField
          label="Quantity"
          value={props.editPurchaseData.purchase_quantity}
          className="text-[20px] w-110 mb-3 mt-5"
          onChange={(e) =>
            props.setEditPurchaseData((prev: purchase) => ({
              ...prev!,
              purchase_quantity: e.target.value,
            }))
          }
          variant="standard"
        />

        <div className="w-110 flex justify-between mt-5">
          <Button variant="text" onClick={() => props.setEditPurchaseId(null)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={props.updateRecord}>
            Update Book
          </Button>
        </div>
      </form>
    </div>
  );
}
