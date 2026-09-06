async function fetchWithRetry(
    url: string,
    retries: number
): Promise<Response> {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response;

    } catch (error) {

        if (retries <= 0) {
            throw error;
        }

        console.log(`Retrying... Remaining: ${retries}`);

        return fetchWithRetry(url, retries - 1);
    }
}

async function main() {
    try {
        const response = await fetchWithRetry(
            "https://jsonplaceholder.typicode.com/todos/1",
            3
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.log("Request failed:", error);
    }
}

main();
export {};