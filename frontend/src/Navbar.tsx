import styles from './css/Navbar.module.css';
import fonts from './css/Fonts.module.css'
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <Link to='/home' className={`${styles.highlight} ${fonts.LearnHub}`}>LearnHub</Link>
                </div>
                <Link to='/form' className={styles.adminButton}>Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;

