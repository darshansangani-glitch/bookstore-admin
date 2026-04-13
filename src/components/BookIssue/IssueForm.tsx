import { RxCross1 } from "react-icons/rx";
import { issue } from "./BookIssue";

interface MyProps {
    addIssue: Boolean
    handleForm: () => void
    addBookIssueData: () => void,
    setIssueData: React.Dispatch<React.SetStateAction<{ request_id: string }>>,
    issueData: string
}

export default function IssueForm({ addIssue,
    handleForm,
    addBookIssueData,
    setIssueData, issueData }: MyProps) {
    return (
        <div
            className={`fixed inset-0 z-4000 flex items-center justify-center transition-opacity ${addIssue
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
                }`}
            aria-hidden={!addIssue}
        >
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                style={{
                    WebkitBackdropFilter: "blur(6px)",
                    backdropFilter: "blur(6px)",
                }}
                onClick={() => {
                    handleForm;
                }}
            />
            <div
                className="w-screen h-full flex justify-center items-center relative -top-8 left-auto! p-8 rounded-2xl"
                style={{ left: "-230px" }}
            >
                <form
                    id="Book_add_form"
                    className="min-w-50.5 w-130.5  h-60  left-60 border right-50  bg-white flex flex-col  rounded-2xl items-center z-20 "
                    style={{
                        display: (addIssue)
                            ? "flex"
                            : "none",
                    }}
                >
                    <div className="relative p-4 pl-6 pr-6  w-full flex justify-between border-b border-b-gray-300">
                        <span className="text-xl font-bold  text-gray-400">
                            Book Issue Add Form
                        </span>
                        <button
                            className=" top-2 text-xl font-black! hover:bg-red-200 p-1 right-2 rounded-3xl cursor-pointer"
                            type="button"
                            onClick={() => {
                                handleForm()
                            }}
                        >
                            <RxCross1 />
                        </button>
                    </div>
                    <div className="w-full! p-5 text-[16px] font-medium font-['poppins','sans-serif]  "
                    >
                        <label className="w-full! ">
                            Request Id
                            <input
                                id="standard-basic"
                                placeholder="Request ID"
                                name={issueData}
                                className="text-[15px] border-gray-300  w-full! border rounded-lg text-gray-500 cursor-pointer  p-2"
                                onChange={(e) => {
                                    setIssueData((prev) => ({
                                        ...prev,
                                        request_id: e.target.value,
                                    }));
                                }}
                            />
                        </label>

                    </div>
                    <div className="w-full flex justify-center pt-3 pb-3 gap-50 border-t border-t-gray-300 pl-6 pr-6 ">
                        <button
                            className="w-full border h-12 rounded-xl  text-xl items-center hover:bg-red-500 hover:text-white flex justify-center font-semibold cursor-pointer"
                            onClick={handleForm}>
                            Cancel
                        </button>

                        <button
                            className="w-full bg-green-400 h-12  hover:bg-green-600 rounded-xl border-0 text-xl items-center flex justify-center text-white font-semibold cursor-pointer"
                            onClick={() => addBookIssueData()}>
                            Approve
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}