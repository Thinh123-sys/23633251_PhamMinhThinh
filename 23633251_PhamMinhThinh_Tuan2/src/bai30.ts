async function fetchTodo(id: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch todo ${id}`);
    }

    return response.json();
}

async function main() {
    const requests = [
        fetchTodo(1),
        fetchTodo(2),
        fetchTodo(3),
        fetchTodo(999999),
        fetchTodo(5)
    ];

    const results = await Promise.allSettled(requests);

    results.forEach((result, index) => {

        if (result.status === "fulfilled") {
            console.log(
                `Request ${index + 1} success:`,
                result.value
            );
        } else {
            console.log(
                `Request ${index + 1} failed:`,
                result.reason
            );
        }

    });
}

main();
export {};