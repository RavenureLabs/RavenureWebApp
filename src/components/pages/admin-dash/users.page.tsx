
'use client';
import { useEffect, useState } from "react";
import TableComponent from "../../admin-dashboard/table.component";
import { userService } from "@/src/lib/services";
import { UserType } from "@/src/models/user.model";
import TabsComponent from "../../admin-dashboard/tabs.component";
import NotificationComponent from "../../notification/notification.component";

export default function AdminUsersPageComponent() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [addStatus, toggleAddStatus] = useState(false);
    const [editStatus, toggleEditStatus] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    const [tab, setTab] = useState<'User Information' | 'Products' | 'Orders'>('User Information');
    useEffect(() => {
        const getUsers = async () => {
            const users = await userService.getUsers();
            console.log(users)
            setUsers(users);
        }
        getUsers();
    }, []);
    return (
        <div className="justify-center items-center flex mt-36 flex-col w-full">
            {!addStatus && !editStatus && TablePage(users, toggleAddStatus, toggleEditStatus, setSelectedUser, setUsers)}
            {addStatus && AddUserPage()}
            {editStatus && EditUserPage(selectedUser!, tab, setTab, setSelectedUser, selectedUser!)}
        </div>
    );
}

function TablePage(users: UserType[], toggleAddStatus: any, toggleEditStatus: any, setSelectedUser: any, setUsers: any) {
    return(
        <TableComponent
        title="Users"
        fields={["Name", "Email", "Role", "Account Type", "Is Verified"]}
        objects={users.map(user => ({
        data: [
        user.name,
        user.email,
        user.role,
        user.accountType,
        user.isVerified ? "Yes" : "No"
        ],
        AccessCode: user.email,
        editButton: (email) => {
            console.log("Edit user:", email);
            setSelectedUser(user);
            toggleEditStatus(true);
        },
        deleteButton: (email) => {
            userService.deleteUser(email);
            // delete user to users array
            setUsers(users.filter(user => user.email !== email));
            // refresh the users list
            window.location.reload();
        }
        }))}
        addButton={() => toggleAddStatus(true)}
        />

    )
}

function AddUserPage() {
    return (
        <div>
            Add User
            <NotificationComponent />
        </div>
    )
}

export function EditUserPage(selectedUser: UserType, tab: string, setTab: any, setSelectedUser: any, selectedUserState: UserType) {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, ariaChecked } = e.target;
        setSelectedUser({
            ...selectedUserState,
            [name]: type === 'checkbox' ? ariaChecked : value
        });
    };

    const handleSave = () => {
        console.log('Updated user:', );
        alert('User info saved successfully!');
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {/* ✅ Tabs */}
            <div className="border-b mb-4">
                <ul className="flex text-sm font-medium text-gray-500 dark:text-gray-400">
                    {['User Information', 'Products', 'Orders'].map((item) => (
                        <li
                            key={item}
                            className={`cursor-pointer px-4 py-2 border-b-2 ${
                                tab === item
                                    ? 'text-blue-600 border-blue-600'
                                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => setTab(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ✅ Tab Content */}
            {tab === 'User Information' && (
                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={selectedUserState.name}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={selectedUserState.email}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Role</label>
                        <select
                            name="role"
                            value={selectedUserState.role}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    {/* Account Type */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Account Type</label>
                        <input
                            type="text"
                            name="accountType"
                            value={selectedUserState.accountType}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Verified */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isVerified"
                            checked={selectedUserState.isVerified}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-gray-700 dark:text-gray-300">Is Verified</label>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            )}

            {tab === 'Products' && <div className="text-gray-700 dark:text-gray-300">Products will be listed here.</div>}
            {tab === 'Orders' && <div className="text-gray-700 dark:text-gray-300">Orders will be listed here.</div>}
        </div>
    );
}