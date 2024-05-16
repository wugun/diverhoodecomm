import React from 'react';

const Button = ({ onClickHandler, value, title, selected }) => {
    return (
      <button onClick={onClickHandler} value={value} className={`recommended-button ${selected ? 'selected' : ''}`}>
        {title}
      </button>
    );
  };
  
  export default Button;