'use client';

import { api } from '@/src/lib/api';
import { createContext, useContext, useEffect, useState } from 'react';

export type Settings = {
  title: string;
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  payment: {
    active: 'paytr';
    paytr: {
      merchantId: string;
      merchantKey: string;
    };
  };
  discord: {
    botToken: string;
    clientId: string;
    secret: string;
  };
  translator: {
    deepL: string;
  };
};

type SettingsContextType = {
  settings: Settings | null;
  loading: boolean;
  updateSetting: (path: string, value: any) => void;
  updateSettings: (settings: Settings) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {        
        const settings = await api.get('/api/settings');
        setSettings(settings.data);
        setLoading(false);
    }
    fetchSettings();
  }, []);

  const updateSetting = (path: string, value: any) => {
    if (!settings) return;
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    // Create a deep copy of settings
    const newSettings = JSON.parse(JSON.stringify(settings));
    // Traverse to the nested object
    let nested: any = newSettings;
    for (const key of keys) {
      if (nested[key] === undefined) nested[key] = {};
      nested = nested[key];
    }
    nested[lastKey] = value;
    setSettings(newSettings);
  };

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSetting, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
