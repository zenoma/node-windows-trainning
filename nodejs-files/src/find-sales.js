import {promises} from 'fs';


async function findSalesFiles(folderName) {
    let results = []

    const files = await promises.readdir(folderName, {withFileTypes: true});

    for (const element of files) {
        if (element.isDirectory()){
            const resultReturned = await findSalesFiles(`${folderName}/${element.name}`);
            results =  results.concat(resultReturned)  
        }else{
            if (element.name == "sales.json")
                results.push(`${folderName}/${element.name}`)
        }
    }
    return results
  }


async function main() {
    const results = await findSalesFiles("stores");
    console.log(results)

}


main();