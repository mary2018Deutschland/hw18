import styles from './styles.module.scss';
import Nav from '../nav';
function Header() {
  return (
    <header className={styles.headerContainer}>
      <h3>Sticker - store</h3>
      <Nav />
    </header>
  );
}
export default Header;
