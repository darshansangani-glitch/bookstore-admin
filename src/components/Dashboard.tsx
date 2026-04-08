import { dashbardItems } from "../data/CardData.js";
import { Card } from "./Card.js";
import { useEffect, useState } from "react";

interface Stats {
  totalBooks: number;
  totalQuantity: number;
  booksIssued: number;
  booksRequested: number;
  booksPurchased: number;
  totalUsers: number;
}

export function Cards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/stats", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Stats) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const statValues = stats
    ? [
      stats.totalBooks,
      stats.totalQuantity,
      stats.booksIssued,
      stats.booksRequested,
      stats.booksPurchased,
      stats.totalUsers,
    ]
    : [null, null, null, null, null, null];

  return (
    <div className="flex flex-wrap font-[Poppins]! gap-6 mt-4">
      {dashbardItems.map((item, i) => (
        <Card
          key={item.name}
          item={{ ...item, number: statValues[i] ?? item.number }}
          loading={stats === null}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-white pt-20!  w-full font-[Poppins]!   h-full   ml-auto items-center justify-between relative p-5">
      <div className="mb-6">
        <h1 className="text-4xl">
          <span className="text-red-500">Book</span>Worm DashBoard
        </h1>
        <p className="text-[15px]">
          Library Books Statistic Visulizations Given Below....
        </p>
      </div>
      <Cards />
    </div>
  );
}
