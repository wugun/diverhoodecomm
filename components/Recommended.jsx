import React from 'react';
import { Button } from "./";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="rugs" title="Rugs" />
          <Button onClickHandler={handleClick} value="sofas" title="Sofas" />
          <Button onClickHandler={handleClick} value="home decors" title="Home Decors" />
        </div>
      </div>
    </>
  );
};

export default Recommended;