import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReusableTable, { Column } from "./Table";
import { UsersItems } from "../data/CardData";
import { Card } from "./Card";
import { useAppSelector } from "../redux/hooks";
import { api } from "../utils/api";

interface user {
  _id: string;
  name: string;
  email: string;
  role: string;
}

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
  { id: "actions", label: "Activities", minWidth: 150, align: "left" },
];

export default function UserForm() {
  const [addUser, setAddUser] = React.useState(false);
  const [userData, setUserData] = React.useState({
    name: "",
    mobileNo: "",
    email: "",
    role: "",
    password: "",
  });

  const handleForm = async () => {
    setAddUser((prev) => !prev);
  };

  const token = useAppSelector((state) => state.auth.token)

  const addUserData = async () => {
    try {
      const result = await api.post('/user/add', userData, token ? token : '')
      setUserData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <Typography variant="h3">
          <span className="text-red-500">User</span> List
        </Typography>
        <Typography variant="body1">Manage your books inventory</Typography>
      </div>
      {addUser && (
        <div className=" text-red-400">
          <form
            className="w-132.5 h-95.25 top-20 left-110 border right-50 absolute bg-white flex flex-col pt-5 rounded-2xl items-center z-20"
            style={{ display: addUser ? "flex" : "none" }}
          >
            <Typography
              className="w-full flex justify-center  border-b! border-b-gray-300!"
              variant="h4"
              style={{ fontSize: "40px", borderBottom: "2px solid white" }}
            >
              Add User
            </Typography>
            <div className="p-7 pt-3 ml-auto mr-auto">
              <TextField
                id="standard-basic"
                label="Name"
                name={userData.name}
                className="text-[20px] w-full! mb-2 mt-3"
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                variant="standard"
              />
              <TextField
                id="standard-multiline-static"
                label="Email"
                name={userData.email}
                className="text-[20px] w-full mb-3"
                variant="standard"
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
              <div className="flex gap-10 mb-3 mt-3">
                <TextField
                  id="standard-basic"
                  className="text-[20px] w-[50%] mb-3"
                  label="Mobile No"
                  name={userData.mobileNo}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      mobileNo: e.target.value,
                    }));
                  }}
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  className="text-[20px] w-[50%] mb-3"
                  label="Role"
                  name={userData.role}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }));
                  }}
                  variant="standard"
                />
              </div>

              <div className="flex w-full! gap-10 items-baseline mb-3">
                <TextField
                  id="standard-basic"
                  label="Password"
                  className="w-full!"
                  name={userData.password}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  variant="standard"
                />
              </div>

              <div className="w-full! flex justify-between mt-5">
                <Button variant="text" onClick={handleForm}>
                  Cancel
                </Button>

                <Button variant="contained" onClick={addUserData}>
                  Add User
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      <button
        className="flex text-amber-50 w-30 items-center justify-center bg-sky-500 h-10 mr-5 rounded"
        onClick={handleForm}
      >
        Add User
      </button>
    </div>
  );
}

export function UserTable() {
  const [user, setUser] = React.useState<user[]>([
    {
      _id: "",
      name: "",
      email: "",
      role: "",
    },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [total, setTotal] = React.useState(0);


  const token = useAppSelector(s => s.auth.token)

  const LoadUsers = async () => {
    try {
      const data = await api.get(`/user?page=${page + 1}&limit=${rowsPerPage}&search=${search}`, token ? token : '');
      const withIds = data.Users.map((item: user) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setUser(withIds);
      setTotal(data.totalCount)
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
      />
    </>
  );
}
