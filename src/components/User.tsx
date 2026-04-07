import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReusableTable, { Column } from "./Table";
import { UsersItems } from "../data/CardData";
import { Card } from "./Card";
import { useAppSelector } from "../redux/hooks/hooks";

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

  const token = useAppSelector((state)=>state.auth.token)

  const addUserData = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/user/add`;

      const response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
        body: JSON.stringify(userData),
      });
      const result: any = (await response).json();
      await setUserData(result);
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
  // const [editUserId, setEditUserId] = React.useState<string | null>(null);
  //   const [editUserData, setEditUserData] = React.useState<user | null>(null);

  //   const handleEdit = (user: user) => {
  //     setEditUserId(user._id);
  //     setEditUserData(user);
  //   };

  const [user, setUser] = React.useState<user[]>([
    {
      _id: "",
      name: "",
      email: "",
      role: "",
    },
  ]);

  const token = useAppSelector(s=>s.auth.token)

  const LoadUsers = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/user`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token ? ` ${token}` : "",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const withIds = data.Users.map((item: user) =>
        item._id ? item : { ...item, _id: item._id },
      );
      setUser(withIds);
    } catch (error) {
      if (error) {
        console.log({ message: error });
      }
    }
  };

  // const updateRecord = async () => {
  //   try {
  //     const url = `${import.meta.env.VITE_API_URL}/book-issued/update/${editIssueId}`;
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token ? ` ${token}` : "",
  //       },
  //       body: JSON.stringify(editIssueData),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to update the record");
  //     }

  //     setEditIssueId(null);
  //     setEditIssueData(null);
  //     LoadIssues();
  //   } catch (error) {
  //     console.error("Error updating record:", error);
  //   }
  // };

  const deleteRecord = async (row: user) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/user/delete/${row._id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? ` ${token}` : "",
        },
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to delete the record");
      }
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
  }, []);

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
        searchPlaceholder="Search Books..."
      />
    </>
  );
}
