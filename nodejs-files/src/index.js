import fs, {promises} from 'fs';

// Determine content type

async function main() {
    const items = await promises.readdir("stores", { withFileTypes: true });
    for (let item of items) {
        const type = item.isDirectory() ? "folder" : "file";
        console.log(`${item.name}: ${type}`);
    }
}


await main();

console.log()


















// Async function with a timeout of 1sec not blocking the execution
async function main_async() {
    console.log("main_async")
    let items 
    setTimeout(() => {
        items = promises.readdir("stores")
                .then((value) => console.log("async value ", value))
                .catch((err) => console.error(err));
    }, 2000);
    return items
}

console.log("Previous work")
main_async()
console.log("Next work")

// Sync functión blocking the execution
function main_sync() {
    console.log("main_sync");
    try {
        const files = fs.readdirSync("stores");
        return files;
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}


console.log("Previous work");
console.log("sync value ",main_sync());
console.log("Next work");




