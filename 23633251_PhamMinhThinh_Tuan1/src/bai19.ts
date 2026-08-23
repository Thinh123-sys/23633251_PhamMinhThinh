// Class cha
class Animal {

    sound(): void {

        console.log("Animal sound");
    }
}

// Dog kế thừa Animal
class Dog extends Animal {

    // override nghĩa là ghi đè phương thức của class cha
    override sound(): void {

        console.log("Woof!");
    }
}

// Cat cũng ghi đè sound()
class Cat extends Animal {

    override sound(): void {

        console.log("Meow!");
    }
}

// Mảng có kiểu Animal[]
// nhưng có thể chứa Dog và Cat
const animals: Animal[] = [

    new Dog(),

    new Cat()
];

// Duyệt từng Animal
animals.forEach(animal => {

    // Nếu object là Dog -> chạy Dog.sound()
    // Nếu object là Cat -> chạy Cat.sound()
    animal.sound();
});