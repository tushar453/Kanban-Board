import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanColumn.css';

// Import SVG icons for priorities and statuses
import urgentIcon from './icons/urgent.svg';
import highIcon from './icons/high.svg';
import mediumIcon from './icons/medium.svg';
import lowIcon from './icons/low.svg';
import noPriorityIcon from './icons/no-priority.svg';

import todoIcon from './icons/todo.svg';
import inProgressIcon from './icons/in-progress.svg';
import backlogIcon from './icons/backlog.svg';
import plusIcon from './icons/add.svg';       // Path to the Plus icon
import threeDotIcon from './icons/3 dot menu.svg';
const KanbanColumn = ({ title, tickets, groupBy, users }) => {
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'Urgent':
                return urgentIcon;
            case 'High':
                return highIcon;
            case 'Medium':
                return mediumIcon;
            case 'Low':
                return lowIcon;
            case 'No Priority':
                return noPriorityIcon;
            default:
                return noPriorityIcon;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Todo':
                return todoIcon;
            case 'In progress':
                return inProgressIcon;
            case 'Backlog':
                return backlogIcon;
            default:
                return null;
        }
    };

    const getUserInitials = (userName) => {
        return userName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
    };

    const renderColumnHeader = () => {
        if (groupBy === 'Priority') {
            return (
                <div className="column-header">
                    <div className="header-left">
                    <img
                        src={getPriorityIcon(title)}
                        alt={`${title} Icon`}
                        className="header-icon"
                    />
                    <h2>{title}{tickets.length}</h2>
                    </div>

                    <div className="header-right">
                    <img
                        src={plusIcon}
                        alt="Add new card"
                        className="icon plus-icon"
                    />
                    <img
                        src={threeDotIcon}
                        alt="More options"
                        className="icon three-dot-icon"
                    />
                </div>
                </div>
            );
        } else if (groupBy === 'Status') {
            return (
                <div className="column-header">
                     <div className="header-left">
                    <img
                        src={getStatusIcon(title)}
                        alt={`${title} Icon`}
                        className="header-icon"
                    />
                    <h2>{title} {tickets.length}</h2>
                    </div>
                    <div className="header-right">
                    <img
                        src={plusIcon}
                        alt="Add new card"
                        className="icon plus-icon"
                    />
                    <img
                        src={threeDotIcon}
                        alt="More options"
                        className="icon three-dot-icon"
                    />
                </div>
                </div>
            );
        } else if (groupBy === 'User') {
            const user = users.find(user => user.name === title);
            const userInitials = getUserInitials(title);
            return (
                <div className="column-header ">
                    <div className="header-left user-header">
                    <div className="user-profile-circle">{userInitials}</div>
                    <h2>{title} {tickets.length}</h2></div>

                    <div className="header-right">
                    <img
                        src={plusIcon}
                        alt="Add new card"
                        className="icon plus-icon"
                    />
                    <img
                        src={threeDotIcon}
                        alt="More options"
                        className="icon three-dot-icon"
                    />
                </div>
                </div>
            );
        } else {
            return <h2>{title}</h2>;
        }
    };

    return (
        <div className="kanban-column">
            {renderColumnHeader()}
            <div className="card-list">
                {tickets.map(ticket => (
                    <KanbanCard key={ticket.id} ticket={ticket} users={users} />
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;
