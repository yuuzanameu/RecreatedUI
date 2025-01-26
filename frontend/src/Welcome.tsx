
import styles from "./css/Welcome.module.css"
import fonts from './css/Fonts.module.css'


const Welcome: React.FC = () => {
    return (
        <> 
            <section className={styles.welcome}>
                <h1 className={`${styles.heading} ${fonts.robotoWelcome}`}>
                    Learn from the best, be<br /> your best..
                </h1>
                <p className={`${styles.subheading}`}>
                    Give yourself an upgrade with our inspiring online courses 
                    <br/> and join a global community of learners
                </p>
                <a href="#" className={styles.getStarted}>Get Started</a>
            </section>
        </>
  );
};

export default Welcome
