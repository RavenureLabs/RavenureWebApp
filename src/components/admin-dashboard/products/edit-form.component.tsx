'use client';

import { categoryService } from "@/src/lib/services";
import { CategoryType } from "@/src/models/category.model";
import { ProductType } from "@/src/models/product.model";
import { useEffect, useRef, useState } from "react";

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

  // --- YENİ: Upload durumları ---
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // --- YENİ: Dosya seçildiğinde Cloud'a yükle ---
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir resim dosyası seçin.");
      return;
    }
    // (opsiyonel) boyut kontrolü örn. 10MB
    const maxMB = 10;
    if (file.size > maxMB * 1024 * 1024) {
      alert(`Dosya çok büyük. Maksimum ${maxMB}MB.`);
      return;
    }

    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: fd
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      // Cloudinary secure_url -> formData.imageUrl
      setFormData((prev: any) => ({ ...prev, imageUrl: data.url }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Yükleme başarısız oldu. Lütfen tekrar deneyin.");
    } finally {
      setUploading(false);
    }
  };

  const openFileDialog = () => fileInputRef.current?.click();
  const clearImage = () => {
    setLocalPreview('');
    setFormData((prev: any) => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
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
              value={formData?.name?.['tr'] ?? formData.name}
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
              value={formData.stock ?? -1}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label className="block mb-2">Açıklama</label>
            <textarea
              name="description"
              value={formData?.description?.['tr'] ?? formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          {/* ====== YENİ: Resim URL yerine Dosya Yükleme Alanı ====== */}
          <div className="mb-4">
            <label className="block mb-2">Ürün Görseli</label>

            <div
              className="border border-dashed rounded-lg p-4 cursor-pointer hover:bg-neutral-900/40"
              onClick={openFileDialog}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />

              {/* Görsel yoksa: açıklama */}
              {!formData.imageUrl && !localPreview && (
                <p className="text-sm opacity-70 text-center">
                  Görsel seçmek için tıklayın (PNG, JPG • maks 10MB)
                </p>
              )}

              {/* Görsel varsa: önizleme + aksiyonlar */}
              {(formData.imageUrl || localPreview) && (
                <div className="flex items-start gap-3">
                  <img
                    src={formData.imageUrl || localPreview}
                    alt="preview"
                    className="rounded border max-h-40"
                  />
                  <div className="flex flex-col gap-2">
                    {uploading && <span className="text-xs opacity-70">Yükleniyor…</span>}
                    {formData.imageUrl && (
                      <a
                        href={formData.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-400 underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Cloud üzerindeki görseli aç
                      </a>
                    )}
                    {(formData.imageUrl || localPreview) && (
                      <>
                        <button
                          type="button"
                          className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-2 py-1 rounded w-fit"
                          onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(formData.imageUrl || ''); }}
                          disabled={!formData.imageUrl}
                        >
                          URL’yi kopyala
                        </button>
                        <button
                          type="button"
                          className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded w-fit"
                          onClick={(e) => { e.stopPropagation(); clearImage(); }}
                        >
                          Kaldır
                        </button>
                        <span className="text-xs opacity-70">Değiştirmek için kutuya tekrar tıklayın</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* (İsteğe bağlı) Gerekiyorsa form doğrulaması için gizli input */}
            <input type="hidden" name="imageUrl" value={formData.imageUrl || ''} />
          </div>
          {/* ======================================================== */}

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
            disabled={uploading}
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
