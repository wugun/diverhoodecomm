import React from 'react';
import { Input } from "./";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title">Price</h2>
        <div className="text-sm">
          <label className="sidebar-label-container">
            <input onChange={handleChange} type="radio" value="" name="test2" />
            <span className="checkmark"></span>Any
          </label>

          <Input
            handleChange={handleChange}
            value={150}
            title="$0 - $150"
            name="test2"
          />

          <Input
            handleChange={handleChange}
            value={300}
            title="$150 - $300"
            name="test2"
          />

          <Input
            handleChange={handleChange}
            value={450}
            title="$300 - $450"
            name="test2"
          />

          <Input
            handleChange={handleChange}
            value={10000}
            title="Over $450"
            name="test2"
          />
        </div>
      </div>
    </>
  );
};

export default Price;