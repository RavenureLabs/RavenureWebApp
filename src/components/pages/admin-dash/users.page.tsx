'use client';

import { useEffect, useState } from "react";
import { UserType } from "@/src/models/user.model";
import { userService } from "@/src/lib/services";

export default function AdminUsersPageComponent() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
        const users = await userService.getUsers();
        setUsers(users);
    }
    fetchUsers();
  }, []);

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
  };

  const handleDelete = async (id: string) => {
    await userService.deleteUser(id);
    setUsers(users.filter(user => user._id.toString() !== id));
    setEditingUser(null);
    window.location.reload();
  };

  const handleSave = async (updatedUser: UserType) => {
    if(editingUser){
      let response = await userService.updateUser(updatedUser);
      console.log(response);
      setUsers(users.map(user => user._id === response._id ? response : user));
      setEditingUser(null);
      window.location.reload();
    }
  };

  return (
    <div className="p-6 bg-black">
      <div className="flex justify-between items-center mb-6 bg-black">
        <h1 className="text-2xl font-bold bg-black">Kullanıcılar</h1>
      </div>

      {editingUser && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl mb-4">
            {editingUser.email ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            const role = formData.get('role') as 'admin' | 'user';
            const isActive = formData.get('isActive') === 'on';
            handleSave({ ...editingUser, name, email, role, isActive, password: formData.get('password') as string || undefined });
          }}>
            <div className="mb-4 bg-black">
              <label className="block mb-2">Ad</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={editingUser.name}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                defaultValue={editingUser.email}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Şifre</label>
                <input 
                  type="password" 
                  name="password" 
                  className="w-full p-2 border rounded"
                  placeholder="Yeni şifre (isteğe bağlı)"
                />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Rol</label>
              <select 
                name="role" 
                defaultValue={editingUser.role}
                className="w-full p-2 border rounded"
              >
                <option value="user">Kullanıcı</option>
                <option value="admin">Yönetici</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="isActive" 
                  defaultChecked={editingUser.isActive}
                  className="mr-2"
                />
                Aktif
              </label>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setEditingUser(null)}
                className="mr-2 px-4 py-2 border rounded"
              >
                İptal
              </button>
              <button 
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={!editingUser.name || !editingUser.email}
                onClick={() => handleSave(editingUser)}
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Ad</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Rol</th>
              <th className="py-2 px-4 border">Durum</th>
              <th className="py-2 px-4 border">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name}>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">
                  <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="py-2 px-4 border">
                  <button 
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(user.email)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}