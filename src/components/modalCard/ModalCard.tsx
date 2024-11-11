import React, { FC } from 'react';

import './modalCard.scss';

interface IModalCardProps {
  name: string
  price: number
  onFocus: boolean
  secondPrice: number
  discount?: string
  onClick?: () => void
}

const ModalCard: FC<IModalCardProps> = (props) => {

  const {name, price, onFocus, secondPrice, discount, onClick} = props;
  let card = "modal__card relative";
  let focus = 'modal__card-focus';
  if(onFocus) {
    card += ' modal__card-selected';
    focus += ' modal__card-focusActive'
  }


  return (
    <div className={card} onClick={onClick}>
      <div className={focus}></div>
      <h6 className="modal__card-header">{name}</h6>
      <div className="modal__card-oldPrice relative">{price}₽</div>
      <div className="line"></div>
      <div className="discount-modal absolute">{discount}%</div>
      <div className="modal__card-price relative">{secondPrice}₽</div>
    </div>
  );
};

export default ModalCard;