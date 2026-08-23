// Class cha Employee
class Employee {

    constructor(public name: string) {}

    work(): void {

        console.log(`${this.name} is working`);
    }
}

// Manager kế thừa Employee
class Manager extends Employee {

    // Phương thức riêng của Manager
    manageTeam(): void {

        console.log(`${this.name} is managing the team`);
    }
}

// Developer kế thừa Employee
class Developer extends Employee {

    // Phương thức riêng của Developer
    writeCode(): void {

        console.log(`${this.name} is writing code`);
    }
}

const manager = new Manager("An");

const developer = new Developer("Thinh");

// Manager dùng phương thức riêng
manager.manageTeam();

// Developer dùng phương thức riêng
developer.writeCode();

// Cả hai đều kế thừa work()
manager.work();
developer.work();