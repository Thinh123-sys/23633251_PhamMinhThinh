async function task(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${name} completed`);
        }, time);
    });
}

async function main() {
    const results = await Promise.all([
        task("Task 1", 1000),
        task("Task 2", 2000),
        task("Task 3", 1500)
    ]);

    console.log(results);
}

main();
export {};