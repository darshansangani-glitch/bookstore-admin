import { useEffect, useState } from "react";
import { dashboardItems } from "../../data/CardData";
import { Card } from "../Card";


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
            {dashboardItems.map((item, i) => (
                <Card
                    key={item.name}
                    item={{ ...item, number: statValues[i] ?? item.number }}
                    loading={stats === null}
                />
            ))}
        </div>
    );
}
