import React, { useState } from "react";
import "./FoodList.scss";

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new food item to the table
    setFoodData([...foodData, formValues]);

    // Clear the form inputs
    setFormValues({ name: "", price: "", description: "" });
  };

  const handleDelete = (index) => {
    // Remove item from the table
    const updatedData = foodData.filter((_, i) => i !== index);
    setFoodData(updatedData);
  };
  return (
    <div className="food-form-container">
      <h1>Food Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="food-form">
        <div className="form-group">
          <label>Food Name:</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Food
        </button>
      </form>

      {/* Table */}
      <table className="food-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map((food, index) => (
            <tr key={index}>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td>{food.description}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodList;
