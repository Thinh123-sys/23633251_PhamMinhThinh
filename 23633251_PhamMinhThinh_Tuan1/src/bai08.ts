// Class Product
class Product {

    constructor(
        // Tên sản phẩm
        public name: string,

        // Giá sản phẩm
        public price: number
    ) {}
}

// Product[] nghĩa là mảng chỉ chứa Product
const products: Product[] = [

    new Product("Mouse", 50),

    new Product("Keyboard", 120),

    new Product("Monitor", 300),

    new Product("USB", 20)
];

// filter() dùng để lọc phần tử trong mảng
const result = products.filter(

    // product là từng sản phẩm trong mảng

    // Chỉ giữ sản phẩm có price > 100
    product => product.price > 100
);

// In kết quả
console.log(result);