import Header from "../components/Header.js";
import SideBar from "../components/Sidebar.js";
import Protected from "../components/Protected.js";

export default function AppLayout() {
  return (
    <>
      <div className="w-full flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex flex-1 flex-col ml-auto">
          <Header />
          <div className="mt-14 ml-53 p-5  overflow-auto">
          <Protected />
          </div>
        </div>
      </div>
    </>
  );
}
