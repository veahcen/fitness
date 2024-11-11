/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react';

import men from '../../resources/men.png';
import './mainPage.scss'
import Card from '../card/Card';
import MyBytton from '../ui/myButton/MyBytton';
import { useDispatch, useSelector } from '../../services/store';
import { fetchCards } from '../../services/tariffs/slice';
import Modal from '../modal/Modal';

export interface IText {
  text: string
  focus: boolean
  discount: string
}

const MainPage: FC = () => {
  const [arrText, setArrText] = useState<IText[]>([
    {text: 'Чтобы просто начать 👍🏻', focus: false, discount: '-30%'},
    {text: 'Привести тело впорядок 💪🏻', focus: false, discount: '-40%'},
    {text: 'Изменить образ жизни 🔥', focus: false, discount: '-50%'},
    {text: 'Всегда быть в форме и поддерживать своё здоровье ⭐️', focus: false, discount: '-70%'}
  ]);

  const cards = useSelector(state => state.fitness.cards);
  const isLoading = useSelector(state => state.fitness.isLoadindStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
    // eslint-disable-next-line
  }, []);

  const arrNotPopDisc = cards.filter(item => !item.isPopular && !item.isDiscount);
  const arrIsPopular = cards.filter(item => item.isPopular);

    const focusCard = (id: number) => {
      setArrText(prevItems => 
        prevItems.map(item => 
          ({ ...item, focus: false }) 
        )
      )
      setArrText(prevItems => 
        prevItems.map((item, index) => 
          index === id ? { ...item, focus: true } : item
        )
      )
    }

    
  return (
    <main className="main">
      <h1 className="main__header text-center">ВЫБЕРЕТЕ ПОДХОДЯЩИЙ ТАРИФНЫЙ ПЛАН</h1>
      <div className="main-box flex justify-center ">
        <div className="main__img">
          <img className="w-full" src={men} alt="men" />
        </div>
        <div className="main__info">
          
          <div className="flex gap-3 mb-10">
            {isLoading && <h5 className="font-medium text-lg">Загрузка...</h5>}
            {!isLoading && arrNotPopDisc.map((item, index) => {
              if(index !== 3) {
                return (
                  <Card
                    onClick={() => focusCard(index)}
                    onFocus={arrText[index].focus}
                    discount={arrText[index].discount}
                    key={item.id}
                    small={true}
                    secondPrice={arrIsPopular[index].price}
                    text={arrText[index].text}
                    {...item}
                  />
                )
              } else {return null}
            })}
          </div>
          
          <div className="mb-2.5">
            {arrNotPopDisc.map((item, index) => {
              if(index === 3) {
                return (
                  <Card
                    onClick={() => focusCard(index)}
                    onFocus={arrText[index].focus}
                    discount={arrText[index].discount}
                    key={item.id}
                    small={false}
                    secondPrice={arrIsPopular[index].price}
                    text={arrText[index].text}
                    {...item}
                  />
                )
              } else {return null}
            })}
          </div>

          <p className="main__info-text">Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц</p>

          <div className="mb-10">
            <input type="checkbox" className="custom-checkbox" id="contract" name="contract" value="yes"/>
            <label className="main__info-contract" htmlFor="contract">
              Я соглашаюсь с <a className="link" href="#">Правилами сервиса</a> и условиями
              <a className="link" href="#"> Публичной оферты</a>.
            </label>
          </div>

          <MyBytton isBig={true} text='КУПИТЬ'/>


          <p className="main__info-description">Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по истечению купленного периода. Дальнейшие списания по тарифам участвующим в акции осуществляются по полной стоимости согласно оферте.</p>

        </div>
      </div>

      <Modal/>
    </main>
  );
};

export default MainPage;