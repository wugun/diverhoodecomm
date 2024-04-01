import React from 'react';
import { Input } from "./";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="rugs"
          title="Rugs"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="sofas"
          title="Sofas"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="home decors"
          title="Home Decors"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;