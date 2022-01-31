import * as fs from "fs";
import * as path from "path";

const treeFn = (dirPath) => {

    if (!dirPath) {

        console.log("Please provide a valid directory path");
    }

    else {

        let doesExist = fs.existsSync(dirPath);

        if (doesExist) {

            treeHelper(dirPath, " ");
            printMessage();
        }

        else {

            console.log("Please provide a valid directory path");
        }
    }
}


const treeHelper = (destPath, indent) => {

    let isFile = fs.lstatSync(destPath).isFile();

    if (isFile) {

        let fileName = path.basename(destPath);

        console.log(indent + "├──" + fileName);
    }

    else {

        let folderName = path.basename(destPath);

        console.log(indent + "└──" + folderName);

        let subFolders = fs.readdirSync(destPath);

        for (let child of subFolders) {

            let childPath = path.join(destPath, child);

            treeHelper(childPath, indent + "\t");
        }
    }
}


const printMessage = () => {

    console.log("Tree implemented");
}

export default treeFn;