'use client';

import { useState } from "react";
import { ProductType } from "@/src/models/product.model";
import ProductEditForm from "@/src/components/admin-dashboard/products/edit-form.component";

export default function AdminProductsPageComponent() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (product: ProductType) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id: string) => {
    // Delete logic here
  };

  const handleSave = async (updatedProduct: ProductType) => {
    // Save logic here
    setEditingProduct(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yeni Ürün Ekle
        </button>
      </div>

      {isAdding && (
        <ProductEditForm 
          onSave={handleSave} 
          onCancel={() => setIsAdding(false)} 
          isNew={true}
        />
      )}

      {editingProduct && (
        <ProductEditForm 
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Ad</th>
              <th className="py-2 px-4 border">Fiyat</th>
              <th className="py-2 px-4 border">Stok</th>
              <th className="py-2 px-4 border">Kategori</th>
              <th className="py-2 px-4 border">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border">{product.id}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.price}</td>
                <td className="py-2 px-4 border">{product.stock}</td>
                <td className="py-2 px-4 border">{product.category}</td>
                <td className="py-2 px-4 border">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
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