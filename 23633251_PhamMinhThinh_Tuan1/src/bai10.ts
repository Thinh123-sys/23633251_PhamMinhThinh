class Account {

    // public:
    // Có thể truy cập từ bên ngoài class
    public username: string;

    // private:
    // Chỉ được dùng bên trong class
    private password: string;

    // readonly:
    // Có thể đọc nhưng không được thay đổi sau khi khởi tạo
    readonly id: number;

    constructor(
        id: number,
        username: string,
        password: string
    ) {

        this.id = id;
        this.username = username;
        this.password = password;
    }

    showInfo(): void {

        // Bên trong class có thể truy cập
        // cả public, private và readonly
        console.log(`ID: ${this.id}`);
        console.log(`Username: ${this.username}`);
    }
}

const acc = new Account(
    1,
    "thinh",
    "123456"
);

// Được phép vì username là public
console.log(acc.username);

// Được phép vì id có thể đọc
console.log(acc.id);

// Không được:
// acc.password

// Không được:
// acc.id = 2;
// vì id là readonly

acc.showInfo();