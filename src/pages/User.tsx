import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useAppSelector } from "../redux/hooks";
import UserAdd from "../components/User/UserAdd";
import UserTable from "../components/User/UserTable";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}
export function UserPage() {
  const token = useAppSelector(state => state.auth.token)

  const decodedPayload = jwtDecode(token ?? "") as CustomJwtPayload;

  const userRole = decodedPayload.role;

  return (
    <div className=" w-full font-[Poppins]! ml-auto">
      {userRole === "Admin" ? (
        <>
          <UserAdd />
          <UserTable />
        </>
      ) : null}

    </div>
  );
}
