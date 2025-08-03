'use client';

import { useSettings } from '@/src/context/settings/settings.context';
import { api } from '@/src/lib/api';
import { useEffect, useState } from 'react';
import Notification from '../../notification/notification.component';
import { Settings } from '@/src/models/settings.model';

export default function AdminSettingsPageComponent() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [message, setMessage] = useState<string | null>('');
  const [notificationType, setNotificationType] = useState<'error' | 'success'>('error');
  const {settings: contextSettings, updateSettings} = useSettings();

  useEffect(() => {
    async function fetchSettings() {
      const response = await api.get('/api/settings');
      setSettings(response.data);
    }
    fetchSettings();
  }, []);

  
  const handleChange = (path: string, value: any) => {
    setSettings((prev) => {
      if (!prev) return prev;
      const newSettings: Settings = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let nested: any = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const renderInput = (
    label: string,
    path: string,
    value: any,
    type: 'text' | 'number' | 'boolean' = 'text'
  ) => {
    return (
      <div className="mb-4">
        <Notification
        message={message}
        type={notificationType}
        onClose={() => setMessage(null)}
        />
        <label className="block font-semibold mb-1">
          {label}
        </label>
        {type === 'boolean' ? (
          <select
            value={String(value)}
            onChange={(e) => handleChange(path, e.target.value === 'true')}
            className="w-full p-2 border rounded"
          >
            <option value="true">Açık</option>
            <option value="false">Kapalı</option>
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) =>
              handleChange(path, type === 'number' ? Number(e.target.value) : e.target.value)
            }
            className="w-full p-2 border rounded"
          />
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>

      <div className="space-y-8">
        {/* Genel */}
        <div>
          <h2 className="text-xl font-bold mb-2">Genel</h2>
          {renderInput('Site Başlığı', 'title', settings?.title, 'text')}
        </div>

        {/* SMTP */}
        <div>
          <h2 className="text-xl font-bold mb-2">SMTP</h2>
          {renderInput('SMTP Host', 'smtp.host', settings?.smtp.host, 'text')}
          {renderInput('SMTP Port', 'smtp.port', settings?.smtp.port, 'number')}
          {renderInput('Güvenli Bağlantı', 'smtp.secure', settings?.smtp.secure, 'boolean')}
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-xl font-bold mb-2">Ödeme</h2>
          {renderInput('Merchant ID', 'payment.paytr.merchantId', settings?.payment.paytr.merchantId, 'text')}
        </div>
        {/* KDV */}
        <div>
          <h2 className="text-xl font-bold mb-2">KDV</h2>
          {renderInput('KDV Oranı', 'kdv', settings?.kdv, 'number')}
        </div>
        <button
          onClick={async () => {
            if (!settings) return;
            await api.post('/api/settings', settings);
            updateSettings(settings);
            setMessage('Ayarlar kaydedildi.');
            setNotificationType('success');
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Tümünü Kaydet
        </button>
      </div>
    </div>
  );
}
