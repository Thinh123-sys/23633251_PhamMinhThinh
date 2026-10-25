// Dữ liệu mẫu (offline) — Đề Lab06 · Mục 2 (code có sẵn). Dùng khi chưa đặt EXPO_PUBLIC_API_URL.
import { ColorKey, Phone } from '../types';

// Bảng màu: tên tiếng Việt, mã màu để vẽ ô màu, và ảnh điện thoại tương ứng
export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: number }> = {
  silver: { label: 'bạc', hex: '#C9EEFA', image: require('../../assets/phones/silver.png') },
  red: { label: 'đỏ', hex: '#E53A2F', image: require('../../assets/phones/red.png') },
  black: { label: 'đen', hex: '#000000', image: require('../../assets/phones/black.png') },
  blue: { label: 'xanh', hex: '#2A4494', image: require('../../assets/phones/blue.png') },
};

export const COLOR_ORDER: ColorKey[] = ['silver', 'red', 'black', 'blue']; // thứ tự 4 ô màu

// Sản phẩm id 1 (Joy 3) và id 2 (Live 4) lấy đúng giá trong đề.
// Các sản phẩm còn lại: giá và đánh giá là DỮ LIỆU GIẢ, thay bằng dữ liệu thật trên mockapi.io.
export const PHONES: Phone[] = [
  {
    id: '1', name: 'Điện Thoại Vsmart Joy 3 - Hàng chính hãng', price: 1790000, oldPrice: 1790000,
    rating: 5, reviewCount: 828, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
    colors: COLOR_ORDER, defaultColor: 'blue',
  },
  {
    id: '2', name: 'Điện Thoại Vsmart Live 4 - Hàng chính hãng', price: 3990000, oldPrice: 4290000,
    rating: 4, reviewCount: 512, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
    colors: COLOR_ORDER, defaultColor: 'blue',
  },
  {
    id: '3', name: 'Điện Thoại Vsmart Star 5 - Hàng chính hãng', price: 1290000, oldPrice: 1490000,
    rating: 4, reviewCount: 204, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
    colors: COLOR_ORDER, defaultColor: 'red',
  },
  {
    id: '4', name: 'Điện Thoại Vsmart Active 3 - Hàng chính hãng', price: 2190000, oldPrice: 2490000,
    rating: 4, reviewCount: 336, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
    colors: COLOR_ORDER, defaultColor: 'black',
  },
  {
    id: '5', name: 'Điện Thoại Vsmart Aris Pro - Hàng chính hãng', price: 4490000, oldPrice: 4990000,
    rating: 5, reviewCount: 97, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
    colors: COLOR_ORDER, defaultColor: 'silver',
  },
  {
    id: '6', name: 'Điện Thoại Vsmart Bee 3 - Hàng chính hãng', price: 990000, oldPrice: 1190000,
    rating: 3, reviewCount: 415, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
    colors: COLOR_ORDER, defaultColor: 'blue',
  },
];
