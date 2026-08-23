// Interface giống như một "hợp đồng"
interface Animal {

    // Class implement Animal bắt buộc phải có name
    name: string;

    // Và bắt buộc có phương thức sound()
    sound(): void;
}

// Dog thực hiện interface Animal
class Dog implements Animal {

    // Thuộc tính name theo yêu cầu của Animal
    constructor(public name: string) {}

    // Cài đặt phương thức sound()
    sound(): void {

        console.log("Woof!");
    }
}

// Tạo object Dog
const dog = new Dog("Lucky");

// In tên
console.log(dog.name);

// Gọi tiếng kêu
dog.sound();