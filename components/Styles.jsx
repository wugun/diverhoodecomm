import React from 'react';
import { Input } from "./";

function Styles({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Style</h2>

      <div className="text-sm">
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test3" />
          <span className="checkmark"></span>Any
        </label>
        <Input
          handleChange={handleChange}
          value="modern"
          title="Modern"
          name="test3"
        />
        <Input
          handleChange={handleChange}
          value="scandinavian"
          title="Scandinavian"
          name="test3"
        />
        <Input
          handleChange={handleChange}
          value="geometric"
          title="Geometric"
          name="test3"
        />
      </div>
    </div>
  );
}

export default Styles;