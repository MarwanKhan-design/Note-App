import { useState } from "react"
import { useAuthStore } from "../store/authStore"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [OTPSent, setOTPSent] = useState(false)
    const [OTP, setOTP] = useState('')

    const { signup, message, getToken } = useAuthStore() as any

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await signup(name, email)
        setOTPSent(true)
    }

    const handleToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await getToken(parseInt(OTP), email)
    }

    return <>
        <form>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            {OTPSent ? <>
                <input type="number" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                <button onClick={handleToken}>Signup</button>
            </> : <>
                <button onClick={handleSignup}>Get OTP</button>
            </>}
        </form>
        <p>{message}</p>
    </>
}
export default Signup