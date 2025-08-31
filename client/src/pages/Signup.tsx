import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import styles from "../styles/signup.module.css"
import { Link } from "react-router-dom"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [OTPSent, setOTPSent] = useState(false)
    const [OTP, setOTP] = useState("")

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

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h2>Sign up</h2>
                <p>Sign up to enjoy the feature of HD</p>

                <form className={styles.form}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                    />
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
                                Signup
                            </button>
                        </>
                    ) : (
                        <button onClick={handleSignup} className={styles.btn}>
                            Get OTP
                        </button>
                    )}
                </form>

                <p className={styles.signin}>
                    Already have an account?? <Link to="/login">Sign in</Link>
                </p>

                <p className={styles.message}>{message}</p>
            </div>

            <div className={styles.right}></div>
        </div>
    )
}

export default Signup
