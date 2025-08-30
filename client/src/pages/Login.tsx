import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { Navigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [OTPSent, setOTPSent] = useState(false)
    const [OTP, setOTP] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState('')

    const { login, message, getToken } = useAuthStore() as any

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await login(email)
        setOTPSent(true)
    }

    const handleToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const success = await getToken(parseInt(OTP), email)
        if (success) {
            setRedirect(true)
        } else {
            setError('Invalid OTP')
        }
    }

    if (redirect) return <Navigate to={'/'} />

    return <>
        <form>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            {OTPSent ? <>
                <input type="number" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                <button onClick={handleToken}>Login</button>
            </> : <>
                <button onClick={handleLogin}>Get OTP</button>
                <p>{error}</p>
            </>}
        </form>
        <p>{message}</p>
    </>
}

export default Login