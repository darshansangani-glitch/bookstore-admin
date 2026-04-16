import { RxCross1 } from "react-icons/rx";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/slice/authSlice";
import { useNavigate } from "react-router-dom";
import darkLogo from "../assets/darkLogo.png";


interface LogOut {
    setLogOut: React.Dispatch<React.SetStateAction<boolean>>
    logOut: boolean
}

export default function LogOutPopUp({ setLogOut, logOut }: LogOut) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <div
            className={`fixed inset-0 z-4000 flex items-center justify-center transition-opacity ${logOut
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
                <div className="min-w-50.5 w-fit  h-fit gap-3 max-h-140 p-5  right-50  bg-white flex flex-col  rounded-2xl items-center z-20 border-0">
                    <div className="flex w-full text-xl  justify-end">
                        
                        <button className="hover:bg-red-200 p-1 rounded-2xl" onClick={() => setLogOut(false)}><RxCross1 /></button>
                    </div>
                    <div className="flex gap-3 items-center">
                        <img
                            src={darkLogo}
                            alt="Travis Howard"
                            className="w-12 h-12 rounded-full"
                        />

                        <h2 className="font-[Poppins] font-semibold  text-3xl">
                            <span className="text-green-400">Book</span>Worm
                        </h2>
                    </div>
                    
                    <div className="flex flex-1 p-3 flex-col justify-center items-center font-semibold text-slate-400 text-[18px] h-5">
                        <p>You Are Attempting to Log Out From BookWorm.</p>
                        <span>Are You Sure?</span>
                    </div>
                    <button className="border-0 hover:bg-red-600 rounded w-50 bg-red-300 text-white p-3" onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                        setLogOut(false)
                    }}>Log Out</button>
                </div>
            </div>
        </div>
    )
}