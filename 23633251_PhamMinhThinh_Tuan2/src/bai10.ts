const promise = new Promise<string>((resolve, reject) => {
    const success = Math.random() >= 0.5;

    if (success) {
        resolve("Success");
    } else {
        reject(new Error("Failed"));
    }
});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error.message);
    })
    .finally(() => {
        console.log("Done");
    });