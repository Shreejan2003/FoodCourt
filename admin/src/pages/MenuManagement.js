import React, { useState } from "react";
import "./MenuManagement.scss";

const MenuManagement = () => {
  const foodOptions = {
    breakfast: [
      "Milk Tea",
      "Black Tea",
      "Milk Coffee",
      "Black Coffee",
      "Egg Toast",
      "Tarkari",
      "Malpwa",
    ],
    lunch: ["Chicken Roast", "Chicken gravy", "Veg Rice Set", "Paneer"],
    snacks: ["Fried Rice", "Lassi", "Mo:Mo:", "Chowmein", "Fruits"],
  };

  const [selectedItems, setSelectedItems] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
  });

  const [confirmedItems, setConfirmedItems] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
  });

  // Toggle dropdown visibility
  const toggleDropdown = (period) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [period]: !prev[period],
    }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (period, item) => {
    const isChecked = selectedItems[period].includes(item);
    if (isChecked) {
      setSelectedItems({
        ...selectedItems,
        [period]: selectedItems[period].filter((food) => food !== item),
      });
    } else {
      setSelectedItems({
        ...selectedItems,
        [period]: [...selectedItems[period], item],
      });
    }
  };

  // Confirm selection
  const handleUpload = (period) => {
    setConfirmedItems({
      ...confirmedItems,
      [period]: selectedItems[period],
    });
    setDropdownOpen({
      ...dropdownOpen,
      [period]: false,
    });
  };

  // Clear all selections
  const handleClear = (period) => {
    setSelectedItems({
      ...selectedItems,
      [period]: [],
    });
    setConfirmedItems({
      ...confirmedItems,
      [period]: [],
    });
  };

  // Remove individual item
  const handleRemove = (period, item) => {
    setConfirmedItems({
      ...confirmedItems,
      [period]: confirmedItems[period].filter((food) => food !== item),
    });
  };

  return (
    <div>
      <h1>Menu Management</h1>
      <div className="foodperiods">
        {Object.keys(foodOptions).map((period) => (
          <div key={period} className={period}>
            <h2>{period.charAt(0).toUpperCase() + period.slice(1)} items</h2>
            <div className="dropdown-container">
              <div
                className={`dropdown ${dropdownOpen[period] ? "open" : ""}`}
                onClick={() => toggleDropdown(period)}
              >
                <span>Select {period} items</span>
                <span className="arrow">&#9660;</span>
              </div>
              {dropdownOpen[period] && (
                <div className="dropdown-menu">
                  {foodOptions[period].map((item, index) => (
                    <label key={index} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedItems[period].includes(item)}
                        onChange={() => handleCheckboxChange(period, item)}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={() => handleUpload(period)}
                className="upload-button"
              >
                Upload
              </button>
              <button
                onClick={() => handleClear(period)}
                className="clear-button"
              >
                Clear
              </button>
            </div>
            {confirmedItems[period].length > 0 && (
              <div className="selected-list">
                <h3>Selected {period} items:</h3>
                <ul>
                  {confirmedItems[period].map((item, index) => (
                    <li key={index} className="list-item">
                      <span>{item}</span>
                      <button
                        onClick={() => handleRemove(period, item)}
                        className="remove-button"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
