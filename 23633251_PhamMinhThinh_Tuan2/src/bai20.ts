function fakeApiCall(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("API response");
        }, 3000);
    });
}

function timeout(ms: number): Promise<never> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Request timeout"));
        }, ms);
    });
}

async function main() {
    try {
        const result = await Promise.race([
            fakeApiCall(),
            timeout(2000)
        ]);

        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

main();
export {};