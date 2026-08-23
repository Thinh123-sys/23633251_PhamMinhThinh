class User {

    // private nghĩa là chỉ được truy cập bên trong class User
    private name: string;

    constructor(name: string) {

        // Gán tham số name vào thuộc tính name
        this.name = name;
    }

    // Getter dùng để lấy giá trị name
    getName(): string {

        return this.name;
    }

    // Setter dùng để thay đổi name
    setName(name: string): void {

        this.name = name;
    }
}

// Tạo user
const user = new User("Thinh");

// Không được dùng:
// console.log(user.name);
// vì name là private

// Phải lấy thông qua getter
console.log(user.getName());

// Đổi tên thông qua setter
user.setName("Minh Thinh");

// In tên mới
console.log(user.getName());