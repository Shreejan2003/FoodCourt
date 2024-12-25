import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./MenuManagement.scss";

const MenuManagement = () => {
    const [foodOptions, setFoodOptions] = useState({
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
    });
    const [selectedItems, setSelectedItems] = useState({
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
    });
    const [confirmedItems, setConfirmedItems] = useState({
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
    });
    const [dropdownOpen, setDropdownOpen] = useState({
        breakfast: false,
        lunch: false,
        snacks: false,
        dinner: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const adminToken = "admin-hardcoded-token";

    // Fetch current menu items grouped by types
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await api.get("/menu", {
                    headers: { Authorization: `Bearer ${adminToken}` },
                });
                const data = response.data;

                const groupedOptions = {
                    breakfast: [],
                    lunch: [],
                    snacks: [],
                    dinner: [],
                };
                const groupedConfirmed = {
                    breakfast: [],
                    lunch: [],
                    snacks: [],
                    dinner: [],
                };

                data.forEach((item) => {
                    const type = item.menuType.toLowerCase();
                    if (type in groupedOptions) {
                        groupedOptions[type].push(item.name);
                        if (item.availability) {
                            groupedConfirmed[type].push(item.name);
                        }
                    }
                });

                setFoodOptions(groupedOptions);
                setConfirmedItems(groupedConfirmed);
            } catch (error) {
                console.error("Error fetching menu:", error);
                setError("Failed to fetch menu data. Please try again.");
            }
        };

        fetchMenu();
    }, []);

    const toggleDropdown = (period) => {
        setDropdownOpen((prev) => ({
            ...prev,
            [period]: !prev[period],
        }));
    };

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

    const handleUpload = async (period) => {
        try {
            const itemsToToggle = selectedItems[period].map((item) => ({
                name: item,
                menuType: period,
                availability: true,
            }));

            await Promise.all(
                itemsToToggle.map((item) =>
                    api.patch(`/menu/toggle`, item, {
                        headers: { Authorization: `Bearer ${adminToken}` },
                    })
                )
            );

            setConfirmedItems({
                ...confirmedItems,
                [period]: selectedItems[period],
            });
            setDropdownOpen({
                ...dropdownOpen,
                [period]: false,
            });
            setSuccess(`Menu updated successfully for ${period}!`);
            setError("");
        } catch (error) {
            console.error("Error updating menu:", error);
            setError(`Failed to update menu for ${period}. Please try again.`);
        }
    };

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

    const handleRemove = async (period, item) => {
        try {
            await api.patch(`/menu/toggle`, { name: item, availability: false }, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            setConfirmedItems({
                ...confirmedItems,
                [period]: confirmedItems[period].filter((food) => food !== item),
            });
            setSuccess(`${item} removed successfully from ${period}!`);
            setError("");
        } catch (error) {
            console.error("Error removing item:", error);
            setError(`Failed to remove ${item} from ${period}. Please try again.`);
        }
    };

    return (
        <div>
            <h1>Menu Management</h1>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

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
