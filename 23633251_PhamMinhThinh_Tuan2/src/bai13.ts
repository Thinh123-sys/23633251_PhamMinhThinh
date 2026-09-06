function createError(): Promise<never> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

async function main() {
    try {
        await createError();
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error:", error.message);
        }
    }
}

main();
export {};