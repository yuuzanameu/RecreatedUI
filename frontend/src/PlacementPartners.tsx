
import styles from './css/PlacementPartners.module.css'
import fonts from './css/Fonts.module.css'

import AirbnbLogo from './css/assets/airbnb.png';
import CotyLogo from './css/assets/coty.png';
import GrabyoLogo from './css/assets/grabyo.png';
import LifegroupsLogo from './css/assets/lifegroups.png';
import LillyLogo from './css/assets/lilly.png';
import MicrosoftLogo from './css/assets/microsoft.png';
import MyabLogo from './css/assets/myab.png';
import TailusLogo from './css/assets/tailus.png';


const PlacementPartners: React.FC = () => {
    const logos = [
        { key: "Airbnb Logo", src: AirbnbLogo, alt: "Airbnb Logo" },
        { key: "Coty Logo", src: CotyLogo, alt: "Coty Logo" },
        { key: "Grabyo Logo", src: GrabyoLogo, alt: "Grabyo Logo" },
        { key: "Lifegroups Logo", src: LifegroupsLogo, alt: "Lifegroups Logo" },
        { key: "Lilly Logo", src: LillyLogo, alt: "Lilly Logo" },
        { key: "Microsoft Logo", src: MicrosoftLogo, alt: "Microsoft Logo" },
        { key: "Myab Logo", src: MyabLogo, alt: "Myab Logo" },
        { key: "Tailus Logo", src: TailusLogo, alt: "Tailus Logo" },
    ];

    return (
        <section className={`${styles.placementPartners}`}>
            <div className={`${styles.headingContainer}`}>
                <h2 className={`${styles.heading} ${fonts.placementHeading}`}>
                    Our Placement Partners
                </h2>
            </div>
            <div className={styles.gridOfLogos}>
                {logos.map((logo) => (
                    <Logo key={logo.key} src={logo.src} alt={logo.alt} />
                ))}
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.placementFooter}>
                    and, more<br /> companies
                </div>
            </div>
        </section>
    );
};

interface LogoProps {
    src: string;
    alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
    return ( 
        <div className={styles.gridItem}>
            <img src={src} alt={alt} />;
        </div>)
};


export default PlacementPartners
