// Tạo class Car
class Car {

    constructor(
        // Hãng xe
        public brand: string,

        // Dòng xe
        public model: string,

        // Năm sản xuất
        public year: number
    ) {}

    // Phương thức hiển thị thông tin xe
    showInfo(): void {

        console.log(
            `${this.brand} ${this.model} - ${this.year}`
        );
    }
}

// Tạo object Car
const car = new Car("Toyota", "Camry", 2025);

// Gọi phương thức
car.showInfo();