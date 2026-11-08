# Trả lời câu hỏi bổ sung — BookStore Buổi 8

## 1. Vì sao `useAutoPersist` cần cờ `ready`?
Lần render đầu, Redux chưa được nạp từ AsyncStorage nên `cart.items` là mảng rỗng. Nếu tự ghi ngay, mảng rỗng có thể ghi đè giỏ hàng cũ trước khi quá trình đọc hoàn thành. Cờ `ready` chỉ bật sau khi đọc và dispatch dữ liệu đã lưu, bảo đảm lưu trữ chỉ bắt đầu sau khi hydrate.

## 2. Hai điểm không an toàn của token giả
Thứ nhất, API `json-server` trả cả mật khẩu cho ứng dụng và việc so mật khẩu diễn ra ở client, làm lộ thông tin xác thực. Thứ hai, client tự tạo token không có chữ ký hoặc xác thực phía server nên có thể bị giả mạo. Hệ thống thật phải để server kiểm tra mật khẩu đã băm và cấp access token có thể kiểm chứng; trên mobile nên lưu token bằng cơ chế bảo mật như `expo-secure-store`/Keychain/Keystore thay cho AsyncStorage.

## 3. Vì sao `CartItemRow` cần hai `useEffect`?
Một effect đẩy `qty` mới vào Redux sau 300 ms; effect còn lại đồng bộ `qty` khi `item.quantity` thay đổi từ bên ngoài. Nếu bỏ effect đồng bộ, ví dụ một màn khác thêm chính cuốn sách đó vào giỏ, số lượng trong Redux tăng nhưng dòng giỏ vẫn hiển thị số cũ. Việc khôi phục giỏ hoặc cập nhật số lượng từ một nguồn khác cũng có thể gây lệch.

## 4. Vì sao cần một nguồn state cho tim yêu thích?
Nếu mỗi `HeartButton` tự giữ `useState`, nút ở Home và nút ở Chi tiết không biết thay đổi của nhau, dẫn đến một nơi tim đỏ nhưng nơi khác tim rỗng. Dùng Redux `wishlist.ids` làm nguồn dữ liệu duy nhất giúp mọi nút cùng đọc trạng thái, cùng gọi `toggle`, tự render lại đồng nhất và lưu được khi mở lại app.

## 5. Bổ sung nút hiện/ẩn mật khẩu
Đã thực hiện ở `src/screens/LoginScreen.tsx`: state `showPassword` khởi đầu bằng `false`; nhấn nút `👁` bên phải trường Mật khẩu để đổi giá trị và điều khiển `secureTextEntry={!showPassword}`. `FormField` được bổ sung thuộc tính `rightAccessory` để đặt nút ngay cạnh ô nhập mà không ảnh hưởng các form khác.

**Ảnh chụp màn hình:** Cần chạy ứng dụng trên thiết bị hoặc trình duyệt và chụp 2 trạng thái (ẩn/hiện mật khẩu) trước khi nộp; file code không thể thay thế ảnh chụp thực tế.
