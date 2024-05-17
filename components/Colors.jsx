import React, { useEffect, useState } from 'react';
import { Input } from "./";

const Colors = ({ value, handleChange, showAny = true }) => {
  // State to manage the selected color
  const [selectedColor, setSelectedColor] = useState('');

  // Update the selected color state when the value prop changes
  useEffect(() => {
    setSelectedColor(value);
  }, [value]);

  // Function to handle color change
  const handleColorChange = (event) => {
    const newValue = event.target.value;
    setSelectedColor(newValue);
    handleChange(event); // Call the parent component's handleChange function
  };

  return (
    <>
      <div>
        <h2 className="sidebar-title">Color</h2>
        <div className="text-sm">
          {showAny && (
            <label className="sidebar-label-container">
              <input
                type="radio"
                value=""
                name="test1"
                checked={selectedColor === ''}
                onChange={handleColorChange}
              />
              <span className="checkmark all"></span>
              Any
            </label>
          )}

          <Input
            handleChange={handleColorChange}
            value="black"
            title="Black"
            name="test1"
            color="black"
            checked={selectedColor === 'black'}
          />

          <Input
            handleChange={handleColorChange}
            value="blue"
            title="Blue"
            name="test1"
            color="blue"
            checked={selectedColor === 'blue'}
          />

          <Input
            handleChange={handleColorChange}
            value="red"
            title="Red"
            name="test1"
            color="red"
            checked={selectedColor === 'red'}
          />

          <Input
            handleChange={handleColorChange}
            value="green"
            title="Green"
            name="test1"
            color="green"
            checked={selectedColor === 'green'}
          />

          <label className="sidebar-label-container">
            <input
              type="radio"
              value="white"
              name="test1"
              checked={selectedColor === 'white'}
              onChange={handleColorChange}
            />
            <span
              className="checkmark"
              style={{ background: "white", border: "2px solid black" }}
            ></span>
            White
          </label>
        </div>
      </div>
    </>
  );
};

export default Colors;