function processTask(id: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} completed`);
        }, 1000);
    });
}

async function queueProcess() {
    const tasks = [1, 2, 3, 4, 5];

    for (const task of tasks) {
        const result = await processTask(task);

        console.log(result);
    }
}

queueProcess();