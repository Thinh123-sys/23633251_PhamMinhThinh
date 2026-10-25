// Bài 3 · Bài 4 — tải danh sách sản phẩm từ API một lần, có loading / lỗi / THỬ LẠI (dùng lại ErrorBox và Loading của Bài 2)
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ErrorBox } from '../components/ErrorBox';
import { Loading } from '../components/Loading';
import { Phone } from '../types';
import { fetchPhones } from './phoneApi';

const PhonesContext = createContext<Phone[] | null>(null);

export function PhonesProvider({ children }: { children: React.ReactNode }) {
  const [phones, setPhones] = useState<Phone[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhones(null);
    try {
      setPhones(await fetchPhones());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Có lỗi không xác định');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(() => phones ?? [], [phones]);

  // chưa có dữ liệu → Loading; lỗi → ErrorBox (THỬ LẠI gọi lại load)
  if (error) return <ErrorBox message={error} onRetry={load} />;
  if (!phones) return <Loading />;

  return <PhonesContext.Provider value={value}>{children}</PhonesContext.Provider>;
}

export function usePhones(): Phone[] {
  const phones = useContext(PhonesContext);
  if (!phones) throw new Error('usePhones phải được dùng bên trong PhonesProvider');
  return phones;
}
