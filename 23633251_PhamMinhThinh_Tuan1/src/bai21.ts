// Repository<T> có thể lưu bất kỳ kiểu dữ liệu nào
class Repository<T> {

    // Mảng chỉ chứa dữ liệu kiểu T
    private items: T[] = [];

    // Thêm một phần tử kiểu T
    add(item: T): void {

        this.items.push(item);
    }

    // Trả về tất cả phần tử
    getAll(): T[] {

        return this.items;
    }
}

// Repository này chỉ lưu string
const repository = new Repository<string>();

repository.add("Java");

repository.add("TypeScript");

// ["Java", "TypeScript"]
console.log(repository.getAll());