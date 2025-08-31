import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const PublicRoute = ({ children }: { children: any }) => {
    const { isTokenValid, user } = useAuthStore()

    // ✅ If user is already logged in, redirect them away from login/signup
    if (isTokenValid && user) {
        return <Navigate to="/" />
    }

    return <>{children}</>
}

export default PublicRoute
