import UserForm, { UserTable } from "../components/User";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useAppSelector } from "../redux/hooks";

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
            <UserForm />
            <UserTable />
          </>
        ) : null}

      </div>
  );
}
