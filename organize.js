import * as fs from "fs";
import * as path from "path";


const fileTypes = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    images: ["jpeg", "png", "jpg", "svg"],
    app: ["exe", "dmg", "pkg", "deb"],
};

const organizeFn = (dirPath) => {

    let destPath;
    if (!dirPath) {

        console.log("Please provide a valid directory path");
    }

    else {

        let doesExist = fs.existsSync(dirPath);

        if (doesExist) {

            destPath = path.join(dirPath, "organized_files");

            if (!fs.existsSync(destPath))
                fs.mkdirSync(destPath);

            else {

                console.log("organized_files directory already exists.");
            }
        }

        else {

            console.log("Directory does not exist.");
            return;
        }

        organizeHelper(dirPath, destPath);
        printMessage();
    }
}


const organizeHelper = (srcPath, destPath) => {

    let children = fs.readdirSync(srcPath);

    for (let child of children) {

        const childPath = path.join(srcPath, child);

        let isFile = fs.lstatSync(childPath).isFile();

        if (isFile) {

            let fileCategory = getCategory(child);

            sendFile(destPath, childPath, fileCategory);
        }
    }

}


const getCategory = (file) => {

    let ext = path.extname(file).slice(1);

    for (let type in fileTypes) {

        let typeArr = fileTypes[type];

        for (let val of typeArr) {

            if (ext == val)
                return type;
        }
    }

    return 'others';
}

const sendFile = (destPath, filePath, category) => {

    let catPath = path.join(destPath, category);
    let doesExist = fs.existsSync(catPath);

    if (!doesExist)
        fs.mkdirSync(catPath);

    let fileName = path.basename(filePath);
    let targetFilePath = path.join(catPath, fileName);

    fs.copyFileSync(filePath, targetFilePath);

    fs.unlinkSync(filePath);
}


const printMessage = () => {

    console.log("File organized.");
}

export default organizeFn;