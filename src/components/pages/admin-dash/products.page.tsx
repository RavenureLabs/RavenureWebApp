'use client';

import { useEffect, useState } from "react";
import { ProductType } from "@/src/models/product.model";
import ProductEditForm from "@/src/components/admin-dashboard/products/edit-form.component";
import { useLanguage } from "@/src/hooks/uselanguage.hooks";
import { categoryService, productService } from "@/src/lib/services";

export default function AdminProductsPageComponent() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const {language} = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      const preResponse = await productService.getProducts();
      let lastResponse: any[] = [];
      for (const product of preResponse) {
        const response = await categoryService.getCategory(product.category.toString());
        let lastProduct:any = product;
        lastProduct.category = response.name[language];
        lastResponse.push(lastProduct);
      }
      setProducts(lastResponse);
    };
    fetchProducts();
  }, []);
  const handleEdit = (product: ProductType) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id: string) => {
    await productService.deleteProduct(id);
    setProducts(products.filter(product => product._id !== id));
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleSave = async (updatedProduct: ProductType) => {
    if(isAdding){
      let response: any = await productService.createProduct(updatedProduct);
      response.category = (await categoryService.getCategory(response.category.toString())).name['tr'];
      setProducts([...products, response]);
    }else if (editingProduct){
      let response: any = await productService.updateProduct(updatedProduct);
      response.category = (await categoryService.getCategory(response.category.toString())).name['tr'];
      setProducts(products.map(product => product._id === response._id ? response : product));
    }
    // Save logic here
    setEditingProduct(null);
    setIsAdding(false);
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
              <tr key={product._id.toString()}>
                <td className="py-2 px-4 border">{product._id.toString()}</td>
                <td className="py-2 px-4 border">{product.name[language]}</td>
                <td className="py-2 px-4 border">{product.price}</td>
                <td className="py-2 px-4 border">{product.stock || "Sınırsız"}</td>
                <td className="py-2 px-4 border">{product.category}</td>
                <td className="py-2 px-4 border">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id.toString())}
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