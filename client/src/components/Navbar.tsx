import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const { signOut, } = useAuthStore();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link to={'/'}>
                    <img src="/logo.png" alt="Logo" className={styles.navbarLogo} />
                </Link>
                <span className={styles.dashboardText}>Dashboard</span>
            </div>
            <div className={styles.navbarRight}>
                <button className={styles.signoutLink} onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;