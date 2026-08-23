// Interface Vehicle
interface Vehicle {

    // Mọi Vehicle đều phải có move()
    move(): void;
}

// Car thực hiện Vehicle
class Car implements Vehicle {

    move(): void {

        console.log("Car is moving");
    }
}

// Bike cũng thực hiện Vehicle
class Bike implements Vehicle {

    move(): void {

        console.log("Bike is moving");
    }
}

const car = new Car();

const bike = new Bike();

car.move();

bike.move();