// Generic Stack
class Stack<T> {

    // Mảng dùng để lưu dữ liệu
    private items: T[] = [];

    // push:
    // thêm phần tử lên đầu/ngọn stack
    push(item: T): void {

        this.items.push(item);
    }

    // pop:
    // lấy và xóa phần tử cuối cùng
    pop(): T | undefined {

        return this.items.pop();
    }

    // peek:
    // xem phần tử trên cùng
    // nhưng không xóa
    peek(): T | undefined {

        return this.items[
            this.items.length - 1
        ];
    }

    // Kiểm tra stack có rỗng hay không
    isEmpty(): boolean {

        return this.items.length === 0;
    }
}

// Stack chỉ chứa number
const stack = new Stack<number>();

stack.push(10);

stack.push(20);

stack.push(30);

// 30
console.log(stack.peek());

// Lấy 30 ra khỏi stack
console.log(stack.pop());

// Còn 10, 20 nên false
console.log(stack.isEmpty());