function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

async function runTask() {
    const result = await simulateTask(2000);

    console.log(result);
}

runTask();