
'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait until authentication status is determined

    // if (status === 'unauthenticated') {
    //   // Redirect unauthenticated users to the admin sign-in page
    //   router.replace('/adminsignin');
    //   return;
    // }

    // if (status === 'authenticated' && session?.user.role !== 'Admin') {
    //   // Redirect users without the "Admin" role to the unauthorized page
    //   router.replace('/unauthorize');
    // }
  }, [status, session, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && session?.user.role === 'Admin') {
      fetchUsers();
    }
  }, [status, session]);

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  const handleToggle = async (userId: string) => {
    try {
      const response = await axios.patch(`/api/users/toggle/${userId}`);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isActive: response.data.isActive } : user
        )
      );
    } catch (err) {
      setError('Failed to toggle user status.');
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <button
        onClick={() => router.push('/admin/register')}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Register User
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                {user.isActive ? 'Active' : 'Inactive'}
              </td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                <button
                  onClick={() => handleToggle(user._id)}
                  className={`px-4 py-2 text-white rounded ${
                    user.isActive
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
}
