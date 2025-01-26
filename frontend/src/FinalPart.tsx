
import { useEffect, useState } from "react";
import fonts from './css/Fonts.module.css'

import styles from  './css/FinalPart.module.css'
import Dashboard from './css/assets/dashboard.png'
import Medal from  './css/assets/medal.png'
import Thought from './css/assets/thought.png'
import HandsOn from './css/assets/training.png'

const FinalPart: React.FC = () => {
    return (
        <section className={styles.finalContainer}>
            <GeauxAstro/>
            <Features/>
            <Stats/>
        </section>
    )
}


const GeauxAstro: React.FC = () => {
    return (
        <div className={styles.geauxContainer}>
            <p className={styles.geauxHeading}>OPEN SOURCE THEME AND UI COMPONENTS</p>
            <h2 className={`${styles.geauxContent} ${fonts.geauxFont}`}>
                Geaux Astro helps you<br/> craft beautiful websites <br/>efficiently
            </h2>
        </div>
    )
}

const Features: React.FC = () => {
    return (
        <div className={styles.featuresContainer}>
            <section className={styles.textSection}>
                <div className={styles.textItem}>
                    <img src={Medal} alt="Certificate Icon"/>
                    <div className={styles.text}>
                        <h3>Certificate Distribution</h3>
                        <p>We offer certificates to validate and recognize your achievement.</p>
                    </div>
                </div>
                <div className={styles.textItem}>
                    <img src={Thought} alt="Knowledge icon"/>
                    <div className={styles.text}>
                        <h3>Knowledge</h3>
                        <p>We deliver transformative knowledge that empowers and inspires.</p>
                    </div>
                </div>
                <div className={styles.textItem}>
                    <img src={HandsOn} alt="Hands on training"/>
                    <div className={styles.text}>
                        <h3>Hands-on Experience</h3>
                        <p>We provide hands-on experience for real-world learning. You learn best by doing.</p>
                    </div>
                </div>
            </section>
            <section className={styles.dashboard}>
                <img src={Dashboard} alt="dashboard"/>
            </section>
        </div>
    )
}


const Stats: React.FC = () => {
    const [stats, setStats] = useState({
        placed: 0,
        unplaced: 0,
        total: 0
    });

    const fetchStats = async () => {
        try {
            const response = await fetch("http://project.editnow.site/api/stats") 
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Frontend: Failed to fetch stats:", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className={styles.endingNoteContainer}>
            <section className={`${fonts.robotoWelcome} ${styles.leftContainer}`}>
                <h1>Empower your future</h1> 
                <h1>with cutting-edge skills. </h1> 
                <h1>New, Embrace innovation, </h1>
                <h1>master technology, & </h1>
                <h1>shape the digital world.</h1>  
                <h1>  Your journey to success </h1>
                <h1> starts here.</h1>
            </section>
            <section className={styles.rightSection}>
                <section className={styles.topSection}>
                    <p> Join our course with a proven track record of success, 
                        where learning isn't just about gaining skills; 
                        it's about growing them. Join us, learn with confidence,
                        and watch your skills soar.
                    </p>
                </section>
                <section className={styles.bottomSection}>
                    <div>
                        <p className={styles.statHeading}>Total Students</p>
                        <p className={styles.count}>{stats.total}</p>
                    </div>
                    <div>
                        <p className={styles.statHeading}>Placed Students</p>
                        <p className={styles.count}>{stats.placed}</p>
                    </div>
                    <div>
                        <p className={styles.statHeading}>Unplaced Students</p>
                        <p className={styles.count}>{stats.unplaced}</p>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default FinalPart
