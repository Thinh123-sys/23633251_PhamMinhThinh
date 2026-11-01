# Trả lời câu hỏi bổ sung — BookStore Buổi 7

## Câu 1. Vì sao BookDetail nằm trong Stack thay vì Tab?
`BookDetail` là màn hình con của luồng xem sách, nên đặt trong `RootStack` để mở đè lên vùng Tab Bar và dùng nút quay lại của Native Stack. Nếu đăng ký nó làm một Tab, màn Chi tiết xuất hiện như một mục điều hướng ngang hàng với Home, thanh tab vẫn hiện và không còn hành vi quay về Home theo luồng Stack như yêu cầu.

## Câu 2. Vì sao `state.items.push(...)` không trực tiếp sửa state gốc? Bỏ `useMemo` sẽ thế nào?
Redux Toolkit tích hợp **Immer**, nên mã reducer có thể thao tác trên bản nháp (*draft*) và Immer tạo state bất biến mới. Nếu bỏ `useMemo`, tổng tiền và tổng số lượng vẫn đúng nhưng phép tính `reduce` sẽ chạy lại ở mọi lần component render; `useMemo` chỉ giảm tính toán dư thừa, không quyết định tính đúng đắn.

## Câu 3. `Promise.all` khi một API bị lỗi và phương án dự phòng?
Theo yêu cầu bài 7.5, Home dùng `Promise.all`, vì vậy nếu `getCategories()` thất bại thì `catch` xử lý lỗi và Home hiện `ErrorView`, kể cả khi `getBooks()` đã thành công. Có thể dùng `Promise.allSettled` để lấy sách khi API danh mục lỗi, chẳng hạn:

```ts
const [bookResult, categoryResult] = await Promise.allSettled([getBooks(), getCategories()]);
if (bookResult.status === "fulfilled") setBooks(bookResult.value);
else throw bookResult.reason;
setCategories(categoryResult.status === "fulfilled" ? categoryResult.value : []);
```

Đổi lại, giao diện phải xử lý dữ liệu một phần và thông báo riêng cho phần danh mục; bản triển khai chính vẫn giữ `Promise.all` đúng chỉ dẫn trong đề.

## Câu 4. Vì sao không đặt `setTimeout` trực tiếp trong `onChangeText`?
Mỗi lần nhập sẽ tạo thêm một hẹn giờ riêng, khiến các bộ lọc chạy liên tiếp và có thể dùng những từ khóa cũ. Hook `useDebounce` dùng cleanup `clearTimeout` để hủy hẹn giờ trước khi đặt hẹn giờ mới và khi component bị gỡ, chỉ áp dụng từ khóa sau 400 ms không gõ tiếp.

## Câu 5. Sắp xếp giá tăng dần/giảm dần
Đã bổ sung hai nút **Giá ↑** và **Giá ↓** trong thanh lọc Home; nhấn một lần để chọn, nhấn lại để bỏ chọn. Mã trong `HomeScreen.tsx` giữ nguyên dữ liệu gốc và sắp xếp kết quả đã lọc:

```tsx
type SortOrder = "asc" | "desc" | null;
const [sortOrder, setSortOrder] = useState<SortOrder>(null);
const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (sortOrder === "asc") return [...filtered].sort((a, b) => a.price - b.price);
  if (sortOrder === "desc") return [...filtered].sort((a, b) => b.price - a.price);
  return filtered;
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
```

Ảnh minh chứng sắp xếp giá cần chụp từ ứng dụng chạy thực tế theo hướng dẫn trong `docs/ket-qua/README.md`; môi trường tạo mã không thể chạy Expo do npm registry không truy cập được.

## Thử thách cộng điểm C1 và C2
- **C1 — Wishlist:** `wishlistSlice.toggleWishlist` thêm/xóa ID; `useWishlist()` bao bọc Redux và nút `♡/♥` ở màn Chi tiết. Nếu chuyển sang thư viện state khác, các màn chỉ phụ thuộc vào API của hook, nên chỉ phải đổi phần adapter `store/hooks.ts` (miễn giữ nguyên hợp đồng hook).
- **C2 — Lọc giá:** `PriceFilter` có ba khoảng giá, nhấn lại để bỏ chọn; `filterBooks` kết hợp **từ khóa AND danh mục AND khoảng giá**.

> **Lưu ý:** Login là mô phỏng, Checkout chỉ hiển thị tổng tiền (không tạo đơn hàng thật); cả hai đều theo đúng phạm vi buổi 7.
