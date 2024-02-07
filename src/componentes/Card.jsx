import React from 'react';
import "../styles/stylesCard.css"
const Card = ({ imgUrl, title, desc ,movie }) => {
  return (
      <div className="cardComponent">
        <img className="imgUrl" src={imgUrl} alt="" />
        <div className="gradiente"></div>
        <p className='titulo'>{title}</p>
        <p className='titulo2'>{desc}</p>
      </div>
  );
}

export default Card;