
import { SetStateAction } from "react";
import { RxCross1 } from "react-icons/rx";

interface purchase {
  _id?: string;
  book_id?: string;
  staff_id?: string;
  purchase_status?: string;
  purchase_date?: string;
  purchase_quantity?: string;
}

interface PurchaseProps {
  editPurchaseData?: purchase,
  handleForm?: () => void,
  setPurchaseData?: React.Dispatch<SetStateAction<purchase>>
  addPurchase?: Boolean,
  purchaseData?: purchase
  addPurchaseData?: () => void,
  setEditPurchaseId?: React.Dispatch<SetStateAction<string | null>>,
  setEditPurchaseData?: React.Dispatch<SetStateAction<purchase | null>>
  updateRecord?: () => void,
  editPurchaseId?: string
}

export default function PurchaseForm({ editPurchaseData,
  handleForm,
  setPurchaseData,
  addPurchase,
  purchaseData,
  addPurchaseData,
  setEditPurchaseId,
  setEditPurchaseData,
  updateRecord,
}: PurchaseProps) {
  { // <div className="w-full h-screen z-200 bg-gre fixed ">
    //   <form
    //     className="w-132.5 h-90.25  left-60 border right-50 absolute bg-white flex flex-col pt-5 rounded-2xl items-center z-20"
    //     style={{ display: editPurchaseData ? "flex" : "none" }}
    //   >
    //     <Typography
    //       variant="h4"
    //       style={{ fontSize: "35px", borderBottom: "2px solid white" }}
    //     >
    //       Purchase Edit Form
    //     </Typography>
    //     <TextField
    //       label="Purchase Id"
    //       value={editPurchaseData.book_id}
    //       className="text-[20px] w-110"
    //       style={{ margin: "12px auto" }}
    //       onChange={(e) =>
    //         setEditPurchaseData((prev: purchase) => ({
    //           ...prev!,
    //           book_id: e.target.value,
    //         }))
    //       }
    //       variant="standard"
    //     />
    //     <TextField
    //       label="Purchase Status"
    //       value={editPurchaseData.purchase_status}
    //       className="text-[20px] w-110 mb-3! mt-3"
    //       variant="standard"
    //       onChange={(e) =>
    //         setEditPurchaseData((prev: purchase) => ({
    //           ...prev!,
    //           purchase_status: e.target.value,
    //         }))
    //       }
    //     />

    //     <TextField
    //       label="Quantity"
    //       value={editPurchaseData.purchase_quantity}
    //       className="text-[20px] w-110 mb-3 mt-5"
    //       onChange={(e) =>
    //         setEditPurchaseData((prev: purchase) => ({
    //           ...prev!,
    //           purchase_quantity: e.target.value,
    //         }))
    //       }
    //       variant="standard"
    //     />

    //     <div className="w-110 flex justify-between mt-5">
    //       <Button variant="text" onClick={() => setEditPurchaseId(null)}>
    //         Cancel
    //       </Button>
    //       <Button variant="contained" onClick={updateRecord}>
    //         Update Purchase
    //       </Button>
    //     </div>
    //   </form>
    // </div>}
    return (
      <div
        className={`fixed inset-0 z-4000 flex items-center justify-center transition-opacity ${addPurchase
          ? addPurchase
          : editPurchaseData
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
            handleForm ? handleForm() : setEditPurchaseId?.(null);
          }}
        />
        <div
          className="w-screen h-full flex justify-center items-center relative -top-8 left-auto! p-8 rounded-2xl"
          style={{ left: "-230px" }}
        >
          <form
            id="Purchase_add_form"
            className="min-w-50.5 w-130.5  h-fit max-h-140  left-60 border right-50  bg-white flex flex-col  rounded-2xl items-center z-20 "
            style={{
              display: (addPurchase ? addPurchase : editPurchaseData)
                ? "flex"
                : "none",
            }}
          >
            <div className="relative p-4 pl-6 pr-6  w-full flex justify-between border-b border-b-gray-300">
              <span className="text-xl font-bold  text-gray-400">
                {addPurchase ? "Purchase New Book" : "Edit your Purchase Record"}
              </span>
              <button
                className=" top-2 text-xl font-black! hover:bg-red-200 p-1 right-2 rounded-3xl cursor-pointer"
                type="button"
                onClick={() => {
                  handleForm
                    ? handleForm()
                    : setEditPurchaseId ? setEditPurchaseId(null) : null;
                }}
              >
                <RxCross1 />
              </button>
            </div>

            <div
              className="p-5 pt-2 pl-7 pr-7 w-full flex flex-col gap-3 text-[16px] font-medium font-['poppins','sans-serif] overflow-hidden overflow-y-auto [scrollbar-width:thin]! "
              style={{ scrollbarColor: "#e6e2e28a transparent" }}
            >
              <label>
                <span className="p-1 ">Book Id</span>
                <input
                  name={purchaseData?.book_id}
                  type="text"
                  placeholder="Enter Purchase Name..."
                  id="book_name"
                  value={editPurchaseData && editPurchaseData.book_id}
                  className="text-[15px] border-gray-300  w-full border rounded-lg text-gray-500 p-2 cursor-pointer"
                  onChange={(e) =>
                    setEditPurchaseData
                      ? setEditPurchaseData((prev) => ({
                        ...prev!,
                        book_id: e.target.value,
                      }))
                      : setPurchaseData && setPurchaseData((prev: purchase) => ({
                        ...prev!,
                        book_id: e.target.value,
                      }))
                  }
                  required
                />
              </label>
              <label>
                  <span className="p-1 ">Purchase Quantity</span>
                  <input
                    name={purchaseData?.purchase_quantity}
                    type="text"
                    placeholder="Enter Book ID..."
                    id="purchase_quantity"
                    value={editPurchaseData && editPurchaseData.purchase_quantity}
                    className="text-[15px] border-gray-300   w-full border rounded-lg text-gray-500 p-2 cursor-pointer"
                    onChange={(e) =>
                      setEditPurchaseData
                        ? setEditPurchaseData((prev) => ({
                          ...prev!,
                          purchase_quantity: e.target.value,
                        }))
                        : setPurchaseData && setPurchaseData((prev: purchase) => ({
                          ...prev!,
                          purchase_quantity: e.target.value,
                        }))
                    }
                    required
                  />
                </label>
              {editPurchaseData && <>
                <label>
                  <span className="p-1 ">Purchase Status</span>
                  <input
                    name={purchaseData?.purchase_status}
                    type="text"
                    placeholder="Enter Purchase Name..."
                    id="purchase_status"
                    value={editPurchaseData && editPurchaseData.purchase_status}
                    className="text-[15px] border-gray-300  w-full border rounded-lg text-gray-500 p-2 cursor-pointer"
                    onChange={(e) =>
                      setEditPurchaseData
                        ? setEditPurchaseData((prev) => ({
                          ...prev!,
                          purchase_status: e.target.value,
                        }))
                        : setPurchaseData && setPurchaseData((prev: purchase) => ({
                          ...prev!,
                          purchase_status: e.target.value,
                        }))
                    }
                    required
                  />
                </label>
              </>}
            </div>
            <div className="w-full flex justify-center pt-3 pb-3 gap-10 border-t border-t-gray-300 pl-6 pr-6 ">
              <button
                className="w-full border h-12 rounded-xl  text-xl items-center hover:bg-red-500 hover:text-white flex justify-center font-semibold cursor-pointer"
                onClick={() => {
                  handleForm
                    ? handleForm()
                    : setEditPurchaseId && setEditPurchaseId(null);
                }}
              >
                Cancel
              </button>
              {addPurchase && (
                <button
                  className="w-full bg-green-400 h-12 rounded-xl border-0 text-xl items-center hover:bg-green-600 flex justify-center text-white font-semibold cursor-pointer"
                  type="button"
                  onClick={() => addPurchaseData && addPurchaseData()}
                >
                  Purchase Book
                </button>
              )}
              {editPurchaseData && (
                <button
                  className="w-full bg-green-400 h-12 rounded-xl border-0 text-xl items-center cursor-pointer hover:bg-green-600 flex justify-center text-white font-semibold"
                  onClick={updateRecord}
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

    );
  }
}