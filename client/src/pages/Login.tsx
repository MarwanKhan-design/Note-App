import { useState } from "react"
import { useAuthStore } from "../store/AuthStore"

const Login = () => {
    const [email, setEmail] = useState('')
    const [OTPSent, setOTPSent] = useState(false)
    const [OTP, setOTP] = useState('')

    const { login, message, getToken } = useAuthStore() as any

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await login(email)
        setOTPSent(true)
    }

    const handleToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await getToken(parseInt(OTP), email)
    }

    return <>
        <form>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            {OTPSent ? <>
                <input type="number" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                <button onClick={handleToken}>Login</button>
            </> : <>
                <button onClick={handleLogin}>Get OTP</button>
            </>}
        </form>
        <p>{message}</p>
    </>
}

export default Login