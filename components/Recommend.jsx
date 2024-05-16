import React from 'react';
import { Button } from ".";

const Recommend = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Category</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="Any" title="All Products" />
          <Button onClickHandler={handleClick} value="Rug" title="Rugs" />
          <Button onClickHandler={handleClick} value="Sofa" title="Sofas" />
          <Button onClickHandler={handleClick} value="Home Decor" title="Home Decors" />
        </div>
      </div>
    </>
  );
};

export default Recommend;