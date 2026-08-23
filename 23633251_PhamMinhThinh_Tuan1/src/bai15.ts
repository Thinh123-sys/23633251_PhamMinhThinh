class Book {

    constructor(
        public title: string,
        public author: string
    ) {}
}

class User {

    constructor(public name: string) {}
}

// Library chứa Book và User
class Library {

    // Mảng chứa sách
    books: Book[] = [];

    // Mảng chứa user
    users: User[] = [];

    // Thêm sách vào thư viện
    addBook(book: Book): void {

        // push() thêm phần tử vào cuối mảng
        this.books.push(book);
    }

    // Thêm user
    addUser(user: User): void {

        this.users.push(user);
    }
}

const library = new Library();

// Tạo Book rồi thêm vào Library
library.addBook(
    new Book("Clean Code", "Robert Martin")
);

// Tạo User rồi thêm vào Library
library.addUser(
    new User("Thinh")
);

// Xem danh sách
console.log(library.books);

console.log(library.users);