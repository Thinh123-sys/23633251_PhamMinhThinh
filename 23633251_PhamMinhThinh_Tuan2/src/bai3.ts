function createError(): Promise<never> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

createError()
    .catch((error) => {
        console.log(error.message);
    });
    export {};