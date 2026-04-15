import { FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Header() {
  const token = useAppSelector(s => s.auth.token)
  const [user, setUser] = useState({
    name: '',
    role: '',
  })
  const loadUserInfo = async () => {
    try {
      const data = await api.get('/user/info', token ? token : '')
      console.log(data.userInfo)
      setUser(data.userInfo) 
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      loadUserInfo()
    }, 1000)
  }, [])
  return (
    <div className="bg-white! h-14.5 border-l-0 fixed top-0 right-0 left-0  z-1030 shadow-none! border border-gray-300 flex!" >
      <div className="w-full! flex! items-center justify-end! gap-3 mr-5">
        <FaUserCircle className="text-4xl text-gray-400" />
        <div className="flex flex-col text-slate-400! font-bold text-[20px] leading-4.5">
          <span className="text-slate-700!">{user.name}</span>
          <span className="font-mono! text-[14px]!">{user.role}</span>
        </div>
      </div>
      {/* <Button color="inherit"></Button> */}
    </div>
  );
}
