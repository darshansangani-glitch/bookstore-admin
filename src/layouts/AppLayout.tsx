import { Outlet } from "react-router-dom";
import Header from "../components/Header.js";
import SideBar from "../components/Sidebar.js";

export default function AppLayout() {
  return (
    <>
      <div className="w-full flex flex-1">
        <SideBar />
        <div className="flex flex-1 flex-col">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}
