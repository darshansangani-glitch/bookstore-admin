import React from "react";
import ReusableTable, { Column } from "../Table";
import { user } from "./UserForm";
import { useAppSelector } from "../../redux/hooks";
import { api } from "../../utils/api";
import { UsersItems } from "../../data/CardData";
import { Card } from "../Card";


interface Stats {
  totalUsers: number;
}

const columns: readonly Column<user>[] = [
  { id: "name", label: "Name", minWidth: 150, align: "left" },
  { id: "email", label: "Email", minWidth: 150, align: "left" },
  {
    id: "role",
    label: "Role",
    minWidth: 150,
    align: "left",
  },
  { id: "actions", label: "Activities", minWidth: 10, align: "left" },
];


export default function UserTable() {
  const [user, setUser] = React.useState<user[]>([
    {
      _id: "",
      name: "",
      email: "",
      role: "",
    },
  ]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [search, setSearch] = React.useState<string>("");
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false)

  const token = useAppSelector(s => s.auth.token)

  const LoadUsers = async () => {
    try {
      setLoading(true)
      const data = await api.get(`/user?page=${page + 1}&limit=${rowsPerPage}&search=${search}`, token ? token : '');
      const withIds = data.Users.map((item: user) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setUser(withIds);
      setTotal(data.totalCount)
      setLoading(false)
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };

  const deleteRecord = async (row: user) => {
    try {
      await api.delete(`/user/delete/${row._id}`, token ? token : '')
      setUser((prev) => prev.filter((record) => record._id !== row._id));
      LoadUsers();
      return { success: true };
    } catch (error) {
      console.error("Error deleting record:", error);

      return { success: false, error: error };
    }
  };

  const [stats, setStats] = React.useState<Stats | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:5001/api/stats", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Stats) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const statValues = stats ? [stats.totalUsers] : [null];

  React.useEffect(() => {
    LoadUsers();
  }, [search, page]);

  return (
    <>
      <div className="flex flex-wrap font-[Poppins]! gap-6 mt-4">
        {UsersItems.map((item, i) => (
          <Card
            key={item.name}
            item={{ ...item, number: statValues[i] ?? item.number }}
            loading={stats === null}
          />
        ))}
      </div>
      <ReusableTable
        columns={columns}
        data={user}
        onDelete={deleteRecord}
        searchPlaceholder="Search Users..."
        serverSide={true}
        total={total}
        page={page}
        search={search}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage: number) => setPage(newPage)}
        onRowsPerPageChange={(newRows: number) => {
          setRowsPerPage(newRows);
          setPage(0);
        }}
        onSearch={(term: string) => {
          setSearch(term);
          setPage(0);
        }}
        loading={loading}
      />
    </>
  );
}
