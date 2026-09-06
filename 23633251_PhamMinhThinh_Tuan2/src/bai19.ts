interface User {
    id: number;
    name: string;
}

async function fetchUser(id: number): Promise<User> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: `User ${id}`
            });
        }, 1000);
    });
}

async function fetchUsers(ids: number[]): Promise<User[]> {
    const promises = ids.map((id) => fetchUser(id));

    return Promise.all(promises);
}

async function main() {
    const users = await fetchUsers([1, 2, 3, 4, 5]);

    console.log(users);
}

main();
export {};