// Interface dành cho các đối tượng biết bay
interface Flyable {

    fly(): void;
}

// Interface dành cho các đối tượng biết bơi
interface Swimmable {

    swim(): void;
}

// Bird implement Flyable
class Bird implements Flyable {

    // Vì implement Flyable
    // nên bắt buộc phải có fly()
    fly(): void {

        console.log("Bird is flying");
    }
}

// Fish implement Swimmable
class Fish implements Swimmable {

    // Bắt buộc phải có swim()
    swim(): void {

        console.log("Fish is swimming");
    }
}

const bird = new Bird();

const fish = new Fish();

bird.fly();

fish.swim();