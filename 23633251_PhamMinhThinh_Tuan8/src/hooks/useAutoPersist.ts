import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// Hook lưu chung cho giỏ hàng và yêu thích, chỉ ghi sau khi dữ liệu cũ đã nạp.
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    void saveJSON(key, value);
  }, [key, value, ready]);
}
