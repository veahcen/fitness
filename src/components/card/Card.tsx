import { FC } from 'react';
import './card.scss';
import { useSelector } from '../../services/store';

interface ICardProps {
  small: boolean
  name: string
  price: number
  text: string
  onFocus: boolean
  secondPrice: number
  discount?: string
  onClick?: () => void
}

const Card: FC<ICardProps> = (props) => {
  const time = useSelector(state => state.timer.time);
  const {small, name, price, text, onClick, onFocus, secondPrice, discount} = props;
  let card = 'card', cardHeader = 'card__header', cardPrice = 'card__price', cardDescr = 'card__description text-center', oldPrice = "card__oldPrice";
  if (!small) {
    card += ' card-big';
    cardHeader += ' header-big';
    cardPrice += ' price-big';
    cardDescr = 'card__description description-big';
    oldPrice += ' oldPrice-big'
  }
  
  if(onFocus) {
    card += ' card-selected';
  }
  if(time !== 0) {
    card += ' card-discount';
  }

  return (
    <article className={card} onClick={onClick} >
      {time === 0 ? (<>
        <h3 className={cardHeader}>{name}</h3>
        <div className={cardPrice}>{price}₽</div>
        <p className={cardDescr}>{text}</p>
      </>) :
      (<>
        <div className="discount">{discount}</div>
        <h3 className={cardHeader}>{name}</h3>
        <div className={cardPrice}>{secondPrice}₽</div>
        <div className={oldPrice}>{price}₽</div>
        <p className={cardDescr}>{text}</p>
      </>)}
    </article>
  )

};

export default Card;