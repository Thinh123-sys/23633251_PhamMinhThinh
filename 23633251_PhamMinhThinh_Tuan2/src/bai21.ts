async function main() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

main();
export {};