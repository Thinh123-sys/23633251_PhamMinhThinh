// Bài 2 · 2.1 — hàm gọi API (code có sẵn trong đề). Cấu hình qua biến môi trường EXPO_PUBLIC_API_URL.
import { PHONES } from '../data/phones';
import { Phone } from '../types';

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/$/, '');
export const USING_API = API_URL !== '';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Bài 3 · Bài 4 — lấy toàn bộ danh sách sản phẩm (GET <base>/phones), offline thì trả dữ liệu mẫu
export async function fetchPhones(): Promise<Phone[]> {
  if (!USING_API) {
    await sleep(600);
    return PHONES;
  }
  const res = await fetch(`${API_URL}/phones`);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  return (await res.json()) as Phone[];
}

export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    // chế độ offline: giả lập độ trễ để thấy loading
    await sleep(600);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error('Không tìm thấy sản phẩm');
    return p;
  }
  const res = await fetch(`${API_URL}/phones/${id}`);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  return (await res.json()) as Phone;
}
