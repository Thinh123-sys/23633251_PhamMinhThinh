class Shape {

    // static method thuộc về class Shape
    static describe(): void {

        console.log(
            "A shape is a geometric object"
        );
    }
}

// Vì describe() là static
// nên gọi trực tiếp từ Shape

Shape.describe();

// Không cần:
// const shape = new Shape();
// shape.describe();