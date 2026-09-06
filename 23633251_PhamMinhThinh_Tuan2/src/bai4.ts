function randomNumber(): Promise<number> {
    return new Promise((resolve, reject) => {
        const number = Math.random();

        if (number >= 0.5) {
            resolve(number);
        } else {
            reject(new Error("Random number is less than 0.5"));
        }
    });
}

randomNumber()
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.log("Error:", error.message);
    });