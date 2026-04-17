import React from "react";
import UserAddForm, { user } from "./UserForm";
import { useAppSelector } from "../../redux/hooks";
import { api } from "../../utils/api";



export default function UserAdd() {
  const [addUser, setAddUser] = React.useState<Boolean>(false);
  const [userData, setUserData] = React.useState<user>({
    name: "",
    mobileNo: "",
    email: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = React.useState<Boolean>(false)

  const handleForm = async () => {
    setAddUser((prev) => !prev);
  };

  const token = useAppSelector((state) => state.auth.token)

  const addUserData = async () => {
    try {
      setLoading(true)
      const data = await api.post('/user/add', userData, token ? token : '')
      const result = await data.json();
      setUserData(result);
      setLoading(false);
      setTimeout(() => {
        setAddUser && setAddUser(prev => !prev)
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" box-border! w-full! flex justify-between font-[Poppins]! items-center ">
      <div>
        <h1 className="text-2xl">
          <span className="text-red-500">User</span> List
        </h1>
        <p className="text-[15px]">Manage Librarians</p>
      </div>
      {addUser && (
        // <div className=" text-red-400">
        //   <form
        //     className="w-132.5 h-95.25 top-20 left-110 border right-50 absolute bg-white flex flex-col pt-5 rounded-2xl items-center z-20"
        //     style={{ display: addUser ? "flex" : "none" }}
        //   >
        //     <Typography
        //       className="w-full flex justify-center  border-b! border-b-gray-300!"
        //       variant="h4"
        //       style={{ fontSize: "40px", borderBottom: "2px solid white" }}
        //     >
        //       Add User
        //     </Typography>
        //     <div className="p-7 pt-3 ml-auto mr-auto">
        //       <TextField
        //         id="standard-basic"
        //         label="Name"
        //         name={userData.name}
        //         className="text-[20px] w-full! mb-2 mt-3"
        //         onChange={(e) => {
        //           setUserData((prev) => ({
        //             ...prev,
        //             name: e.target.value,
        //           }));
        //         }}
        //         variant="standard"
        //       />
        //       <TextField
        //         id="standard-multiline-static"
        //         label="Email"
        //         name={userData.email}
        //         className="text-[20px] w-full mb-3"
        //         variant="standard"
        //         onChange={(e) => {
        //           setUserData((prev) => ({
        //             ...prev,
        //             email: e.target.value,
        //           }));
        //         }}
        //       />
        //       <div className="flex gap-10 mb-3 mt-3">
        //         <TextField
        //           id="standard-basic"
        //           className="text-[20px] w-[50%] mb-3"
        //           label="Mobile No"
        //           name={userData.mobileNo}
        //           onChange={(e) => {
        //             setUserData((prev) => ({
        //               ...prev,
        //               mobileNo: e.target.value,
        //             }));
        //           }}
        //           variant="standard"
        //         />
        //         <TextField
        //           id="standard-basic"
        //           className="text-[20px] w-[50%] mb-3"
        //           label="Role"
        //           name={userData.role}
        //           onChange={(e) => {
        //             setUserData((prev) => ({
        //               ...prev,
        //               role: e.target.value,
        //             }));
        //           }}
        //           variant="standard"
        //         />
        //       </div>

        //       <div className="flex w-full! gap-10 items-baseline mb-3">
        //         <TextField
        //           id="standard-basic"
        //           label="Password"
        //           className="w-full!"
        //           name={userData.password}
        //           onChange={(e) => {
        //             setUserData((prev) => ({
        //               ...prev,
        //               password: e.target.value,
        //             }));
        //           }}
        //           variant="standard"
        //         />
        //       </div>

        //       <div className="w-full! flex justify-between mt-5">
        //         <Button variant="text" onClick={handleForm}>
        //           Cancel
        //         </Button>

        //         <Button variant="contained" onClick={addUserData}>
        //           Add User
        //         </Button>
        //       </div>
        //     </div>
        //   </form>
        // </div>
        <UserAddForm setUserData={setUserData}
          handleForm={handleForm}
          addUser={addUser}
          loading={loading}
          userData={userData}
          addUserData={addUserData}
          setAddUser={setAddUser} />
      )}

      <button
        className="flex text-amber-50 w-30 items-center justify-center bg-green-500 hover:bg-green-600 h-10 mr-5 rounded"
        onClick={handleForm}
      >
        Add User
      </button>
    </div>
  );
}