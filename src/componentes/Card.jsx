import React from 'react';
import "../styles/stylesCard.css"
const Card = ({ imgUrl, title, desc }) => {
  return (
    <>
      <div className="cardComponent">
        <img className="imgUrl" src={imgUrl} alt="NO DISPONIBLE" />
        <div className='gradiente'></div>
        {!desc ? (
          <p className='tituloAlternativo'>{title}</p>
        ) : (
          <>
            <p className='titulo'>{title}</p>
            <p className='descripcion'>{desc}</p>
          </>
        )}
      </div>
    </>
  );
}

export default Card;