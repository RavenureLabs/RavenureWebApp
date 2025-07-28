'use client';

import { categoryService } from "@/src/lib/services";
import { CategoryType } from "@/src/models/category.model";
import { ProductType } from "@/src/models/product.model";
import { useEffect, useState } from "react";

type Props = {
  product?: ProductType;
  onSave: (product: ProductType) => void;
  onCancel: () => void;
  isNew?: boolean;
};

export default function ProductEditForm({ product, onSave, onCancel, isNew = false }: Props) {
  const [formData, setFormData] = useState<any>(product || {
    name: '',
    description: '',
    price: 0,
    discountPrice: 0,
    imageUrl: '',
    author: '',
    reviews: { rating: 0, count: 0 },
    category: '',
    salesCount: 0,
    stock: 0,
    isFeatured: false,
    isActive: true,
    createdAt: new Date().toISOString() 
  });

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await categoryService.getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="mb-6 p-4 border rounded">
      <h2 className="text-xl mb-4">{isNew ? 'Yeni Ürün Ekle' : 'Ürün Düzenle'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-2">Ürün Adı</label>
            <input
              type="text"
              name="name"
              value={formData.name['tr']}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Fiyat</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">İndirimli Fiyat</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice || 0}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData.stock || '-1'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label className="block mb-2">Açıklama</label>
            <textarea
              name="description"
              value={formData.description?.['tr']}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Resim URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Yazar</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Kategori</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Kategori Seçin</option>
              {categories.map((i) => (
                <option className="bg-black" key={i._id.toString()} value={i._id.toString()}>
                  {i.name['tr']}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured || false}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Öne Çıkan Ürün</label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive || false}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Aktif</label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
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
  );
}