import { UserTable } from "../components/User";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useAppSelector } from "../redux/hooks/hooks";
import UserForm from "../components/User";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}
export function UserPage() {
  const token = useAppSelector(state=>state.auth.token)

  const decodedPayload = jwtDecode(token ?? "") as CustomJwtPayload;

  const userRole = decodedPayload.role;

  return (
    <div className=" w-full pt-20! font-[Poppins]! ml-auto p-5">
      {userRole === "Admin" ? (
        <UserForm />
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
