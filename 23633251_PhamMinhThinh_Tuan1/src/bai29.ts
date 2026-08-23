// Interface mô tả đối tượng có thể di chuyển
interface Movable {

    move(): void;
}

// Car thực hiện Movable
class Car implements Movable {

    move(): void {

        console.log(
            "Car moves on the road"
        );
    }
}

// Robot cũng thực hiện Movable
class Robot implements Movable {

    move(): void {

        console.log(
            "Robot is moving"
        );
    }
}

const car = new Car();

const robot = new Robot();

car.move();

robot.move();