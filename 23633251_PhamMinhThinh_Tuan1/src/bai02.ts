// Class cha Person
class Person {

    constructor(
        public name: string,
        public age: number
    ) {}
}

// Student kế thừa Person bằng từ khóa extends
// Vì vậy Student có sẵn name và age
class Student extends Person {

    constructor(
        name: string,
        age: number,

        // Student có thêm thuộc tính grade
        public grade: string
    ) {

        // super() gọi constructor của class cha Person
        // name và age sẽ được truyền lên Person để khởi tạo
        super(name, age);
    }

    // Phương thức hiển thị toàn bộ thông tin Student
    displayInfo(): void {

        // Student có thể sử dụng name và age
        // vì đã kế thừa từ Person
        console.log(
            `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`
        );
    }
}

// Tạo Student
const student = new Student("Thinh", 21, "A");

// Hiển thị thông tin
student.displayInfo();