// Class tiện ích toán học
class MathUtil {

    // static giúp gọi trực tiếp bằng tên class
    static add(a: number, b: number): number {

        return a + b;
    }

    static subtract(a: number, b: number): number {

        return a - b;
    }

    static multiply(a: number, b: number): number {

        return a * b;
    }

    static divide(a: number, b: number): number {

        // Không cho chia cho 0
        if (b === 0) {

            // throw tạo ra lỗi
            throw new Error("Cannot divide by zero");
        }

        return a / b;
    }
}

// Không cần new MathUtil()

console.log(MathUtil.add(10, 5));       // 15

console.log(MathUtil.subtract(10, 5));  // 5

console.log(MathUtil.multiply(10, 5));  // 50

console.log(MathUtil.divide(10, 5));    // 2