'use client';

import { useState } from "react";
import { ReferanceType } from "@/src/models/referance.model";

export default function AdminReferancesPageComponent() {
  const [referances, setReferances] = useState<ReferanceType[]>([]);
  const [editingReferance, setEditingReferance] = useState<ReferanceType | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (referance: ReferanceType) => {
    setEditingReferance(referance);
  };

  const handleDelete = async (id: string) => {
    // Delete logic here
  };

  const handleSave = async (updatedReferance: ReferanceType) => {
    // Save logic here
    setEditingReferance(null);
    setIsAdding(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Referanslar</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yeni Referans Ekle
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl mb-4">Yeni Referans Ekle</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const url = formData.get('url') as string;
            const imageUrl = formData.get('imageUrl') as string;
            handleSave({ name, url, imageUrl });
          }}>
            <div className="mb-4">
              <label className="block mb-2">Referans Adı</label>
              <input 
                type="text" 
                name="name" 
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">URL</label>
              <input 
                type="url" 
                name="url" 
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Resim URL</label>
              <input 
                type="url" 
                name="imageUrl" 
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="mr-2 px-4 py-2 border rounded"
              >
                İptal
              </button>
              <button 
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      )}

      {editingReferance && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl mb-4">Referans Düzenle</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const url = formData.get('url') as string;
            const imageUrl = formData.get('imageUrl') as string;
            handleSave({ ...editingReferance, name, url, imageUrl });
          }}>
            <div className="mb-4">
              <label className="block mb-2">Referans Adı</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={editingReferance.name}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">URL</label>
              <input 
                type="url" 
                name="url" 
                defaultValue={editingReferance.url || ''}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Resim URL</label>
              <input 
                type="url" 
                name="imageUrl" 
                defaultValue={editingReferance.imageUrl}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setEditingReferance(null)}
                className="mr-2 px-4 py-2 border rounded"
              >
                İptal
              </button>
              <button 
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
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
              <th className="py-2 px-4 border">URL</th>
              <th className="py-2 px-4 border">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {referances.map((referance) => (
              <tr key={referance.name}>
                <td className="py-2 px-4 border">{referance.name}</td>
                <td className="py-2 px-4 border">{referance.name}</td>
                <td className="py-2 px-4 border">{referance.url || '-'}</td>
                <td className="py-2 px-4 border">
                  <button 
                    onClick={() => handleEdit(referance)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(referance.name)}
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