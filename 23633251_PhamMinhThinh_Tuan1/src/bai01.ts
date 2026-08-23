// Tạo một class tên Person
class Person {

    // constructor là hàm khởi tạo
    // public name: string => thuộc tính name kiểu chuỗi
    // public age: number => thuộc tính age kiểu số
    constructor(
        public name: string,
        public age: number
    ) {}

    // Phương thức dùng để hiển thị thông tin Person
    // : void nghĩa là phương thức không trả về giá trị
    displayInfo(): void {

        // this.name lấy thuộc tính name của object hiện tại
        // this.age lấy thuộc tính age của object hiện tại
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

// Tạo một object person từ class Person
// name = "Thinh"
// age = 21
const person = new Person("Thinh", 21);

// Gọi phương thức displayInfo()
person.displayInfo();