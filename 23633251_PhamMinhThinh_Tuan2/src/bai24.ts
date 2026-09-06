async function postData() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: "Hello",
                body: "This is a new post",
                userId: 1
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to post data");
    }

    return response.json();
}

async function main() {
    try {
        const result = await postData();

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

main();
export {};