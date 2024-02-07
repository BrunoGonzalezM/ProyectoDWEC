import React from 'react';
import "../styles/stylesCard.css"
const Card = ({ imgUrl, title, desc }) => {
  return (
      <div className="cardComponent">
        <img className="imgUrl" src={imgUrl} alt="" />
        <div className='gradiente'></div>
        <p className='titulo'>{title}</p>
        <p className='descripcion'>{desc}</p>
      </div>
  );
}

export default Card;