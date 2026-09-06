interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function getCompletedTodos(): Promise<Todo[]> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    const todos = await response.json() as Todo[];

    return todos.filter((todo) => todo.completed);
}

async function main() {
    try {
        const completedTodos = await getCompletedTodos();

        console.log(completedTodos);
    } catch (error) {
        console.log(error);
    }
}

main();
export {};