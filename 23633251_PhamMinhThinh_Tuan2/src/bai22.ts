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
    try {
        const todo1 = await fetchTodo(1);
        const todo2 = await fetchTodo(2);
        const todo3 = await fetchTodo(3);

        console.log(todo1);
        console.log(todo2);
        console.log(todo3);
    } catch (error) {
        console.log(error);
    }
}

main();
export {};