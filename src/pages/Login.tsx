import { useState } from "react";
import { IoMailSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LightLogo from "../assets/lightLogo.png";
import { login } from "../redux/features/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FaLock } from "react-icons/fa";
import { SyncLoader } from 'react-spinners'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const userToken = useAppSelector(s => s.auth.token)

  const handleLogin = async () => {
    const url = `${import.meta.env.VITE_API_URL}/user/login`;

    try {
      setLoading(true)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      dispatch(login(result.token))
      navigate('/admin-home')
      setLoading(false)
      return userToken;

    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <div className="w-full! flex items-center h-screen">

      <div className=" flex w-250! h-130 justify-center  items-center border  ml-auto mr-auto  rounded-2xl">
        <form
          className="flex flex-col w-[35%]! justify-center ml-auto m-1.5 gap-3  h-full!"
          noValidate
          autoComplete="none"

        >
          <p className="align-center font-[Poppins] text-gray-400 text-5xl leading-13 font-semibold ">
            Welcome Back User!!
          </p>
          <label className="flex flex-col gap-1">
            <span className="text-[18px] font-semibold">Email Address</span>
            <div className="flex gap-1 items-center border p-2 rounded-xl border-slate-400">
              <IoMailSharp className="text-xl text-slate-400 " />
              <input
                id="email"
                name={email}
                placeholder="Enter Your Email..."
                className="w-full p-1! text-[18px]  bg-white! text-black! focus:outline-0! cursor-pointer"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="flex flex-col gap-1" htmlFor="standard-adornment-password">
            <span className="text-[18px] font-semibold">Password</span>
            <div className="flex gap-1 items-center rounded-xl p-2 border border-slate-400">
              <FaLock className="text-xl text-slate-400" />
              <input
                name={password}
                className="p-1 w-full text-[18px] text-black bg-white focus:outline-0! cursor-pointer"
                placeholder="Enter your Password..."
                id="standard-adornment-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required
              />
            </div>
          </label>

          <button
            className="mt-7! w-full border-0 font-bold text-xl hover:bg-green-600 p-3 rounded-2xl bg-green-400 text-white cursor-pointer"
            type="button"
            onClick={handleLogin}
          >
            {loading ? <SyncLoader
              color="white"
              cssOverride={{}}
              margin={5}
              size={10}
              speedMultiplier={1}
            /> : 'Log In'}
          </button>
        </form>
        <div className="bg-black p-25 w-[50%] mr-0 ml-auto h-full justify-center items-center rounded-br-2xl rounded-tr-2xl flex flex-col gap-5">
          <img className="w-25 h-25" src={LightLogo} alt="Light Logo" />
          <p
            className="flex  items-center text-white font-black text-5xl"
          >
            <span className="text-green-500 flex!">Book</span>Warm
          </p>
          <p
            className="flex flex-col text-3xl  justify-center items-center text-white"
          >
            Admin Login Page{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
