// Class Book đại diện cho một cuốn sách
class Book {

    constructor(
        // Tên sách
        public title: string,

        // Tác giả
        public author: string,

        // Năm xuất bản
        public year: number
    ) {}

    // Phương thức hiển thị thông tin sách
    displayInfo(): void {

        console.log(
            `${this.title} - ${this.author} - ${this.year}`
        );
    }
}

// Tạo một cuốn sách
const book = new Book(
    "Clean Code",
    "Robert C. Martin",
    2008
);

// Hiển thị thông tin
book.displayInfo();