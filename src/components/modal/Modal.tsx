import React, { FC, useEffect, useState } from 'react';

import './modal.scss';
import { useSelector } from '../../services/store';
import ModalCard from '../modalCard/ModalCard';
import MyBytton from '../ui/myButton/MyBytton';

const Modal: FC = () => {
  const [arrModalText, setArrModalText] = useState<{focus: boolean, discount: string}[]>([
    {focus: false, discount: '-40%'},
    {focus: false, discount: '-50%'},
    {focus: false, discount: '-60%'},
  ]);
  const [visible, setVisible] = useState<boolean>(false);
  const time = useSelector(state => state.timer.time);
  const isLoading = useSelector(state => state.fitness.isLoadindStatus);
  const cards = useSelector(state => state.fitness.cards);
  const arrIsDiscount = cards.filter(item => (item.isDiscount && item.name !== 'навсегда'));
  const arrNotPopDisc = cards.filter(item => (!item.isPopular && !item.isDiscount && item.name !== 'навсегда'));

  const focusCard = (id: number) => {
    setArrModalText(prevItems => 
      prevItems.map(item => 
        ({ ...item, focus: false }) 
      )
    )
    setArrModalText(prevItems => 
      prevItems.map((item, index) => 
        index === id ? { ...item, focus: true } : item
      )
    )
  }

  useEffect(() => {
    if(time === 0) {
      setVisible(true)
    }
  }, [time])
  
  let mainModal = 'modal-overlay fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center transition-all';
  if(visible) {
    mainModal += ' active';
  }

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className={mainModal} onClick={closeModal}>
      <div className="modal bg-[#F5F7F7] relative" onClick={(e) => e.stopPropagation()}>
        <div className="modal-absol absolute text-white top-0 left-11">горящее предложение</div>
        <button className="modal-close absolute" onClick={closeModal}>&times;</button>
        <h2 className="modal-title text-center">Не упусти свой <span className="accent">последний шанс</span></h2>
        <h4 className="modal-subtitle text-center">Мы знаем, как трудно начать.. <span className="strong">Поэтому!</span></h4>
        <p className="modal-content mb-10">Дарим скидку для <span className="accent">лёгкого старта</span> 🏃‍♂️</p>
        <div className="modal__box">
          <h5 className="modal__box-subtitle ">Посмотри, что мы для тебя приготовили 🔥</h5>

          <div className="modal__box-list flex gap-5 mb-10">
            {isLoading && <h5 className="font-medium text-lg">Загрузка...</h5>}
            {!isLoading && arrNotPopDisc.map((item, index) => {
              return (
                <ModalCard
                  key={item.id}
                  onClick={() => focusCard(index)}
                  name={item.name}
                  price={item.price}
                  secondPrice={arrIsDiscount[index].price}
                  discount={arrModalText[index].discount}
                  onFocus={arrModalText[index].focus}
                />
              )
            })}
          </div>

        </div>
        <MyBytton isBig={false} text='Начать тренироваться'/>
      </div>
    </div>
  );
};

export default Modal;