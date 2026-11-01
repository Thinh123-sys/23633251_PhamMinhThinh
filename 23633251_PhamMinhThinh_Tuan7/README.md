# BookStore — Buổi 7 (đã hoàn thành)

Dự án Expo + React Native + TypeScript theo bài thực hành **BookStore Buổi 7**.

## Chức năng theo đề
- **7.1–7.2:** Native Stack + Bottom Tabs với CustomTabBar, điều hướng Chi tiết bằng `bookId`, Thanh toán bằng `total`.
- **7.3–7.4:** Giỏ hàng Redux Toolkit (thêm, xóa, cập nhật số lượng có giới hạn tồn kho), badge; đăng nhập demo/đăng xuất.
- **7.5–7.6:** Axios + json-server cho sách và danh mục; loading, lỗi tiếng Việt và nút Thử lại. Home tải song song qua `Promise.all`.
- **7.7–7.8:** Tìm không dấu theo tên/tác giả, debounce 400 ms, trạng thái rỗng, lọc danh mục và điều hướng từ tab Danh mục.
- **C1–C2:** Yêu thích bằng Redux và nút trái tim; ba bộ lọc khoảng giá kết hợp.
- **Câu 5:** Sắp xếp giá tăng/giảm; các câu trả lời được ghi trong `TraLoi.md`.

## Chạy ứng dụng
**Yêu cầu:** Node.js 20+, npm, Expo Go (nếu chạy trên điện thoại).

```bash
npm install
npm run api                 # terminal 1 — http://localhost:3000/books
npx expo start             # terminal 2 — nhấn w để xem bản web
npx tsc --noEmit           # kiểm tra TypeScript
```

Nếu PowerShell chặn `npm`/`npx`, có thể dùng `npm.cmd` / `npx.cmd`. Điện thoại và máy tính cần cùng Wi-Fi. Nếu không kết nối API, đặt biến môi trường `EXPO_PUBLIC_API_URL=http://IP_MAY_TINH:3000` trước khi khởi động Expo (trên PowerShell: `$env:EXPO_PUBLIC_API_URL="http://192.168.1.10:3000"; npx.cmd expo start -c`). Đảm bảo cổng TCP 3000 được cho phép trên tường lửa.

## Kiểm tra chức năng
1. Home có 12 sách và 5 danh mục từ API; mở 3 sách khác nhau và xác nhận chi tiết đúng.
2. Thêm một sách 2 lần, chuyển Giỏ, kiểm tra badge và tổng tiền; số lượng không vượt `stock`.
3. Thanh toán nhận đúng tổng từ Giỏ; nút quay lại của Stack hoạt động.
4. Đăng nhập demo và Đăng xuất trong Tài khoản; làm mới app thì trạng thái trở về chưa đăng nhập.
5. Tìm `DAC NHAN`, `nha gia`; nhập từ không tồn tại và bấm Xóa bộ lọc.
6. Chọn Danh mục → về Home; kết hợp với tìm kiếm, khoảng giá và sắp xếp.
7. Tắt json-server, reload Home và thử bật lại rồi bấm Thử lại.
8. Nhấn biểu tượng ♡/♥ ở Chi tiết để bật/tắt yêu thích.

## Cấu trúc
- `src/screens/`: sáu màn hình Home, BookDetail, Categories, Cart, Checkout, Account.
- `src/navigation/`: RootStack, BottomTabs, CustomTabBar.
- `src/store/`: Redux cart, auth, wishlist và adapter hooks.
- `src/services/`: tầng API cho books và categories.
- `src/utils/filters.ts`, `src/hooks/useDebounce.ts`: tìm kiếm và lọc.
- `docs/UI.md`, `docs/ui/`: giao diện tham chiếu gốc.
- `TraLoi.md`: giải thích 5 câu hỏi bổ sung, hai bài thử thách.
- `tests-check.cjs`: 22 phép kiểm tra logic, chạy bằng `npm run test:logic`.
- `BaoCaoKiemThu.md`: kết quả xác minh và những phần cần thử trực quan.
- `docs/ket-qua/`: nơi chụp minh chứng giao diện khi chạy trên máy.

**Phạm vi bài học:** Đăng nhập giả lập, dữ liệu giỏ chưa lưu qua lần reload, trang Thanh toán chưa có chức năng tạo đơn. Đây là thiết kế có chủ đích của đề, không phải backend thương mại hoàn thiện.
