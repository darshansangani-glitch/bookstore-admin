import Userform, { UserTable } from "../components/User";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}
export function UserPage() {
<<<<<<< Updated upstream
  const token = localStorage.getItem("token-info");
=======
  const token = useAppSelector(state => state.auth.token)
>>>>>>> Stashed changes

  const decodedPayload = jwtDecode(token ?? "") as CustomJwtPayload;

  const userId = decodedPayload.id;
  const userRole = decodedPayload.role;

  return (
    <div className=" w-full pt-20! font-[Poppins]! ml-auto p-5">
      {userRole === "Admin" ? (
        <Userform />
      ) : (
        <div className="bg-white  w-full! flex h-20 m  ml-auto items-center justify-between relative">
          <div className="">
            <h1 className="text-4xl">
              <span className="text-red-500">Librarians</span> Available
            </h1>
          </div>
        </div>
      )}
      <UserTable />
    </div>
  );
}
