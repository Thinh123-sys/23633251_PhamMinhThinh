// Bài 2 · 2.1 — gọi API rồi đưa dữ liệu vào Bài 1 (SelectPhoneApp)
import { useCallback, useEffect, useState } from 'react';
import { fetchPhone } from '../api/phoneApi';
import { ErrorBox } from '../components/ErrorBox';
import { Loading } from '../components/Loading';
import { Phone } from '../types';
import { SelectPhoneApp } from './SelectPhoneApp';

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // Bài 2 · 2.1 TODO 1: xóa lỗi và dữ liệu cũ trước khi tải lại (dùng cho nút THỬ LẠI)
    setError(null);
    setPhone(null);
    // Bài 2 · 2.1 TODO 2: gọi API; nếu lỗi thì lưu thông báo để hiện ErrorBox
    try {
      setPhone(await fetchPhone('1'));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Có lỗi không xác định');
    }
  }, []);

  // Bài 2 · 2.1 TODO 3: tải dữ liệu khi màn hình mở lần đầu
  useEffect(() => {
    load();
  }, [load]);

  // Bài 2 · 2.1 TODO 4: có lỗi → ErrorBox, bấm THỬ LẠI sẽ gọi lại load()
  if (error) return <ErrorBox message={error} onRetry={load} />;

  // Bài 2 · 2.1 TODO 5: chưa có dữ liệu → vòng xoay "Đang tải..."
  if (!phone) return <Loading />;

  // Bài 2 · 2.1 TODO 6: có dữ liệu → dùng lại toàn bộ Bài 1
  return <SelectPhoneApp phone={phone} />;
}
