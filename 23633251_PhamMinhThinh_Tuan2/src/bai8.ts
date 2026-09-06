Promise.resolve(2)
    .then((number) => {
        return number * number;
    })
    .then((number) => {
        return number * 2;
    })
    .then((number) => {
        return number + 5;
    })
    .then((result) => {
        console.log("Result:", result);
    });