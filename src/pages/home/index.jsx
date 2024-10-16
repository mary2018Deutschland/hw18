import styles from './styles.module.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Main from '../../components/main';
import Buner from '../../components/baner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods, addToBasket } from '../../redux/action';
import { selectGoods, selectLoading, selectError } from '../../redux/selector';
import CardList from '../../components/cardList';

function Home() {
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setMessage(`${error}`);
    } else if (loading) {
      setMessage('load...');
    } else {
      setMessage('');
    }

    const timer = setTimeout(() => {
      setMessage('');
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading, error]);

  const handleAddToBasket = itemId => {
    const item = goods.find(good => good.id === itemId);
    if (item) {
      dispatch(addToBasket(item));
    } else {
      console.error('Item not found');
    }
  };

  return (
    <>
      <Header />
      <Buner />
      <Main h3prop={'Goods'}>
        <CardList
          styleLi={{ maxWidth: '330px'}}
          handleClick={handleAddToBasket}
          btnName={'+'}
          items={goods}
          styleSpan={{ marginBottom: "10%"}}
        >
          {message && (
            <div className={styles.massegeContainer}>
              <p>{message}</p>
            </div>
          )}
        </CardList>
      </Main>
      <Footer />
    </>
  );
}

export default Home;
