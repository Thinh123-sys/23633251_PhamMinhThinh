const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});

promise.then((result) => {
    console.log(result);
});
export {};