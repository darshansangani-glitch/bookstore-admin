import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../redux/hooks/hooks";


export default function Protected() {
    const isAuthenticated = useAppSelector(state => state.auth.status)

    return (
        <>
            {isAuthenticated ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}