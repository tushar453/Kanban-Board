import React from 'react';
import './KanbanColumn.css';

// Import SVG icons for priorities and statuses
import urgentIcon from './icons/urgent.svg';  // Path to Urgent icon
import highIcon from './icons/high.svg';      // Path to High icon
import mediumIcon from './icons/medium.svg';  // Path to Medium icon
import lowIcon from './icons/low.svg';        // Path to Low icon
import noPriorityIcon from './icons/no-priority.svg'; // Path to No Priority icon

import todoIcon from './icons/todo.svg';      // Path to Todo status icon
import inProgressIcon from './icons/in-progress.svg'; // Path to In Progress status icon
import backlogIcon from './icons/backlog.svg'; // Path to Backlog status icon
import dot from './icons/dot.png';

const KanbanCard = ({ ticket, users }) => {
    // Function to get the corresponding priority icon
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 4:
                return urgentIcon;
            case 3:
                return highIcon;
            case 2:
                return mediumIcon;
            case 1:
                return lowIcon;
            case 0:
                return noPriorityIcon;
            default:
                return noPriorityIcon;
        }
    };

    // Function to get the corresponding status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Todo':
                return todoIcon;
            case 'In progress':
                return inProgressIcon;
            case 'Backlog':
                return backlogIcon;
            default:
                return null;  // No icon for undefined statuses
        }
    };

    // Get user's name by their ID
    const getUserNameById = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };

    // Function to get the initials of the user
    const getUserInitials = (userName) => {
        return userName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
    };

    const userName = getUserNameById(ticket.userId);
    const userInitials = getUserInitials(userName);

    return (
        <div className="kanban-card">
            
            <div className="card-header">
                {/* <div className="user-profile-circle">{userInitials}</div> */}
              <div className="card-id">{ticket.id}</div>
              <div className="user-profile-circle">{userInitials}</div>
            </div>
            <div className="card-status-title">
                <img
                    src={getStatusIcon(ticket.status)}
                    alt="Status Icon"
                    className="status-icon"
                />
                <span className="card-title">{ticket.title}</span>
            </div>
            <div className="card-footer">
                <img
                    src={getPriorityIcon(ticket.priority)}
                    alt="Priority Icon"
                    className="priority-icon"
                />
                <span className="card-tag">
                    <img
                        src={dot}
                        alt="More options"
                        className="dot"
                    />
                    {ticket.tag.join(', ')}
                </span>
            </div>
        </div>
    );
};

export default KanbanCard;
