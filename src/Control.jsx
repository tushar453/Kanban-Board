import React, { useState } from 'react';
import './Controls.css';
import displayIcon from './icons/display.svg'; // Path to your SVG icon

const Controls = ({ onGroupChange, onSortChange }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState('Status');
    const [selectedSorting, setSelectedSorting] = useState('Priority');

    const handleDisplayClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleGroupingChange = (event) => {
        const newGrouping = event.target.value;
        setSelectedGrouping(newGrouping);
        if (onGroupChange) {
            onGroupChange(newGrouping);
        }
    };

    const handleSortingChange = (event) => {
        const newSorting = event.target.value;
        setSelectedSorting(newSorting);
        if (onSortChange) {
            onSortChange(newSorting);
        }
    };

    return (
        <div className="controls-container">
            <div className="select-container">
                <img src={displayIcon} alt="Display Icon" className="display-icon" />
                <select
                    className="display-select"
                    onClick={handleDisplayClick}
                    defaultValue="Display"
                >
                    <option value="Display">Display</option>
                </select>
            </div>

            {isDropdownOpen && (
                <div className="dropdown-content">
                    <div className="dropdown-row">
                        <label htmlFor="grouping-select">Grouping:</label>
                        <select
                            id="grouping-select"
                            value={selectedGrouping}
                            onChange={handleGroupingChange}
                        >
                            <option value="Status">Status</option>
                            <option value="Priority">Priority</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <div className="dropdown-row">
                        <label htmlFor="sorting-select">Sorting:</label>
                        <select
                            id="sorting-select"
                            value={selectedSorting}
                            onChange={handleSortingChange}
                        >
                            <option value="Title">Title</option>
                            <option value="Priority">Priority</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Controls;
