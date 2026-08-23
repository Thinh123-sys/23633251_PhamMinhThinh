// Class mô phỏng tài khoản ngân hàng
class BankAccount {

    // balance là số dư
    // = 0 nghĩa là nếu không truyền vào thì mặc định bằng 0
    constructor(public balance: number = 0) {}

    // Phương thức nạp tiền
    deposit(amount: number): void {

        // Chỉ cho phép nạp số tiền lớn hơn 0
        if (amount > 0) {

            // balance = balance + amount
            this.balance += amount;
        }
    }

    // Phương thức rút tiền
    withdraw(amount: number): void {

        // amount phải > 0
        // và không được lớn hơn số dư hiện tại
        if (amount > 0 && amount <= this.balance) {

            // balance = balance - amount
            this.balance -= amount;

        } else {

            // Nếu không đủ tiền
            console.log("Insufficient balance");
        }
    }
}

// Tài khoản ban đầu có 1000
const account = new BankAccount(1000);

// Nạp thêm 500
// balance = 1500
account.deposit(500);

// Rút 300
// balance = 1200
account.withdraw(300);

// In số dư
console.log(account.balance);