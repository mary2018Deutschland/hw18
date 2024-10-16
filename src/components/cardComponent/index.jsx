import styles from './styles.module.scss';
function Card({ item, btnName, handleClick, bgImg, styleLi, styleSpan }) {
  return (
    <li style={styleLi} className={styles.cardContainer} key={item.id}>
      <img src={item.image} alt={item.name} />
      <div style={styleSpan}>{item.name} </div>
      <li className={styles.priceAndBtn}>
        <span> ${item.price}</span>
        <button
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundPosition: 'center',
            backgroundSize: '60%',
            backgroundRepeat: 'no-repeat',
          }}
          onClick={() => handleClick(item.id)}
        >
          {btnName}
        </button>
      </li>
    </li>
  );
}

export default Card;
