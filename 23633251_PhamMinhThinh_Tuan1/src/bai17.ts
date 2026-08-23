class Logger {

    // static:
    // instance thuộc về class Logger
    // chứ không thuộc từng object
    private static instance: Logger;

    // private constructor:
    // Không cho phép bên ngoài new Logger()
    private constructor() {}

    // static method có thể gọi trực tiếp bằng Logger.getInstance()
    static getInstance(): Logger {

        // Nếu Logger chưa được tạo
        if (!Logger.instance) {

            // Tạo một Logger duy nhất
            Logger.instance = new Logger();
        }

        // Nếu đã có rồi thì trả lại object cũ
        return Logger.instance;
    }

    // Hàm ghi log
    log(message: string): void {

        console.log(`[LOG]: ${message}`);
    }
}

// Lấy Logger lần 1
const logger1 = Logger.getInstance();

// Lấy Logger lần 2
const logger2 = Logger.getInstance();

// Sử dụng Logger
logger1.log("Hello");

// true vì logger1 và logger2
// thực chất là cùng một object
console.log(logger1 === logger2);