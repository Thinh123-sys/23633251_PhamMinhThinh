class Product {

    constructor(
        public name: string,
        public price: number
    ) {}
}

class Order {

    // Danh sách sản phẩm trong đơn hàng
    private products: Product[] = [];

    // Thêm sản phẩm vào đơn
    addProduct(product: Product): void {

        this.products.push(product);
    }

    // Tính tổng tiền
    calculateTotal(): number {

        // reduce() duyệt toàn bộ mảng
        return this.products.reduce(

            // total = tổng tiền hiện tại
            // product = sản phẩm hiện tại
            (total, product) =>

                // Cộng price vào total
                total + product.price,

            // Giá trị ban đầu của total = 0
            0
        );
    }
}

const order = new Order();

order.addProduct(
    new Product("Mouse", 100)
);

order.addProduct(
    new Product("Keyboard", 200)
);

order.addProduct(
    new Product("Monitor", 500)
);

// 100 + 200 + 500 = 800
console.log(
    "Total:",
    order.calculateTotal()
);