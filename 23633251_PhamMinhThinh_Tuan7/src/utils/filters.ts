import { Book } from "../types";

export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null;
export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

export const inRange = (price: number, range: PriceRange): boolean =>
  range === null || (range === "lt100" ? price < 100000 :
    range === "100to300" ? price >= 100000 && price <= 300000 : price > 300000);

export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}

// Các điều kiện kết hợp theo phép AND; từ khóa áp dụng cho cả tên sách và tác giả.
export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const keyword = normalize(f.keyword);
  return books.filter((book) =>
    (keyword === "" || normalize(book.title).includes(keyword) || normalize(book.author).includes(keyword)) &&
    (f.categoryId === null || book.categoryId === f.categoryId) &&
    inRange(book.price, f.priceRange)
  );
}
