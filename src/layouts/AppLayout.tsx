import { Outlet } from "react-router-dom";
import Header from "../components/Header.js";
import SideBar from "../components/Sidebar.js";
import Protected from "../components/Protected.js";

export default function AppLayout() {
  return (
    <>
      <div className="w-full flex flex-1">
        <SideBar />
        <div className="flex flex-1 flex-col">
          <Header />
          <div className="mt-14 p-5">

          <Protected />
          </div>
        </div>
      </div>
    </>
  );
}
