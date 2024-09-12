import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import Controls from './Control';
import './App.css';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupBy, setGroupBy] = useState('Status');
    const [sortBy, setSortBy] = useState('Priority');

    useEffect(() => {
        // Fetch tickets and users data from API
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => response.json())
            .then(data => {
                setTickets(data.tickets);
                setUsers(data.users);
            });
    }, []);

    const handleGroupChange = (newGrouping) => {
        setGroupBy(newGrouping);
    };

    const handleSortChange = (newSorting) => {
        setSortBy(newSorting);
    };

    const getUserNameById = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const groupTickets = (tickets) => {
        if (groupBy === 'Status') {
            return tickets.reduce((groups, ticket) => {
                (groups[ticket.status] = groups[ticket.status] || []).push(ticket);
                return groups;
            }, {});
        } else if (groupBy === 'User') {
            return tickets.reduce((groups, ticket) => {
                const userName = getUserNameById(ticket.userId);
                (groups[userName] = groups[userName] || []).push(ticket);
                return groups;
            }, {});
        } else if (groupBy === 'Priority') {
            return tickets.reduce((groups, ticket) => {
                const priority = ticket.priority === 0 ? 'No Priority' :
                                 ticket.priority === 1 ? 'Low' :
                                 ticket.priority === 2 ? 'Medium' :
                                 ticket.priority === 3 ? 'High' : 'Urgent';
                (groups[priority] = groups[priority] || []).push(ticket);
                return groups;
            }, {});
        }
        return {};
    };

    const sortTickets = (tickets) => {
        if (sortBy === 'Title') {
            return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'Priority') {
            return [...tickets].sort((a, b) => b.priority - a.priority);
        }
        return tickets;
    };

    const groupedTickets = groupTickets(tickets);
    const sortedTickets = {};
    
    Object.keys(groupedTickets).forEach(key => {
        sortedTickets[key] = sortTickets(groupedTickets[key]);
    });

    return (
        <div className="app-container">
            <Controls onGroupChange={handleGroupChange} onSortChange={handleSortChange} />
            <div className="kanban-board">
                {Object.keys(sortedTickets).map(key => (
                    <KanbanColumn
                        key={key}
                        title={key}
                        tickets={sortedTickets[key]}
                        groupBy={groupBy}
                        users={users}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
