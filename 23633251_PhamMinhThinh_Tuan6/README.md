# Lab06 — React Native Navigation

Dự án gồm 5 bài thực hành theo tài liệu Lab 06:
1. Select Phone — chọn màu bằng Stack Navigation.
2. Select Phone + API — loading, lỗi và thử lại; mặc định dùng dữ liệu mẫu offline.
3. Bottom Tabs — Trang chủ, Tìm kiếm, Cá nhân.
4. Stack + Tabs — danh sách, chi tiết, truyền `id`, yêu thích bằng Context.
5. Drawer — Trang chủ, Cá nhân, Cài đặt và Switch chế độ tối.

## Chạy trên Windows PowerShell

Mở terminal tại thư mục chứa `package.json`:

```powershell
npm.cmd install
npm.cmd run typecheck
npx.cmd expo start --clear
```

Quét QR bằng Expo Go hoặc nhấn `w` trong terminal để mở Web. Nếu dùng PowerShell có Execution Policy chặn `npm.ps1`/`npx.ps1`, hãy dùng các lệnh có đuôi `.cmd` như trên.

## Dữ liệu API

Mặc định file `.env` không cấu hình API nên dự án dùng dữ liệu mẫu trong `src/data/phones.ts`. Điều này giúp cả 5 bài có thể mở mà không phụ thuộc dịch vụ ngoài.

Muốn dùng MockAPI, sửa `.env` thành URL gốc của resource API, ví dụ:

```env
EXPO_PUBLIC_API_URL=https://<project-id>.mockapi.io/api/v1
```

URL phải là **base URL**, không thêm `/phones` ở cuối vì code tự thêm `/phones` hoặc `/phones/:id`. Sau khi sửa `.env`, khởi động lại Metro:

```powershell
npx.cmd expo start --clear
```

## Lưu ý

- Không cần sao chép thư mục `node_modules` giữa các máy. Hãy chạy `npm.cmd install` để cài dependencies theo `package-lock.json`.
- Không dùng `npm audit fix --force` chỉ để xử lý lỗi khởi động, vì lệnh này có thể thay đổi các phiên bản dependency lớn.
