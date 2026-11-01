// Kiểm tra logic từ chính mã nguồn TypeScript mà không cần mô phỏng giao diện.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = __dirname;
let count = 0;
function check(label, fn) { fn(); count++; console.log(`PASS ${count.toString().padStart(2, '0')} ${label}`); }
function load(relativePath, mocks = {}) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const output = ts.transpileModule(source, { fileName: relativePath, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const exports = {};
  const context = { exports, require: (name) => {
    if (mocks[name]) return mocks[name];
    throw new Error(`Unexpected import in ${relativePath}: ${name}`);
  } };
  vm.runInNewContext(output.outputText, context, { filename: relativePath });
  return exports;
}
const filter = load('src/utils/filters.ts');
const books = JSON.parse(fs.readFileSync(path.join(root, 'db.json'), 'utf8')).books;
const all = { keyword: '', categoryId: null, priceRange: null };
check('DB bao gồm 12 sách', () => assert.equal(books.length, 12));
check('Tìm Nhà Giả Kim không dấu', () => assert.deepEqual(filter.filterBooks(books, { ...all, keyword: 'nha gia' }).map(b => b.title), ['Nhà Giả Kim']));
check('Tìm Đắc Nhân Tâm không dấu/hoa', () => assert.deepEqual(filter.filterBooks(books, { ...all, keyword: 'DAC NHAN' }).map(b => b.title), ['Đắc Nhân Tâm']));
check('Tìm theo tác giả', () => assert.ok(filter.filterBooks(books, { ...all, keyword: 'Paulo Coelho' }).some(b => b.title === 'Nhà Giả Kim')));
check('Không có kết quả', () => assert.equal(filter.filterBooks(books, { ...all, keyword: 'khongco111' }).length, 0));
check('Từ khóa rỗng trả 12 sách', () => assert.equal(filter.filterBooks(books, all).length, 12));
check('Danh mục lập trình có Clean Code', () => assert.ok(filter.filterBooks(books, { ...all, categoryId: 3 }).some(b => b.title === 'Clean Code')));
check('Lọc AND danh mục + react', () => assert.deepEqual(filter.filterBooks(books, { ...all, categoryId: 3, keyword: 'react' }).map(b => b.title), ['React Native in Action']));
check('Dưới 100k', () => assert.ok(filter.filterBooks(books, { ...all, priceRange: 'lt100' }).every(b => b.price < 100000)));
check('100k đến 300k', () => assert.ok(filter.filterBooks(books, { ...all, priceRange: '100to300' }).every(b => b.price >= 100000 && b.price <= 300000)));
check('Trên 300k', () => assert.ok(filter.filterBooks(books, { ...all, priceRange: 'gt300' }).every(b => b.price > 300000)));
check('Kết hợp giá + danh mục + từ khóa', () => assert.deepEqual(filter.filterBooks(books, { ...all, keyword: 'clean', categoryId: 3, priceRange: 'gt300' }).map(b => b.title), ['Clean Code']));
check('Sắp xếp giá dựa trên bản sao không đổi dữ liệu', () => {
  const original = books.map(b=>b.id).join(',');
  const prices = [...filter.filterBooks(books, all)].sort((a,b) => a.price-b.price).map(b=>b.price);
  assert.deepEqual(prices, [...prices].sort((a,b)=>a-b));
  assert.equal(books.map(b=>b.id).join(','), original);
});
// Giả lập phần tạo action của RTK để chạy reducer nguyên bản mà không cần npm install.
function createSliceMock({ name, initialState, reducers }) {
  const actions = Object.fromEntries(Object.keys(reducers).map(key => [key, payload => ({ type: `${name}/${key}`, payload })]));
  return { actions, reducer(state = structuredClone(initialState), action) {
    const actionName = action.type?.split('/')[1];
    if (action.type?.startsWith(name + '/') && reducers[actionName]) reducers[actionName](state, action);
    return state;
  }};
}
const cart = load('src/store/cartSlice.ts', { '@reduxjs/toolkit': { createSlice: createSliceMock } });
let state = cart.default(undefined, { type: '@@INIT' });
const sample = { bookId: 3, title: 'Clean Code', price: 389000, stock: 5, emoji: '🧹', color: '#456' };
check('Giỏ thêm sách và tự tạo quantity=1', () => {
  state = cart.default(state, cart.addItem(sample)); assert.equal(state.items[0].quantity, 1);
});
check('Giỏ thêm cùng sách tăng số lượng', () => {
  state = cart.default(state, cart.addItem(sample)); assert.equal(state.items[0].quantity, 2);
});
check('Giỏ không vượt tồn kho', () => {
  for (let i = 0; i < 9; i++) cart.default(state, cart.addItem(sample));
  assert.equal(state.items[0].quantity, 5);
});
check('Giỏ setQty khóa giới hạn stock', () => {
  cart.default(state, cart.setQuantity({ bookId: 3, quantity: 999 })); assert.equal(state.items[0].quantity, 5);
});
check('Giỏ xóa sản phẩm', () => {
  cart.default(state, cart.removeItem(3)); assert.equal(state.items.length, 0);
});
check('Giỏ chặn sản phẩm hết tồn kho', () => {
  cart.default(state, cart.addItem({ ...sample, stock: 0 })); assert.equal(state.items.length, 0);
});
check('Giỏ clearCart', () => {
  cart.default(state, cart.addItem(sample)); cart.default(state, cart.clearCart()); assert.equal(state.items.length, 0);
});
const wishlist = load('src/store/wishlistSlice.ts', { '@reduxjs/toolkit': { createSlice: createSliceMock } });
let liked = wishlist.default(undefined, { type: '@@INIT' });
check('Wishlist bật/tắt đúng id', () => {
  wishlist.default(liked, wishlist.toggleWishlist(3)); assert.equal(liked.ids.join(','), '3');
  wishlist.default(liked, wishlist.toggleWishlist(3)); assert.equal(liked.ids.length, 0);
});
const auth = load('src/store/authSlice.ts', { '@reduxjs/toolkit': { createSlice: createSliceMock } });
let authState = auth.default(undefined, { type: '@@INIT' });
check('Auth giả lập đăng nhập/đăng xuất', () => {
  auth.default(authState, auth.setCredentials({ user: { id: 1, name: 'Demo', email: 'demo@bookstore.vn' }, token: 'fake-token' }));
  assert.equal(authState.user.name, 'Demo'); assert.equal(authState.token, 'fake-token');
  auth.default(authState, auth.logout()); assert.equal(authState.user, null); assert.equal(authState.token, null);
});
console.log(`OK: ${count} phép kiểm tra logic đều đạt.`);
