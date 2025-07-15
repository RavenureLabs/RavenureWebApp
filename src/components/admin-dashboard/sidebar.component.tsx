'use client';

import { useSidebarStore } from '@/src/stores/sidebar-store';
import { useState } from 'react';

export default function SidebarComponent() {
    const { isOpen, toggle } = useSidebarStore();

    const toggleSidebar = () => {
        toggle();
    };

    return (
        <div className="flex">
            <aside
                className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-50 dark:bg-gray-800`}
                aria-label="Sidebar"
            >
                <div className="h-full flex flex-col justify-between px-2 py-4 overflow-y-auto relative">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 12L12 3l9 9v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>
                                </svg>
                                {isOpen && <span className="ml-3">Ana sayfa</span>}
                            </a>
                        </li>
                        <li>
                            <a href="../admin-dashboard/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4Z" />
                                </svg>
                                {isOpen && <span className="ml-3">Kullanıcı Yönetimi</span>}
                            </a>
                        </li>
                                                <li>
                            <a href="../admin-dashboard/products" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {/* Ürün - Kutu */}
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 7l-9-4-9 4 9 4 9-4zm0 2-9 4-9-4v8l9 4 9-4V9z"/>
                                </svg>
                                {isOpen && 
                                <span className="ms-3">Ürün Yönetimi</span>}
                            </a>
                        </li>
                        <li>
                            <a href="../admin-dashboard/category" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {/* Kategori - Etiket */}
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7H3zm2 2h14v8H5V9z"/>
                                </svg>
                                {isOpen && 
                                <span className="ms-3">Kategori Yönetimi</span>}
                            </a>
                        </li>
                        <li>
                            <a href="../admin-dashboard/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {/* Sipariş - Sepet */}
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 4h-2l-1 2H1v2h1l3.6 7.59a1 1 0 0 0 .9.41H19v-2H7.42l-.94-2H17a1 1 0 0 0 .96-.73L21 4H7z"/>
                                </svg>
                                {isOpen && 
                                <span className="ms-3">Sipariş Yönetimi</span>}
                            </a>
                        </li>
                        <li>
                            <a href="../admin-dashboard/references" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {/* Referans - Zincir */}
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 13a5 5 0 0 0 7.07 0l3.54-3.54a5 5 0 1 0-7.07-7.07L10 5.93M14 11l-4-4"/>
                                </svg>
                                {isOpen && 
                                <span className="ms-3">Referans Yönetimi</span>}
                            </a>
                        </li>
                        <li>
                            <a href="../admin-dashboard/licenses" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {/* Lisans - Anahtar */}
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3zm4 10h2v2h-2v-2z"/>
                                </svg>
                                {isOpen && 
                                <span className="ms-3">Lisans Yönetimi</span>}
                            </a>
                        </li>
                        <li>
                            <a href="../admin-dashboard/settings" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                {/* Ayar */}
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1a2 2 0 0 1 2 2v1h2.09a1 1 0 0 1 .97.757l.57 2.29a8.05 8.05 0 0 1 1.31.763l2.12-1.2a1 1 0 0 1 1.3.3l1.43 2.49a1 1 0 0 1-.29 1.32l-2.12 1.21c.03.21.05.43.05.65s-.02.44-.05.65l2.12 1.21a1 1 0 0 1 .29 1.32l-1.43 2.49a1 1 0 0 1-1.3.3l-2.12-1.2a8.05 8.05 0 0 1-1.31.763l-.57 2.29a1 1 0 0 1-.97.757H14v1a2 2 0 0 1-4 0v-1H7.91a1 1 0 0 1-.97-.757l-.57-2.29a8.05 8.05 0 0 1-1.31-.763l-2.12 1.2a1 1 0 0 1-1.3-.3l-1.43-2.49a1 1 0 0 1 .29-1.32l2.12-1.21a8.09 8.09 0 0 1 0-1.3L.29 9.56a1 1 0 0 1-.29-1.32l1.43-2.49a1 1 0 0 1 1.3-.3l2.12 1.2a8.05 8.05 0 0 1 1.31-.763l.57-2.29A1 1 0 0 1 7.91 4H10V3a2 2 0 0 1 2-2z"/>
                                </svg>
                                {isOpen && <span className="ms-3">Ayarlar</span>}
                            </a>
                        </li>
                    </ul>
                    {/* Sağ altta toggle butonu */}
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center justify-center right-1 w-12 mt-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M6 4l8 6-8 6V4z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </aside>


        </div>
    );
}
