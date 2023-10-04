import styles from './loader.module.scss'
import loaderGif from '../../assets/LoaderBalls.svg'

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <img src={loaderGif} alt="Loading......."/>
            </div>
        </div>
    );
};

export default Loader;