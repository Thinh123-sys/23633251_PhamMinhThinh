// abstract class là class trừu tượng
// Không thể new Shape()
abstract class Shape {

    // Chỉ khai báo phương thức
    // Chưa viết cách tính cụ thể
    abstract area(): number;
}

// Square kế thừa Shape
class Square extends Shape {

    constructor(public side: number) {

        // Gọi constructor class cha
        super();
    }

    // Square bắt buộc phải cài đặt area()
    area(): number {

        // Diện tích hình vuông
        return this.side * this.side;
    }
}

// Circle cũng kế thừa Shape
class Circle extends Shape {

    constructor(public radius: number) {

        super();
    }

    // Cài đặt area() theo công thức hình tròn
    area(): number {

        return Math.PI * this.radius * this.radius;
    }
}

const square = new Square(5);

const circle = new Circle(3);

// 25
console.log(square.area());

// Khoảng 28.27
console.log(circle.area());