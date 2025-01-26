
import styles from './css/Footer.module.css'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <div className={`${styles.footer}`}>
            <h1 className={styles.footerHeading}>LearnHub</h1>
            <p className={styles.copyright}>&copy; 2022 Tailwind Labs Inc. All Rights reserved</p>
            <Link className={styles.footerButton}to='/form'>Form</Link>
        </div>
    )

}


export default Footer; 
