import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import { Navigate } from "react-router-dom"

const Home = () => {
    const { user, checkToken, isTokenValid, loading } = useAuthStore()

    useEffect(() => {
        checkToken()
    }, [checkToken])

    if (loading) return <p>Loading...</p>
    if (!isTokenValid || !user) return <Navigate to="/login" />

    return (
        <>
            <h1>Welcome, {user.name}</h1>
            <p>{user.email}</p>
        </>
    )
}

export default Home
