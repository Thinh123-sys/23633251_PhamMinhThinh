async function task(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${name} completed`);
        }, time);
    });
}

async function main() {
    const result1 = await task("Task 1", 1000);
    console.log(result1);

    const result2 = await task("Task 2", 1000);
    console.log(result2);

    const result3 = await task("Task 3", 1000);
    console.log(result3);
}

main();
export {};