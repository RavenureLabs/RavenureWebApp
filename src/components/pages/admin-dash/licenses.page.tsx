'use client';

import { useState } from "react";

export default function AdminLicencesPageComponent() {
  const [licences, setLicences] = useState<any[]>([]); // Replace 'any' with your LicenceType
  const [editingLicence, setEditingLicence] = useState<any | null>(null);

  const handleEdit = (licence: any) => {
    setEditingLicence(licence);
  };

  const handleDelete = async (id: string) => {
    // Delete logic here
  };

  const handleSave = async (updatedLicence: any) => {
    // Save logic here
    setEditingLicence(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lisanslar</h1>

      {editingLicence && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl mb-4">Lisans Düzenle</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            // Extract form data and call handleSave
          }}>
            {/* Add form fields based on your licence model */}
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setEditingLicence(null)}
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
              <th className="py-2 px-4 border">Anahtar</th>
              <th className="py-2 px-4 border">Sahip</th>
              <th className="py-2 px-4 border">Son Kullanma</th>
              <th className="py-2 px-4 border">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {licences.map((licence) => (
              <tr key={licence.id}>
                <td className="py-2 px-4 border">{licence.id}</td>
                <td className="py-2 px-4 border">{licence.key}</td>
                <td className="py-2 px-4 border">{licence.owner}</td>
                <td className="py-2 px-4 border">{licence.expiryDate}</td>
                <td className="py-2 px-4 border">
                  <button 
                    onClick={() => handleEdit(licence)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(licence.id)}
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