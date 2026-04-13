import { Outlet } from "react-router-dom";
import Header from "../components/Header.js";
import SideBar from "../components/Sidebar.js";
import Protected from "../components/Protected.js";

export default function AppLayout() {
  return (
    <>
      <div className="w-full">
        <SideBar />
        <Header />
        <div className="mt-14! p-5 ml-53!">
          <Protected />
        </div>
      </div>
    </>
  );
}
