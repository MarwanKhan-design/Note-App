// src/components/PrivateRoute.tsx
import { useEffect } from "react"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { checkToken, isTokenValid, user, loading } = useAuthStore()

    useEffect(() => {
        checkToken()
    }, [checkToken])

    if (loading) return <p>Loading...</p>
    if (!isTokenValid || !user) return <Navigate to="/login" />

    return <>{children}</>
}

export default PrivateRoute
