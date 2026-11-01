# Báo cáo kiểm tra BookStore — Buổi 7

## Kết quả đã xác minh

| Kiểm tra | Kết quả | Phương pháp |
|---|---|---|
| Kiểm thử logic | **22/22 PASS** | Chạy `tests-check.cjs` trên mã TypeScript đã transpile, giả lập phần action/reducer của Redux Toolkit |
| Cú pháp TS/TSX | **40/40 parse thành công** | TypeScript parser 5.8.3 |
| Mã `TODO BT7` trong `src/` | **Không còn** | Tìm kiếm tĩnh |
| Dữ liệu JSON | **12 sách, 5 danh mục** | Đọc `db.json` |

**Nội dung kiểm thử logic:** bỏ dấu tiếng Việt, tìm theo tác giả, lọc AND, các khoảng giá, sắp xếp, thêm/tăng/giới hạn/xóa/làm rỗng giỏ, sách hết hàng, bật/tắt yêu thích và auth reducer.

## Chưa được xác minh trong môi trường tạo sản phẩm

- `npm install` không thành công do không phân giải được `registry.npmjs.org` (`EAI_AGAIN`); vì vậy **chưa chạy được `npx tsc --noEmit` với dependency đầy đủ, Expo web/native, hay json-server thực tế**.
- Chưa kiểm thử trực quan trên trình duyệt/điện thoại, nút Thử lại trong UI khi tắt/bật máy chủ, và chưa chụp 6 ảnh theo yêu cầu nộp.
- Không báo những phần chưa thử là đã PASS.

## Lệnh xác minh sau khi giải nén trên máy người dùng

```bash
npm install
npm run test:logic
npx tsc --noEmit
npm run api
# Mở terminal khác rồi chạy:
npx expo start
```

Sau khi app mở, kiểm tra các luồng trong `README.md` và chụp ảnh theo `docs/ket-qua/README.md`.

## Giới hạn chức năng theo đề

Đăng nhập chỉ mô phỏng Redux, Checkout chỉ nhận và hiển thị tổng tiền; chưa có API đặt hàng thật hoặc lưu giỏ qua lần tải lại. Đây là giới hạn của bài thực hành, không phải ứng dụng thương mại đã triển khai.
