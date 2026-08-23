// ========================
// CLASS CHA PERSON
// ========================

class Person {

    constructor(
        // Tên
        public name: string,

        // Tuổi
        public age: number
    ) {}

    // Hiển thị thông tin cơ bản
    displayInfo(): void {

        console.log(
            `Name: ${this.name}, Age: ${this.age}`
        );
    }
}


// ========================
// CLASS STUDENT
// ========================

// Student kế thừa Person
class Student extends Person {

    constructor(
        name: string,
        age: number,

        // Thuộc tính riêng của Student
        public grade: string
    ) {

        // Khởi tạo name và age
        super(name, age);
    }

    // Ghi đè displayInfo của Person
    override displayInfo(): void {

        console.log(
            `Student: ${this.name}, ` +
            `Age: ${this.age}, ` +
            `Grade: ${this.grade}`
        );
    }
}


// ========================
// CLASS TEACHER
// ========================

class Teacher extends Person {

    constructor(
        name: string,
        age: number,

        // Môn giảng dạy
        public subject: string
    ) {

        super(name, age);
    }

    // Ghi đè displayInfo()
    override displayInfo(): void {

        console.log(
            `Teacher: ${this.name}, ` +
            `Age: ${this.age}, ` +
            `Subject: ${this.subject}`
        );
    }
}


// ========================
// CLASS SCHOOL
// ========================

class School {

    // Mảng chứa Student
    private students: Student[] = [];

    // Mảng chứa Teacher
    private teachers: Teacher[] = [];

    // Thêm học sinh
    addStudent(student: Student): void {

        this.students.push(student);
    }

    // Thêm giáo viên
    addTeacher(teacher: Teacher): void {

        this.teachers.push(teacher);
    }

    // Hiển thị toàn bộ thông tin trường
    displayInfo(): void {

        console.log("=== STUDENTS ===");

        // Duyệt từng Student
        this.students.forEach(student => {

            // Gọi displayInfo của Student
            student.displayInfo();
        });

        console.log("=== TEACHERS ===");

        // Duyệt từng Teacher
        this.teachers.forEach(teacher => {

            // Gọi displayInfo của Teacher
            teacher.displayInfo();
        });
    }
}


// ========================
// CHẠY CHƯƠNG TRÌNH
// ========================

// Tạo School
const school = new School();

// Tạo Student rồi thêm vào School
school.addStudent(
    new Student(
        "Thinh",
        21,
        "A"
    )
);

school.addStudent(
    new Student(
        "An",
        20,
        "B"
    )
);

// Tạo Teacher rồi thêm vào School
school.addTeacher(
    new Teacher(
        "Mr. Nam",
        35,
        "TypeScript"
    )
);

// Hiển thị tất cả Student và Teacher
school.displayInfo();