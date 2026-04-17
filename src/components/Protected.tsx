import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";


export default function Protected() {
    const isAuthenticated = useAppSelector(state => state.auth.status)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        setTimeout(() => {
            isAuthenticated && setLoading(false);
        }, 1000)
    }, [isAuthenticated])
    return (
        <>
            {loading ? (
                <div className="w-full!  h-[90vh]! flex items-center justify-center relative ">
                    <ClipLoader
                        color="#ffb1b1"
                        size={55} />
                </div>
            ) : isAuthenticated ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}