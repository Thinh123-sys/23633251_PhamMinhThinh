// Interface Payment
interface Payment {

    // Các phương thức thanh toán
    // đều phải có pay()
    pay(amount: number): void;
}

// Thanh toán tiền mặt
class CashPayment implements Payment {

    pay(amount: number): void {

        console.log(
            `Paid ${amount} by cash`
        );
    }
}

// Thanh toán bằng thẻ
class CardPayment implements Payment {

    pay(amount: number): void {

        console.log(
            `Paid ${amount} by card`
        );
    }
}

const cash = new CashPayment();

const card = new CardPayment();

cash.pay(500);

card.pay(1000);