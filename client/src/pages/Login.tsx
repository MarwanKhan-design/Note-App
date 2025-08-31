import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { Link } from "react-router-dom"
import styles from "../styles/signup.module.css"   // ✅ reuse Signup CSS

const Login = () => {
    const [email, setEmail] = useState("")
    const [OTPSent, setOTPSent] = useState(false)
    const [OTP, setOTP] = useState("")
    const [error, setError] = useState("")

    const { login, message, getToken } = useAuthStore() as any

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await login(email)
        setOTPSent(true)
    }

    const handleToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const success = await getToken(parseInt(OTP), email)
        if (!success) {
            setError("Invalid OTP")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h2>Login</h2>
                <p>Login with your email and OTP</p>

                <form className={styles.form}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    {OTPSent ? (
                        <>
                            <input
                                type="number"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                placeholder="Enter OTP"
                            />
                            <button onClick={handleToken} className={styles.btn}>
                                Login
                            </button>
                        </>
                    ) : (
                        <button onClick={handleLogin} className={styles.btn}>
                            Get OTP
                        </button>
                    )}

                    {error && <p className={styles.message}>{error}</p>}
                </form>

                <p className={styles.signin}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>

                <p className={styles.message}>{message}</p>
            </div>

            <div className={styles.right}></div>
        </div>
    )
}

export default Login
