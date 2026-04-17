import { Cards } from "./DashBoardCards";

export default function Dashboard() {
  return (
    <div className="bg-white  w-full font-[Poppins]!   h-full   ml-auto items-center justify-between relative">
      <div className="mb-6">
        <h1 className="text-2xl">
          <span className="text-red-500">Book</span>Worm DashBoard
        </h1>
        <p className="text-[15px]">
          Library Books Statistic Visualizations Given Below....
        </p>
      </div>
      <Cards />
    </div>
  );
}
