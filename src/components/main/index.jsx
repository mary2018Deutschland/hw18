import styles from './styles.module.scss';
function Main({ children, h3prop }) {
  return (
    <main className={styles.mainContainer}>
      
      <h3>{h3prop}</h3>
      {children}
    </main>
  );
} 
export default Main;
