'use client';

import { useState } from "react";

type Setting = {
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
};

export default function AdminSettingsPageComponent() {
  const [settings, setSettings] = useState<Setting[]>([
    { key: 'siteTitle', value: 'My Site', type: 'text' },
    { key: 'maintenanceMode', value: 'false', type: 'boolean' },
    { key: 'defaultCurrency', value: 'TRY', type: 'select', options: ['TRY', 'USD', 'EUR'] },
    // Add more settings as needed
  ]);

  const handleSave = (key: string, newValue: string) => {
    setSettings(settings.map(setting => 
      setting.key === key ? { ...setting, value: newValue } : setting
    ));
    // Save to API
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>
      
      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.key} className="flex items-center border-b pb-4">
            <div className="w-1/4">
              <label className="font-medium capitalize">
                {setting.key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
            </div>
            <div className="w-2/4">
              {setting.type === 'text' && (
                <input
                  type="text"
                  value={setting.value}
                  onChange={(e) => handleSave(setting.key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )}
              {setting.type === 'number' && (
                <input
                  type="number"
                  value={setting.value}
                  onChange={(e) => handleSave(setting.key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )}
              {setting.type === 'boolean' && (
                <select
                  value={setting.value}
                  onChange={(e) => handleSave(setting.key, e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="true">Açık</option>
                  <option value="false">Kapalı</option>
                </select>
              )}
              {setting.type === 'select' && setting.options && (
                <select
                  value={setting.value}
                  onChange={(e) => handleSave(setting.key, e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {setting.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="w-1/4 text-right">
              <button 
                onClick={() => {
                  // You can add a save button for each setting if needed
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Kaydet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}