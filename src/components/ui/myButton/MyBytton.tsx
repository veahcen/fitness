import React, { FC } from 'react';

import './myButton.scss';

interface IMyButton {
  onClick?: (e: React.MouseEvent) => void,
  text: string,
  isBig: boolean,
  disable?: boolean
}

const MyBytton: FC<IMyButton> = ({ onClick, text, isBig, disable }) => {
  let btn = 'button';
  if(!isBig) {
   btn += ' small-btn';  
  }

  return (

    <button className={btn}>
      {text}
    </button>
  );
};

export default MyBytton;