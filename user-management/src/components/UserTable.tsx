import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        username: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
        user.username.toLowerCase().includes(searchTerm.username.toLowerCase()) &&
        user.email.toLowerCase().includes(searchTerm.email.toLowerCase()) &&
        user.phone.toLowerCase().includes(searchTerm.phone.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>

            <div className="grid grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="p-2 border rounded"
                    value={searchTerm.name}
                    onChange={(e) => setSearchTerm({ ...searchTerm, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by username"
                    className="p-2 border rounded"
                    value={searchTerm.username}
                    onChange={(e) => setSearchTerm({ ...searchTerm, username: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by email"
                    className="p-2 border rounded"
                    value={searchTerm.email}
                    onChange={(e) => setSearchTerm({ ...searchTerm, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by phone"
                    className="p-2 border rounded"
                    value={searchTerm.phone}
                    onChange={(e) => setSearchTerm({ ...searchTerm, phone: e.target.value })}
                />
            </div>

            <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id} className="border-t">
                        <td className="py-2 px-4">{user.name}</td>
                        <td className="py-2 px-4">{user.username}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">{user.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
