// Bài 5 · 5.1 TODO 3 (nâng cao) — đưa trạng thái Switch lên Context để Home/Profile cũng đọc được chế độ tối
import React, { createContext, useContext, useMemo, useState } from 'react';

type Settings = {
  notify: boolean;
  setNotify: (value: boolean) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
};

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState(true); // mặc định BẬT
  const [dark, setDark] = useState(false); // mặc định sáng

  const value = useMemo(
    () => ({ notify, setNotify, dark, setDark }),
    [notify, dark],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Settings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings phải được dùng bên trong SettingsProvider');
  return ctx;
}
