const fs = require("fs").promises;
const path = require("path");

async function calculateTotals(salesFiles) {
    let salesTotal = 0;
    for (let salesFile of salesFiles) {
        const data = JSON.parse(await fs.readFile(salesFile));
        salesTotal += data.total;
    }
    return salesTotal;
}
async function findSalesFiles(folderName) {
    let salesFiles = [];

    async function findSalesFilesInternal(folderName) {
        const items = await fs.readdir(folderName, { withFileTypes: true });
        for (let item of items) {
            //let tmp = `${folderName}/${item.name}`;
            //console.log(tmp);
            if (item.isDirectory()) {
                await findSalesFilesInternal(`${folderName}/${item.name}`);
            } else if (path.extname(item.name) === ".json") {
                salesFiles.push(`${folderName}/${item.name}`);
            }
        }
    }
    await findSalesFilesInternal(folderName);
    //console.log(salesFiles);
    return salesFiles;
}

async function main() {
    console.log(`Current directory:${__dirname}`);
    const salesDir = path.join(__dirname, "../stores");
    const salesTotalsDir = path.join(__dirname, "../salesTotals");

    try {
        await fs.mkdir(salesTotalsDir);
    } catch {
        console.log(`Directory "${salesTotalsDir}" already exists.`)
    }
    const salesFiles = await findSalesFiles(salesDir);
    
    const salesTotal = await calculateTotals(salesFiles);

    await fs.writeFile(path.join(salesTotalsDir, "totals.txt"), `Sales total: ${salesTotal}\n`, {flag: "a"});

    console.log("final result:");
    console.log(salesFiles);
}

async function main2(){

}

main();
