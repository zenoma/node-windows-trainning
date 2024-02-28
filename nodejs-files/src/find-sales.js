import path from "path";
import { fileURLToPath } from "url";
import { promises } from "fs";

async function findSalesFiles(folderName) {
    let results = [];

    const files = await promises.readdir(folderName, { withFileTypes: true });

    for (const element of files) {
        if (element.isDirectory()) {
            const resultReturned = await findSalesFiles(
                path.join(folderName, element.name)
            );
            results = results.concat(resultReturned);
        } else {
            if (element.name == "sales.json")
                results.push(path.join(folderName, element.name));
        }
    }
    return results;
}

async function calculateSalesTotal(salesFiles) {
    let salesTotal = 0;

    for (const file of salesFiles) {
        const fileContent = await promises.readFile(file);

        const data = JSON.parse(fileContent);
        salesTotal += data.total;

    }
    return salesTotal;
}

async function main() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rootDir = path.dirname(__dirname); // Get the root dir

    const salesDir = path.join(rootDir, "stores");

    const salesTotalsDir = path.join(salesDir, "salesTotals");

    try {
        await promises.mkdir(salesTotalsDir);
    } catch {
        console.log(`${salesTotalsDir} already exists.`);
    }

    const salesFiles = await findSalesFiles(salesDir);
    console.log(salesFiles);

    const salesTotal = await calculateSalesTotal(salesFiles);

    const result = `${salesTotal}\n\r`;


    await promises.writeFile(path.join(salesTotalsDir, "totals.txt"), result, {flag: "a"});
    console.log(`Wrote sales totals to ${salesTotalsDir}`);
}

main();

export default findSalesFiles;
