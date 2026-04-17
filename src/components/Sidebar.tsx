import { mainNavItems, adminItems } from "../data/NavItems.js";
import darkLogo from "../assets/darkLogo.png";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import { logout } from "../redux/features/slice/authSlice.js";
import { CustomJwtPayload } from "../pages/User.js";
import { jwtDecode } from "jwt-decode";
import LogOutPopUp from "./LogOut.js";

const drawerWidth = 240;

export default function SideBar() {
  const [location, setLocation] = useState(0);
  const token = useAppSelector(state => state.auth.token !== null ? state.auth.token : '')
  const decodedPayload = token !== '' ? jwtDecode(token ? token : '') as CustomJwtPayload : null;
  const [logOut, setLogOut] = useState<boolean>(false)

  const userRole = decodedPayload !== null ? decodedPayload.role : null;
  const navigate = useNavigate();
  

  return (
    <div className="flex h-screen fixed z-150 bg-white">

      <div
        className="relative flex flex-col gap-2 border-r border-b h-full border-slate-300"
        style={{ width: drawerWidth }}
      >

        <div className="sticky  flex border-b h-14.5! p-3 pl-3 gap-2 items-center border-b-gray-300">
          <img
            src={darkLogo}
            alt="Travis Howard"
            className="w-10 h-10 rounded-full"
          />

          <h2 className="font-[Poppins] font-semibold  text-2xl">
            <span className="text-green-400">Book</span>Worm
          </h2>
        </div>


        <div className="flex flex-col justify-between h-full font-[Poppins] ">

          <div>
            <ul>
              {mainNavItems.map((item) => (
                <li
                  key={item.id}
                  className={`w-45 mx-auto mb-1 rounded-[13px] 
                  ${location === item.id ? "bg-[#FDF0EC]" : "hover:bg-[#FDF0EC]"}`}
                >
                  <button
                    onClick={() => {
                      navigate(item.route);
                      setLocation(item.id);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-2 text-[18px] rounded-xl 
                    ${location === item.id ? "text-red-600" : "hover:text-red-600"}`}
                  >
                    {item.logo}
                    {item.text}
                  </button>
                </li>
              ))}

              {userRole === "Admin" &&
                adminItems.map((item) => (
                  <li
                    key={item.id}
                    className={`w-45 mx-auto mb-1 rounded-[13px] 
                    ${location === item.id ? "bg-[#FDF0EC]" : "hover:bg-[#FDF0EC]"}`}
                  >
                    <button
                      onClick={() => {
                        navigate(item.route);
                        setLocation(item.id);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2 text-[17px] rounded-xl 
                      ${location === item.id ? "text-red-600" : "hover:text-red-600"}`}
                    >
                      {item.logo}
                      {item.text}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <div className="border-t border-slate-300" />

            <ul className="p-2">
              <li className="w-45  mx-auto rounded-[13px] hover:bg-[#FDF0EC]">
                <button
                  onClick={()=>
                     setLogOut(prev=>!prev)
                  }
                  className="flex items-center gap-2 px-4 py-2 w-full hover:text-red-600"
                >
                  <MdLogout className="text-[18px]" />
                  <span className="text-[18px]">Log Out</span>
                </button>
              </li>
            </ul>
            { logOut == true && <LogOutPopUp setLogOut={setLogOut} logOut ={logOut} />}
          </div>
        </div>
      </div>
    </div>
  );
}

