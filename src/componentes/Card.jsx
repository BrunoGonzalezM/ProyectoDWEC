import React from 'react';
import "../styles/stylesCard.css"
export default function Card({ imgUrl, title }) {
  return (
    <div className="cardComponent">
      <img className="imgUrl" src={imgUrl} alt="" />
      <p className='titulo'>{title}</p>
    </div>
  );
}
