import baner from '../../assets/img/Banner.jpg';
import styles from "./styles.module.scss"
function Buner() {
  return <img className={styles.banerContainer}  src={baner} alt="baner" />;
}
export default Buner;
