const promises: Promise<string>[] = [
    Promise.resolve("Task 1"),
    Promise.resolve("Task 2"),
    Promise.resolve("Task 3")
];

async function main() {
    for await (const result of promises) {
        console.log(result);
    }
}

main();