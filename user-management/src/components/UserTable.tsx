import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

const cleanPhoneNumber = (phone: string) => {
    return phone.replace(/[().\-\s]/g, '');
};

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
        cleanPhoneNumber(user.phone).includes(cleanPhoneNumber(searchTerm.phone))
    );

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                User Management
            </h1>

            {/* Search Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="p-2 bg-gray-900 text-white border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={searchTerm.name}
                    onChange={(e) => setSearchTerm({ ...searchTerm, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by username"
                    className="p-2 bg-gray-900 text-white border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={searchTerm.username}
                    onChange={(e) => setSearchTerm({ ...searchTerm, username: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by email"
                    className="p-2 bg-gray-900 text-white border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={searchTerm.email}
                    onChange={(e) => setSearchTerm({ ...searchTerm, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by phone"
                    className="p-2 bg-gray-900 text-white border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={searchTerm.phone}
                    onChange={(e) => setSearchTerm({ ...searchTerm, phone: e.target.value })}
                />
            </div>

            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg">
                    <thead>
                    <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-left text-white">
                        <th className="py-3 px-2 sm:px-6 text-sm sm:text-lg">Name</th>
                        <th className="py-3 px-2 sm:px-6 text-sm sm:text-lg">Username</th>
                        <th className="py-3 px-2 sm:px-6 text-sm sm:text-lg">Email</th>
                        <th className="py-3 px-2 sm:px-6 text-sm sm:text-lg">Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 transform hover:scale-105">
                            <td className="py-3 px-2 sm:px-6 border-b border-gray-700 text-sm sm:text-base">{user.name}</td>
                            <td className="py-3 px-2 sm:px-6 border-b border-gray-700 text-sm sm:text-base">{user.username}</td>
                            <td className="py-3 px-2 sm:px-6 border-b border-gray-700 text-sm sm:text-base">{user.email}</td>
                            <td className="py-3 px-2 sm:px-6 border-b border-gray-700 text-sm sm:text-base">{user.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Cards for mobile */}
            <div className="md:hidden">
                {filteredUsers.map(user => (
                    <div key={user.id} className="mb-4 p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg">
                        <p><span className="font-bold">Name: </span>{user.name}</p>
                        <p><span className="font-bold">Username: </span>{user.username}</p>
                        <p><span className="font-bold">Email: </span>{user.email}</p>
                        <p><span className="font-bold">Phone: </span>{user.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTable;
