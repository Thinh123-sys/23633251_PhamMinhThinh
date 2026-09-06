function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    console.log("Start");

    await wait(5000);

    console.log("Finished after 5 seconds");
}

main();
export {};