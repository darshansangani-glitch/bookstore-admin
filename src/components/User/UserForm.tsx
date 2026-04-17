import React, { SetStateAction } from "react";;
import { RxCross1 } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
export interface user {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    mobileNo?: string
    password?: string
}

interface UserFormProps {
    setUserData?: React.Dispatch<SetStateAction<user>>
    addUser?: Boolean,
    userData?: user
    handleForm?: () => void,
    addUserData?: () => void,
    setAddUser?: React.Dispatch<SetStateAction<Boolean>>
    loading?: Boolean
}

export default function UserAddForm({
    setUserData,
    addUser,
    handleForm,
    addUserData,
    loading,
    setAddUser }: UserFormProps) {
    return (
        <div
            className={`fixed inset-0 z-4000 flex items-center justify-center transition-opacity ${addUser
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
            />
            <div
                className="w-screen h-full flex justify-center items-center relative -top-8 left-auto! p-8 rounded-2xl"
                style={{ left: "-230px" }}
            >
                <form
                    id="User_add_form"
                    className="min-w-50.5 w-130.5  h-140  left-60 border right-50  bg-white flex flex-col  rounded-2xl items-center z-20 "
                    style={{
                        display: addUser
                            ? "flex"
                            : "none",
                    }}
                >
                    <div className="relative p-5  w-full flex justify-between border-b border-b-gray-300">
                        <span className="text-xl font-bold  text-gray-400">
                            {addUser ? "Add Your New User" : "User Edit Form"}
                        </span>
                        <button
                            className=" top-2 text-xl font-black! hover:bg-red-200 p-1 right-2 rounded-3xl cursor-pointer"
                            type="button"
                            onClick={() => {
                                handleForm && handleForm()
                            }}
                        >
                            <RxCross1 />
                        </button>
                    </div>

                    <div
                        className="w-full p-5 flex flex-col gap-3 text-[16px] font-medium font-['poppins','sans-serif] overflow-hidden overflow-y-auto [scrollbar-width:thin]! "
                        style={{ scrollbarColor: "#e6e2e28a transparent" }}
                    >
                        <label>
                            <span className="p-1 ">User Name</span>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter User Name..."
                                id="name"
                                className="text-[15px] border-gray-300  w-full border rounded-lg text-gray-500 p-2 cursor-pointer"
                                onChange={(e) =>
                                    setUserData && setUserData((prev: user) => ({
                                        ...prev!,
                                        name: e.target.value,
                                    }))}
                                required
                            />
                        </label>
                        <label>
                            <span className="p-1">Mobile No.</span>
                            <input
                                name="mobileNo"
                                id="mobileNo"
                                placeholder="+91 99981 22145"
                                className="p-2 border-gray-300   w-full border rounded-lg text-gray-500 text-[15px]! cursor-pointer"
                                onChange={(e) =>
                                    setUserData
                                    && setUserData((prev: user) => ({
                                        ...prev!,
                                        mobileNo: e.target.value,
                                    }))}
                                required
                            />
                        </label>
                        <label>
                            <span className="p-1">email</span>
                            <input
                                name="email"
                                id="email"
                                placeholder="user@gmail.com"
                                className="text-[15px] w-full! border border-gray-300 rounded-lg text-gray-500  p-2 cursor-pointer"
                                type="email"
                                onChange={(e) =>
                                    setUserData && setUserData((prev: user) => ({
                                        ...prev!,
                                        email: e.target.value,
                                    }))}
                                required
                            />
                        </label>
                        <label>
                            <span className="p-1">Role</span>
                            <input
                                className="text-[15px] border-gray-300  w-full! border rounded-lg text-gray-500 cursor-pointer p-2"
                                name="role"
                                id="role"
                                placeholder="Librarian"
                                type="text"
                                onChange={(e) => {
                                    setUserData && setUserData((prev: user) => ({
                                        ...prev!,
                                        role: e.target.value,
                                    }))
                                }}
                                required
                            />
                        </label>
                        <label >
                            <span className="p-1">Password</span>
                            <input
                                name="password"
                                id="password"
                                placeholder="*******"
                                className="text-[15px] border-gray-300 cursor-pointer w-full! border rounded-lg text-gray-500 p-2"
                                type="password"
                                onChange={(e) =>
                                    setUserData && setUserData((prev: user) => ({
                                        ...prev!,
                                        password: e.target.value,
                                    }))}
                                required
                            />
                        </label>
                    </div>
                    <div className="w-full flex justify-end p-5  border-t border-t-gray-300  ">
                        <div className="w-70 flex gap-5">
                            <button
                                className="w-50 border h-10 rounded-xl  text-[18px] items-center hover:bg-red-500 hover:text-white flex justify-center font-semibold cursor-pointer"
                                onClick={() => { handleForm && handleForm() }}>
                                Cancel
                            </button>

                            <button
                                className="w-50 bg-green-400 h-10 rounded-xl border-0 text-[18px] items-center hover:bg-green-600 flex justify-center text-white font-semibold cursor-pointer"
                                type="button"
                                onClick={() => {
                                    addUserData && addUserData();
                                }}

                            >
                                {loading == true ? <ClipLoader /> : 'Add User'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
