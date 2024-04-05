import React from 'react';
import { Input } from "./";

function RoomTypes({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Room Type</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test4" />
          <span className="checkmark"></span>Any
        </label>
        <Input
          handleChange={handleChange}
          value="living room"
          title="Living Room"
          name="test4"
        />
        <Input
          handleChange={handleChange}
          value="bedroom"
          title="Bedroom"
          name="test4"
        />
        <Input
          handleChange={handleChange}
          value="outdoor"
          title="Outdoor"
          name="test4"
        />
      </div>
    </div>
  );
}

export default RoomTypes;