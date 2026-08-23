// Class cha
class Animal {

    constructor(public name: string) {}
}

// Dog là một Animal
class Dog extends Animal {

    // Phương thức riêng của Dog
    bark(): void {

        console.log(`${this.name}: Woof!`);
    }
}

// Cat cũng là một Animal
class Cat extends Animal {

    // Phương thức riêng của Cat
    meow(): void {

        console.log(`${this.name}: Meow!`);
    }
}

// Dog được kế thừa name
const dog = new Dog("Lucky");

// Cat cũng được kế thừa name
const cat = new Cat("Tom");

// Gọi phương thức riêng
dog.bark();

cat.meow();