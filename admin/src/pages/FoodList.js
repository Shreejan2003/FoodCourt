import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./FoodList.scss";

const FoodList = () => {
    const [foodData, setFoodData] = useState([]);
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        menuType: "Breakfast",
        availability: true,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const adminToken = "admin-hardcoded-token";

    // Fetch food items on load
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await api.get("/menu", {
                    headers: { Authorization: `Bearer ${adminToken}` },
                });
                setFoodData(response.data);
            } catch (error) {
                console.error("Error fetching food items:", error);
                setError("Failed to load food items.");
            }
        };

        fetchFoodItems();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle form submission to add food
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/menu", formValues, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });

            // Add new food item to the state
            setFoodData([...foodData, response.data]);
            setFormValues({
                name: "",
                description: "",
                price: "",
                category: "",
                menuType: "Breakfast",
                availability: true,
            });
            setSuccess("Food item added successfully!");
            setError("");
        } catch (error) {
            console.error("Error adding food item:", error.response?.data || error.message);
            setError("Failed to add food item. Please try again.");
            setSuccess("");
        }
    };

    // Delete food item
    const handleDelete = async (id) => {
        try {
            await api.delete(`/menu/${id}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });

            // Remove item from local state
            setFoodData(foodData.filter((item) => item._id !== id));
            setSuccess("Food item deleted successfully!");
            setError("");
        } catch (error) {
            console.error("Error deleting food item:", error.response?.data || error.message);
            setError("Failed to delete food item. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="food-form-container">
            <h1>Food Management</h1>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            {/* Add Food Form */}
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
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
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
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formValues.category}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Menu Type:</label>
                    <select
                        name="menuType"
                        value={formValues.menuType}
                        onChange={handleChange}
                        required
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Add Food
                </button>
            </form>

            {/* Food List Table */}
            <table className="food-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Menu Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foodData.map((food) => (
                        <tr key={food._id}>
                            <td>{food.name}</td>
                            <td>{food.description}</td>
                            <td>{food.price}</td>
                            <td>{food.category}</td>
                            <td>{food.menuType}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(food._id)}
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
