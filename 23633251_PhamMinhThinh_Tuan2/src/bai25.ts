function downloadFile(): Promise<string> {
    return new Promise((resolve) => {
        console.log("Downloading file...");

        setTimeout(() => {
            resolve("Download completed");
        }, 3000);
    });
}

downloadFile().then((result) => {
    console.log(result);
});