// Bài 4 · 4.1 — Context lưu danh sách sản phẩm yêu thích (code có sẵn trong đề, có thêm kiểm tra null)
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Ctx = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const FavoritesContext = createContext<Ctx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const toggle = useCallback(
    (id: string) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    [],
  );

  const value = useMemo(() => ({ ids, toggle, has: (x: string) => ids.includes(x) }), [ids, toggle]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): Ctx {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites phải được dùng bên trong FavoritesProvider');
  return ctx;
}
