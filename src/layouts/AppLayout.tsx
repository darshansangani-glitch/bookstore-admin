import Header from "../components/Header.js";
import SideBar from "../components/Sidebar.js";
import Protected from "../components/Protcted.js";

export default function AppLayout() {
  return (
    <>
      <div className="w-full flex flex-1">
        <SideBar />
        <div className="flex flex-1 flex-col">
          <Header />
          <Protected />
        </div>
      </div>
    </>
  );
}
