// <T> là Generic Type
// T có thể là number, string, boolean,...
class Box<T> {

    // value có kiểu T
    constructor(public value: T) {}

    // Trả về dữ liệu kiểu T
    getValue(): T {

        return this.value;
    }
}

// T lúc này là number
const numberBox = new Box<number>(100);

// T lúc này là string
const stringBox = new Box<string>("Hello");

// Trả về number
console.log(numberBox.getValue());

// Trả về string
console.log(stringBox.getValue());