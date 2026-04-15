import * as React from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useAppSelector } from "../../redux/hooks.js";
import { api } from "../../utils/api.js";
import PurchaseForm from "./PurchaseForm.js";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export interface purchase {
  _id?: string;
  book_id?: string;
  staff_id?: string;
  purchase_status?: string;
  purchase_date?: string;
  purchase_quantity?: string;
}

export default function PurchaseInsertion() {
  const [addPurchase, setAddPurchase] = React.useState(false);
  const [purchaseData, setPurchaseData] = React.useState<purchase>({
    book_id: "",
    purchase_quantity: "",
  });

  const token = useAppSelector((state) => state.auth.token)
  const decodedPayload = jwtDecode(token ?? "") as CustomJwtPayload;

  const userRole = decodedPayload.role;

  const handleForm = async () => {
    setAddPurchase((prev) => !prev);
  };

  const addPurchaseData = async () => {
    try {
      const result = await api.post('/purchase/add', purchaseData, token ? token : '')
      setPurchaseData(result)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userRole === "Admin" ? (
        <div className=" box-border! w-full! flex justify-between font-[Poppins]! items-center ">
          <div>
            <h1 className="text-4xl">
              <span className="text-red-500">Purchase</span> Inventory
            </h1>
            <p className="text-[15px]">Manage your books inventory</p>
          </div>
          {addPurchase && (
            <PurchaseForm
              addPurchase={addPurchase}
              handleForm={handleForm}
              setPurchaseData={setPurchaseData}
              purchaseData={purchaseData}
              addPurchaseData={addPurchaseData}
            />
          )}
          <button
            className="flex text-amber-50 w-fit p-5 items-center justify-center bg-sky-500 h-10 mr-5 rounded"
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
