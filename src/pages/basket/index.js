import styles from './styles.module.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Main from '../../components/main';
import basketImg from '../../assets/icons/basket.svg';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasket, removeFromBasket } from '../../redux/action/index';
import Card from '../../components/cardComponent';
import { Link } from 'react-router-dom';

function Basket() {
  const dispatch = useDispatch();

  const { basket, loading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  const handleRemoveFromBasket = itemId => {
    dispatch(removeFromBasket(itemId));
  };
  const totalPrice = basket.reduce((total, item) => {
    //  строкa в число
    const price = parseFloat(item.price);
    return total + (isNaN(price) ? 0 : price);
  }, 0);

  const itemNames = basket.map(item => {
    return <p key={item.id}>{item.name}</p>;
  });
  return (
    <>
      <Header />
      <Main h3prop={'Basket'}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {basket.length === 0 ? (
          <div>
            <p>Your basket is empty...</p>

            <Link to="/">
              <button className={styles.button}>Go to shoping</button>
            </Link>
          </div>
        ) : (
          <ul className={styles.listContainer}>
            {basket.map(item => (
              <Card
                key={item.id}
                item={item}
                handleClick={handleRemoveFromBasket}
                styleLi={{
                  maxWidth: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '15px',
                }}
                bgImg={basketImg}
                styleSpan={{
                  borderLeft: ' 1px solid rgba(0, 0, 0, 0.7)',
                  padding: '20px',
                }}
              />
            ))}
            <div className={styles.totalPriceContainer}>
              <h3>Total</h3>
              <div className={styles.names}> {itemNames}</div>

              <p className={styles.sum}>
                Total Price:{ ` $:${totalPrice.toFixed(2)}`}
              </p>
            </div>
          </ul>
        )}
      </Main>
      <Footer />
    </>
  );
}
export default Basket;
