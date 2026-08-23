class Animal {

    // protected:
    // chỉ được truy cập trong class Animal
    // hoặc class kế thừa Animal
    protected makeSound(): void {

        console.log("Animal sound");
    }

    // public method
    sound(): void {

        // Bên trong Animal
        // được phép gọi protected method
        this.makeSound();
    }
}

class Dog extends Animal {

    // Dog được phép override makeSound()
    // vì Dog kế thừa Animal
    protected override makeSound(): void {

        console.log("Woof!");
    }
}

class Cat extends Animal {

    protected override makeSound(): void {

        console.log("Meow!");
    }
}

const dog = new Dog();

const cat = new Cat();

// Không được gọi:
// dog.makeSound();
// vì makeSound là protected

// Gọi thông qua public method sound()
dog.sound();

cat.sound();