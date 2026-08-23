// Class cha
class Person {

    constructor(
        public name: string,
        public age: number
    ) {}
}

// Teacher kế thừa Person
class Teacher extends Person {

    constructor(
        name: string,
        age: number,

        // Thuộc tính riêng của Teacher
        public subject: string
    ) {

        // Khởi tạo name và age của Person
        super(name, age);
    }

    // Phương thức giới thiệu
    introduce(): void {

        console.log(
            `My name is ${this.name}, ` +
            `I am ${this.age} years old ` +
            `and I teach ${this.subject}.`
        );
    }
}

// Tạo Teacher
const teacher = new Teacher(
    "Nam",
    35,
    "Programming"
);

// Gọi phương thức
teacher.introduce();