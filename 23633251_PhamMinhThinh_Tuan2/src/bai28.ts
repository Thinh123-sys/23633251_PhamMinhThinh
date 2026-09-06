function processTask(id: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} completed`);
        }, 1000);
    });
}

async function batchProcess() {
    const tasks = [
        processTask(1),
        processTask(2),
        processTask(3),
        processTask(4),
        processTask(5)
    ];

    const results = await Promise.all(tasks);

    console.log(results);
}

batchProcess();
export {};