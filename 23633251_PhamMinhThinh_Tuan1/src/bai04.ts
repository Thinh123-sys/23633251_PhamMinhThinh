// Class hình chữ nhật
class Rectangle {

    constructor(
        // Chiều rộng
        public width: number,

        // Chiều cao
        public height: number
    ) {}

    // Tính diện tích
    // : number nghĩa là phương thức trả về một số
    getArea(): number {

        // Công thức diện tích:
        // width * height
        return this.width * this.height;
    }

    // Tính chu vi
    getPerimeter(): number {

        // Công thức:
        // 2 * (width + height)
        return 2 * (this.width + this.height);
    }
}

// width = 5, height = 3
const rectangle = new Rectangle(5, 3);

// Diện tích = 5 * 3 = 15
console.log("Area:", rectangle.getArea());

// Chu vi = 2 * (5 + 3) = 16
console.log("Perimeter:", rectangle.getPerimeter());