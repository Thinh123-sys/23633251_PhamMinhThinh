// Class trừu tượng Appliance
abstract class Appliance {

    // Các thiết bị bắt buộc
    // phải tự định nghĩa turnOn()
    abstract turnOn(): void;
}

// Fan kế thừa Appliance
class Fan extends Appliance {

    turnOn(): void {

        console.log("Fan is turned on");
    }
}

// AirConditioner kế thừa Appliance
class AirConditioner extends Appliance {

    turnOn(): void {

        console.log(
            "Air conditioner is turned on"
        );
    }
}

const fan = new Fan();

const airConditioner = new AirConditioner();

fan.turnOn();

airConditioner.turnOn();