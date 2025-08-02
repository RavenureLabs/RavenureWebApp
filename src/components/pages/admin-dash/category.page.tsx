'use client';

import { useEffect, useState } from "react";
import { CategoryType } from "@/src/models/category.model";
import { categoryService, productService } from "@/src/lib/services";

export default function AdminCategoriesPageComponent() {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() =>{
    const fetchCategories = async () => {
      const categories: any[] = await categoryService.getCategories();
      for (const category of categories) {
        category.products = await productService.getProductsByCategory(category._id);
        category.productCount = category.products.length;
      }
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleEdit = (category: any) => {
    setEditingCategory(category);
  };

  const handleDelete = async (id: string) => {
    await categoryService.deleteCategory(id);
    setCategories(categories.filter(category => category._id !== id));
    setEditingCategory(null);
    setIsAdding(false);
  };

  const handleSave = async (updatedCategory: any) => {
    if(editingCategory){
      let response = await categoryService.updateCategory(updatedCategory);
      setCategories(categories.map(category => category._id === response._id ? response : category));
    }else if (isAdding){
      let response = await categoryService.createCategory(updatedCategory);
      setCategories([...categories, response]);
    }
    setEditingCategory(null);
    setIsAdding(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kategoriler</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yeni Kategori Ekle
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl mb-4">Yeni Kategori Ekle</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            handleSave({ name, products: [], createdAt: new Date().toISOString() });
          }}>
            <div className="mb-4">
              <label className="block mb-2">Kategori Adı</label>
              <input 
                type="text" 
                name="name" 
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

      {editingCategory && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl mb-4">Kategori Düzenle</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            handleSave({ ...editingCategory, name });
          }}>
            <div className="mb-4">
              <label className="block mb-2">Kategori Adı</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={editingCategory.name}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setEditingCategory(null)}
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
              <th className="py-2 px-4 border">Ürün Sayısı</th>
              <th className="py-2 px-4 border">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id.toString()}>
                <td className="py-2 px-4 border">{category._id.toString()}</td>
                <td className="py-2 px-4 border">{category.name['tr']}</td>
                <td className="py-2 px-4 border">{category.productCount}</td>
                <td className="py-2 px-4 border">
                  <button 
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(category._id.toString())}
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